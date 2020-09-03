const Player = require('./playerSchema');
const Event = require('./eventSchema');

var allPlayers;
var allEvents;

setInterval(() => {
    Player.find()
    .then(players => allPlayers = players);
}, 250);

setInterval(() => {
    Event.find()
    .then(events => allEvents = events);
}, 250);

module.exports = {
    //hacer un getEventos
    //hacer un postEvento

    async getEventos(req, res){

    },

    async postEvento(req, res){

    }
    //geteventos tiene que devolver eventos hasta X tiempo hacia atras
    //postEvento tiene que registrar un evento y relacionarlo a la posicion actual del jugador
    //comprobar si el evento genera otro evento, como la muerte de otro jugador.
}