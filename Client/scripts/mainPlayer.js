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
    var attackMoveOnce = false;

    const attackTimeCD = 750;

    var direction = {left: false, right: false, up: false, down: false};

    document.addEventListener('keydown', event => {
        const keyDown = event.key;
        
        //event.preventDefault();
        if(!attackCD && keyDown == "q"){
            attacking = true;
            attackCD = true;
            clearInterval(currentAnim);

            if(currentMove != null) attackDirection = currentMove;
            else attackDirection = lastMove;

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

        if(!attacking){
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
    }, 25);

    setInterval(() => {
        const rawresponse = updatePlayer(nickName, xPos.h, yPos.h, id);
        rawresponse.then(res => allPlayers = res);
    }, 2000);
}

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