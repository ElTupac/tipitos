const URL = "http://186.13.4.194:3000/"
const eventURL = "http://186.13.4.194:3000/" 

const nickName = window.prompt("Ingresa tu nick");

var dat = new Date();
const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;
var time = (dat.getTime() % days);

var allPlayers;

var id;
const rawres = createPlayer(nickName, time);
rawres.then(res => {
    id = res;
});

//checkear que no haya un nombre igual antes de dejar entrar

//Pedir todos los players, sus ids, nicks y posiciones

function createPlayer(nick, time){
    return fetch(`${URL}newplayer`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: `${nick}`, time: `${time}`})
    }).then(res => res.json());
}

function updatePlayer(nick, xPos, yPos, theid, time){
    return fetch(`${URL}updateplayer/${theid}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${nick}`,
            xPos: `${xPos}`,
            yPos: `${yPos}`,
            time: `${time}`
        })
    }).then(res => res.json());
}

function getEvents(){
    return fetch(`${eventURL}events`)
    .then(res => res.json());
}

function postEvent(playerId, eventInfo){
    dat = new Date();
    time = (dat.getTime() % days);

    return fetch(`${eventURL}events`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: `${playerId}`,
            event: `${eventInfo}`,
            time: `${time}`
        })
    }).then(res => res.json());
}