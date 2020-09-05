class Enemy {
    constructor(name, itId, theXPos, theYPos, thelastTime){
        this.nickName = name;
        this.id = itId;
        this.xPos = theXPos;
        this.yPos = theYPos;
        this.newXPos = theXPos;
        this.newYPos = theYPos;
        this.lastTime = thelastTime;

        this.attacking = false;
        this.alive = true;

        this.currentAnim = null;

        this.domElemento = this.agregarPersonaje(this.xPos, this.yPos);
        this.photoElemento = document.getElementById(`${this.id}_foto`);

        this.exist = true;

        this.moveInterval = setInterval(() => {
            this.updateProgre();
        }, timePerMove);
        
        this.checkInterval = setInterval(() => {
            if(this.checkTimeOut()){
                clearInterval(this.moveInterval);
                this.domElemento.parentElement.parentElement.removeChild(this.domElemento.parentElement);
                this.exist = false;
                clearInterval(this.checkInterval);
            }
        }, 1000);
    }

    agregarPersonaje(xPos, yPos){
        const enemies = document.getElementById('enemys');
        const element = document.createElement('div');

        element.innerHTML = `
            <div id="${this.id}" style="position: absolute; left: ${xPos}px; top: ${yPos}px">
                <p>${this.nickName}</p>
                <img src="../images/character/walk/down/down0.png" alt="kk" class="positionImg" id="${this.id}_foto">
            </div>
        `

        enemies.appendChild(element);

        return document.getElementById(`${this.id}`);
    }

    updatePosfea(){
        this.domElemento.style.left = `${this.xPos}px`;
        this.domElemento.style.top = `${this.yPos}px`;

        return;
    }

    updateProgre(){
        var change = false;
    
        if(this.xPos > this.newXPos){
            this.xPos = this.xPos - 10;
            change = true;
        }else if(this.xPos < this.newXPos){
            this.xPos = this.xPos + 10;
            change = true;
        }

        if(this.yPos > this.newYPos){
            this.yPos = this.yPos - 10;
            change = true;
        }else if(this.yPos < this.newYPos){
            this.yPos = this.yPos + 10;
            change = true;
        }

        if(change && this.alive) this.updatePosfea();
        else if(!change && this.currentAnim && !this.attacking){
            clearInterval(this.currentAnim);
            this.currentAnim = null;
        }

        if(!this.currentAnim && change && this.alive){
            if(this.xPos > this.newXPos) this.currentAnim = makeAnim(this.photoElemento, walkLeft);
            else if(this.xPos < this.newXPos) this.currentAnim = makeAnim(this.photoElemento, walkRigth);
            else if(this.yPos > this.newYPos) this.currentAnim = makeAnim(this.photoElemento, walkUp);
            else if(this.yPos < this.newYPos) this.currentAnim = makeAnim(this.photoElemento, walkDown);
        }
        
        return;
    }

    checkTimeOut(){
        const nowDate = new Date();
        const nowTime = (nowDate.getTime() % days);

        if((nowTime - this.lastTime) > 6000) return true;
        else return false;
    }

    getHitted(eventId){
        return new Hit(this.xPos, this.yPos, eventId);
    }

    attack(direction){
        this.attacking = true;
        clearInterval(this.currentAnim);
        switch (direction) {
            case "left":
                this.currentAnim = makeAnim(this.photoElemento, attackLeft);
                break;
            
            case "rigth":
                this.currentAnim = makeAnim(this.photoElemento, attackRigth);
                break;

            case "up":
                this.currentAnim = makeAnim(this.photoElemento, attackUp);
                break;

            case "down":
                this.currentAnim = makeAnim(this.photoElemento, attackDown);
                break;

        }

        setTimeout(() => {
            clearInterval(this.currentAnim);
            this.attacking = false;
            this.currentAnim = null;
        }, (timePerFrame * 4));

        return;
    }

    death(){
        this.alive = false;
        clearInterval(this.currentAnim);
        this.currentAnim = null;
        this.photoElemento.src = "../images/character/death/death.png";
        return;
    }
}

class Hit{
    constructor(xPos, yPos, _id){
        this.spawn(xPos, yPos, _id);
        this.eraseSpawn(_id, 500);
    }

    spawn(X, Y, id){
        const interactions = document.getElementById("interactions");
        const element = document.createElement('div');

        var yVariation = Y + 80;

        element.innerHTML= `
            <div id="${id}" style="position: absolute; left: ${X}px; top: ${yVariation}px">
                <img src="../images/golpe.png" alt="kk" style="width: 97px; height: 60px;">
            </div>
        `

        interactions.appendChild(element);

        return document.getElementById(`${id}`);
    }

    eraseSpawn(id, time){
        setTimeout(() => {
            const element = document.getElementById(`${id}`);
            element.parentElement.parentElement.removeChild(element.parentElement);
        }, time);

        return;
    }
}

var enemies = [];

setTimeout(() => {
    setInterval(() => {
        allPlayers.forEach(element => {
            var exist = false;
            enemies.forEach(enemy => {
                if(element._id == enemy.id) {
                    exist = true;
                    enemy.newXPos = element.xPos;
                    enemy.newYPos = element.yPos;
                    enemy.lastTime = element.lastTime;
                }
            })
            if(!exist && element._id != id) enemies.push(new Enemy(element.name, element._id, element.xPos, element.yPos, element.lastTime));
        });
    }, 125);

    setInterval(() => {
        var h = 0;
        while(h < enemies.length){
            if(!enemies[h].exist){
                enemies.splice(h, 1);
            }else h++;
        }
    }, 1500);
}, 250);