const Player = require('./playerSchema');
const Event = require('./eventSchema');

const heigth = 120;
const width = 80;

var allPlayers;
var allEvents;

setInterval(() => {
    Player.find()
    .then(players => allPlayers = players);
}, 125);

setInterval(() => {
    Event.find()
    .then(events => allEvents = events);
}, 125);

module.exports = {

    async getEventos(req, res){ //Devuelve todos los ultimos eventos
        return res.json(allEvents);
    },

    async postEvento(req, res){ //Envia un evento nuevo generado
        const eventData = req.body;

        if(eventData.event == "attack"){
            var yHit;
            var xHit;

            switch(eventData.direction) {
                case "left":
                    if(eventData.xPos > (width/2)) xHit = eventData.xPos - (width/2);
                    else xHit = eventData.xPos;
                    yHit = eventData.yPos;
                    break;

                case "rigth":
                    xHit = parseInt(eventData.xPos) + (width/2);
                    yHit = eventData.yPos;
                    break;

                case "up":
                    if(eventData.yPos > (heigth/2)) yHit = eventData.yPos - (heigth/2);
                    else yHit = eventData.yPos;
                    xHit = eventData.xPos;
                    break;

                case "down":
                    yHit = parseInt(eventData.yPos) + (heigth/2);
                    xHit = eventData.xPos;
                    break;

                //tuve que poner los parseInt en esas sumas porque forzaba un string y concatenaba los valores
            }

            const ataque = new Event({
                playerId: eventData.id,
                tipoEvento: eventData.event,
                posX: eventData.xPos,
                posY: eventData.yPos,
                time: eventData.time,
                direction: eventData.direction
            });

            ataque.save(ataque);

            var hitteado = false;

            allPlayers.forEach(player => {
                if(player._id != eventData.id && rangeCollision(xHit, parseInt(xHit)+width, player.xPos, parseInt(player.xPos)+width) && rangeCollision(yHit, parseInt(yHit)+heigth, player.yPos, parseInt(player.yPos)+heigth)){
                    //Golpearon a este player
                    //Generar un evento de esto y guardarlo en la bd

                    hitteado = true;
                    const golpeado = new Event({
                        playerId: player._id,
                        tipoEvento: "golpeado",
                        posX: ataque.posX,
                        posY: ataque.posY,
                        time: eventData.time
                    });

                    golpeado.save(golpeado);
                }
            });
        }
        else if(eventData.event == "death"){
            const muerto = new Event({
                playerId: eventData.id,
                tipoEvento: eventData.event,
                posX: eventData.xPos,
                posY: eventData.yPos,
                time: eventData.time
            });
            
            muerto.save(muerto);
        }

        //Al final se pide de nuevo todos los eventos para actualizarlos en tiempo real
        //Sino podemos generar que ciertos eventos se pierdan por el tiempo de intervalo

        Event.find()
        .then(events => allEvents = events);

        return res.json({ok: false});
    }
    //geteventos tiene que devolver eventos hasta X tiempo hacia atras
    //postEvento tiene que registrar un evento y relacionarlo a la posicion actual del jugador
    //comprobar si el evento genera otro evento, como la muerte de otro jugador.
}

function rangeCollision(min1, max1, min2, max2){
    if((min2 > min1 && min2 < max1) || (max2 > min1 && max2 < max1)) return true;
    else return false;
}