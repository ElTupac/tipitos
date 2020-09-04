
window.onload = () => {

    var vPHeight = getVPHeight();
    var vPWidth = getVPWidth();
    window.addEventListener('resize', () =>{
        vPHeight = getVPHeight();
        vPWidth = getVPWidth();
    })

    const playerNick = document.getElementById("nickname");
    playerNick.innerText = nickName;

    const Player = document.getElementById("gatoFeo");
    var xPos = {h: 0};
    var yPos = {h: 0};

    var currentMove;
    var lastMove;
    var attackDirection;
    var currentAnim;
    var attacking = false;
    var attackCD = false;
    var notDeath = true;

    const intervalTime = 250;

    const attackTimeCD = 750;

    var direction = {left: false, right: false, up: false, down: false};

    document.addEventListener('keydown', event => {
        const keyDown = event.key;
        
        //event.preventDefault();
        //Mas tarde usarlo para cuando se meta el modulo de chat
        //Cuando se habilite el preventDefault hacer un keydown para la tecla f5 para hacer el refresh

        if(!attackCD && keyDown == "q" && notDeath){
            attacking = true;
            attackCD = true;
            clearInterval(currentAnim);

            if(currentMove != null) attackDirection = currentMove;
            else attackDirection = lastMove;

            postEvent(id, "attack", xPos.h, yPos.h, attackDirection);

            switch(attackDirection) {
                case "left":
                    currentAnim = makeAnim(Player, attackLeft);
                    break;

                case "rigth":
                    currentAnim = makeAnim(Player, attackRigth);
                    break;

                case "up":
                    currentAnim = makeAnim(Player, attackUp);
                    break;

                case "down":
                    currentAnim = makeAnim(Player, attackDown);
                    break;
            }

            setTimeout(() => {
                clearInterval(currentAnim);
                attacking = false;
            }, (timePerFrame * 4));

            setTimeout(() =>{
                attackCD = false;
            }, attackTimeCD);
        }

        if(!attacking && notDeath){
                switch (keyDown) {
                case "ArrowLeft":
                    if(direction.right && currentMove == "rigth"){
                        clearInterval(currentAnim);

                        if(anyNotCrossed(direction)){
                            if(direction.up){
                                currentMove = "up";
                                currentAnim = makeAnim(Player, walkUp);
                            }else if(direction.down){
                                currentMove = "down";
                                currentAnim = makeAnim(Player, walkDown);
                            }
                        }
                    }

                    else if(currentMove != "left" && (!anyDirection(direction) || (!direction.right && direction.up && direction.down))){
                        currentAnim = makeAnim(Player, walkLeft);
                        currentMove = "left";
                    }

                    direction.left = true;

                    break; 

                case "ArrowRight":
                    if(direction.left && currentMove == "left"){
                        clearInterval(currentAnim);
                        
                        if(anyNotCrossed(direction)){
                            if(direction.up){
                                currentMove = "up";
                                currentAnim = makeAnim(Player, walkUp);
                            }else if(direction.down){
                                currentMove = "down";
                                currentAnim = makeAnim(Player, walkDown);
                            }
                        }
                    }

                    else if(currentMove != "rigth" && (!anyDirection(direction) || (!direction.left && direction.up && direction.down))){
                        currentAnim = makeAnim(Player, walkRigth);
                        currentMove = "rigth";
                    }
                    
                    direction.right = true;

                    break; 

                case "ArrowUp":
                    if(direction.down && currentMove == "down"){
                        clearInterval(currentAnim);
                        
                        if(anyNotCrossed(direction)){
                            if(direction.left){
                                currentMove = "left";
                                currentAnim = makeAnim(Player, walkLeft);
                            }else if(direction.right){
                                currentMove = "rigth";
                                currentAnim = makeAnim(Player, walkRigth);
                            }
                        }
                    }

                    else if(currentMove != "up" && (!anyDirection(direction) || (!direction.down && direction.left && direction.right))){
                        currentAnim = makeAnim(Player, walkUp);
                        currentMove = "up";
                    }

                    direction.up = true;

                    break; 

                case "ArrowDown":
                    if(direction.up && currentMove == "up"){
                        clearInterval(currentAnim);
                        
                        if(anyNotCrossed(direction)){
                            if(direction.left){
                                currentMove = "left";
                                currentAnim = makeAnim(Player, walkLeft);
                            }else if(direction.right){
                                currentMove = "rigth";
                                currentAnim = makeAnim(Player, walkRigth);
                            }
                        }
                    }

                    else if(currentMove != "down" && (!anyDirection(direction) || (!direction.up && direction.left && direction.right))){
                        currentAnim = makeAnim(Player, walkDown);
                        currentMove = "down";
                    }

                    direction.down = true;

                    break; 
            }
        }
    })

    document.addEventListener('keyup', event => {
        const keyRealease = event.key;

        if(notDeath){
                switch (keyRealease) { 
                    case "ArrowLeft":
                        direction.left = false;
                        if(currentMove != null){
                            clearInterval(currentAnim);
                            lastMove = currentMove;
                            currentMove = null;

                            if(anyNotCrossed(direction)){
                                if(direction.right){
                                    currentAnim = makeAnim(Player, walkRigth);
                                    currentMove = "rigth";
                                }else if(direction.up && !direction.down){
                                    currentAnim = makeAnim(Player, walkUp);
                                    currentMove = "up";
                                }else if(direction.down && !direction.up){
                                    currentAnim = makeAnim(Player, walkDown);
                                    currentMove = "down";
                                }
                            }
                        }
                        break; 
                    case "ArrowRight":
                        direction.right = false;
                        if(currentMove != null) {
                            clearInterval(currentAnim);
                            lastMove = currentMove;
                            currentMove = null;

                            if(anyNotCrossed(direction)){
                                if(direction.left){
                                    currentAnim = makeAnim(Player, walkLeft);
                                    currentMove = "left";
                                }else if(direction.up && !direction.down){
                                    currentAnim = makeAnim(Player, walkUp);
                                    currentMove = "up";
                                }else if(direction.down && !direction.up){
                                    currentAnim = makeAnim(Player, walkDown);
                                    currentMove = "down"
                                }
                            }
                        }
                        break; 
                    case "ArrowUp":
                        direction.up = false;
                        if(currentMove != null){
                            clearInterval(currentAnim);
                            lastMove = currentMove;
                            currentMove = null;

                            if(anyNotCrossed(direction)){
                                if(direction.down){
                                    currentAnim = makeAnim(Player, walkDown);
                                    currentMove = "down";
                                }else if(direction.left && !direction.right){
                                    currentAnim = makeAnim(Player, walkLeft);
                                    currentMove = "left";
                                }else if(direction.right && !direction.left){
                                    currentAnim = makeAnim(Player, walkRigth);
                                    currentMove = "rigth";
                                }
                            }
                        }
                        break; 
                    case "ArrowDown":
                        direction.down = false;
                        if(currentMove != null){
                            clearInterval(currentAnim);
                            lastMove = currentMove;
                            currentMove = null;

                            if(anyNotCrossed(direction)){
                                if(direction.up){
                                    currentAnim = makeAnim(Player, walkUp);
                                    currentMove = "up";
                                }else if(direction.left && !direction.right){
                                    currentAnim = makeAnim(Player, walkLeft);
                                    currentMove = "left";
                                }else if(direction.right && !direction.left){
                                    currentAnim = makeAnim(Player, walkRigth);
                                    currentMove = "rigth"
                                }
                            }
                        }
                        break; 
                }
        }
    })

    setInterval(() => {
        if(!attacking){
            if((direction.left || direction.right) && !(direction.left && direction.right)){
                if(direction.left && xPos.h > 0) {
                    xPos.h = xPos.h - 10;
                    
                }
                else if(direction.right && xPos.h < (vPWidth - 85)) {
                    xPos.h = xPos.h + 10;
                    
                }
            }

            if((direction.up || direction.down) && !(direction.up && direction.down)){
                if(direction.up && yPos.h > 0) {
                    yPos.h = yPos.h - 10;
                    
                }
                else if(direction.down && yPos.h < (vPHeight - 130)) {
                    yPos.h = yPos.h + 10;
                    
                }
            }
        }

        Player.parentElement.style.left = `${xPos.h}px`;
        Player.parentElement.style.top = `${yPos.h}px`;
    }, timePerMove);

    setInterval(() => {
        dat = new Date();
        time = (dat.getTime() % days);
        const rawresponse = updatePlayer(nickName, xPos.h, yPos.h, id, time);
        rawresponse.then(res => allPlayers = res);
    }, intervalTime);

    var allEvents;
    setInterval(() => {
        getEvents().then(res => {
            allEvents = res;

            allEvents.forEach(event => {
                if(event.playerId == id && event.tipoEvento == "golpeado"){
                    notDeath = false;   //Esto bloquea todos los controles del personaje
                    //Si el cliente recibe un evento de golpeado a el se muere, SE MUERE
                    //Hacer la animacion del golpe donde esta el personaje
                    //Hacer la animacion de la muerte del personaje

                    clearInterval(currentAnim);
                    Player.src = "../images/character/death/death.png";

                    new Hit(xPos.h, yPos.h, event._id);
                    
                    postEvent(id, "death", xPos.h, yPos.h, lastMove);
                }
                else if(event.tipoEvento == "golpeado"){
                    //Hacer la animacion del golpe en la posicion que esta como parametro
                    var j = 0;
                    var found = false;

                    do {
                        if(enemies[j].id == event.playerId){
                            enemies[j].getHitted(event._id);
                            found = true;
                        }
                        j++;
                    } while (j < enemies.length && !found);
                }
                else if(event.playerId != id && event.tipoEvento == "attack"){
                    //Hacer la animacion del wachin atacando
                    var j = 0;
                    var found = false;

                    do {
                        if(enemies[j].id == event.playerId){
                            enemies[j].attack(event.direction);
                            found = true;
                        }
                        j++;
                    } while (j < enemies.length && !found);
                }
                else if(event.playerId != id && event.tipoEvento == "death"){
                    //Hacer la animacion del wachin que se murio
                    var j = 0;
                    var found = false;

                    do {
                        if(enemies[j].id == event.playerId){
                            enemies[j].death();
                            found = true;
                        }
                        j++;
                    } while (j < enemies.length && !found);
                }

            })
        });
    }, 250);
}

const timePerMove = 25;

const timePerFrame = 100 //En ms
var frameCounter;

function makeAnim(target, anim){
    frameCounter = 0;
    return setInterval(() => {
        target.src = `${anim[frameCounter]}`;
        frameCounter++;
        if(frameCounter == anim.length) frameCounter = 0;
    }, timePerFrame);
}

function anyDirection(directions){
    if(directions.left || directions.right || directions.up || directions.down) return true;
    else return false;
}

function anyNotCrossed(directions){
    if(anyDirection(directions) && (!(directions.left && directions.right) || !(directions.up && directions.down))) return true;
    else return false;
}

function allDirection(directions){
    if(directions.left && directions.right && directions.down && directions.up) return true;
    else return false;
}

function getVPHeight() {
    return window.innerHeight;
}

function getVPWidth() {
    return window.innerWidth;
}