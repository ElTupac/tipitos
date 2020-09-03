

class Enemy {
    constructor(name, itId, theXPos, theYPos, thelastTime){
        this.nickName = name;
        this.id = itId;
        this.xPos = theXPos;
        this.yPos = theYPos;
        this.newXPos = theXPos;
        this.newYPos = theYPos;
        this.lastTime = thelastTime;

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

        if(change) this.updatePosfea();
        else if(!change && this.currentAnim){
            clearInterval(this.currentAnim);
            this.currentAnim = null;
        }

        if(!this.currentAnim && change){
            if(this.xPos > this.newXPos) this.currentAnim = makeAnim(this.photoElemento, walkLeft);
            else if(this.xPos < this.newXPos) this.currentAnim = makeAnim(this.photoElemento, walkRigth);
            else if(this.yPos > this.newYPos) this.currentAnim = makeAnim(this.photoElemento, walkUp);
            else if(this.yPos < this.newYPos) this.currentAnim = makeAnim(this.photoElemento, walkDown);
        }
        
    }

    checkTimeOut(){
        const nowDate = new Date();
        const nowTime = (nowDate.getTime() % days);

        if((nowTime - this.lastTime) > 6000) return true;
        else return false;
    }
    //TODO:
    //Tener un metodo que updatee los datos de posicion dentro del objeto
    //Generar otro metodo aparte que valla generando el trazo por donde debe ir el personaje
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
    }, 250);

    setInterval(() => {
        var h = 0;
        while(h < enemies.length){
            if(!enemies[h].exist){
                enemies.splice(h, 1);
            }else h++;
        }
    }, 5000);
}, 250);

//Checkear que todos los player que estan en pantalla sigan en la lista que envia el server
//Si no estan eliminarlo mediante un metodo del mismo objeto