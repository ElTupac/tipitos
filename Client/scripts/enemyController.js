

class Enemy {
    constructor(name, itId, theXPos, theYPos){
        this.nickName = name;
        this.id = itId;
        this.xPos = theXPos;
        this.yPos = theYPos;

        this.agregarPersonaje(this.xPos, this.yPos);
    }

    agregarPersonaje(xPos, yPos){
        const enemies = document.getElementById('enemys');
        const element = document.createElement('div');

        element.innerHTML = `
            <div id="${this.id}" style="position: absolute; left: ${this.xPos}px; top: ${this.yPos}px">
                <p>${this.nickName}</p>
                <img src="../images/character/walk/down/down0.png" alt="kk" class="positionImg">
            </div>
        `

        enemies.appendChild(element);
    }
}

var enemies = [];

setTimeout(() => {
    setInterval(() => {
        console.log("Llego");
        allPlayers.forEach(element => {
            var exist = false;
            enemies.forEach(enemy => {
                if(element._id == enemy.id) exist = true;
            })
            if(!exist) enemies.push(new Enemy(element.name, element._id, element.xPos, element.yPos));
        });
    }, 2000);
}, 3000);