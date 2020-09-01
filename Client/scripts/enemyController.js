

class Enemy {
    constructor(name, itId, theXPos, theYPos){
        this.nickName = name;
        this.id = itId;
        this.xPos = theXPos;
        this.yPos = theYPos;
        this.newXPos = theXPos;
        this.newYPos = theYPos;

        this.domElemento = this.agregarPersonaje(this.xPos, this.yPos);

        setInterval(() => {
            this.updateProgre();
        }, timePerMove);
    }

    agregarPersonaje(xPos, yPos){
        const enemies = document.getElementById('enemys');
        const element = document.createElement('div');

        element.innerHTML = `
            <div id="${this.id}" style="position: absolute; left: ${xPos}px; top: ${yPos}px">
                <p>${this.nickName}</p>
                <img src="../images/character/walk/down/down0.png" alt="kk" class="positionImg">
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
        }else if(this.xPos < this.newYPos){
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
    }

    //TODO:
    //Tener un metodo que updatee los datos de posicion dentro del objeto
    //Generar otro metodo aparte que valla generando el trazo por donde debe ir el personaje
}

var enemies = [];

setTimeout(() => {
    setInterval(() => {
        console.log("Llego");
        allPlayers.forEach(element => {
            var exist = false;
            enemies.forEach(enemy => {
                if(element._id == enemy.id) {
                    exist = true;
                    enemy.newXPos = element.xPos;
                    enemy.newYPos = element.yPos;
                }
            })
            if(!exist && element._id != id) enemies.push(new Enemy(element.name, element._id, element.xPos, element.yPos));
        });
    }, 500);
}, 500);

//Checkear que todos los player que estan en pantalla sigan en la lista que envia el server
//Si no estan eliminarlo mediante un metodo del mismo objeto