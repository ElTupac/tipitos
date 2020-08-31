const URL = "http://127.0.0.1:3000/"

const nickName = window.prompt("Ingresa tu nick");

var allPlayers;

var id;
const rawres = createPlayer(nickName);
rawres.then(res => {
    id = res;
});


//checkear que no haya un nombre igual antes de dejar entrar

//Pedir todos los players, sus ids, nicks y posiciones

function createPlayer(nick){
    return fetch(`${URL}newplayer`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: `${nick}`})
    }).then(res => res.json());
}

function updatePlayer(nick, xPos, yPos, theid){
    return fetch(`${URL}updateplayer/${theid}`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${nick}`,
            xPos: `${xPos}`,
            yPos: `${yPos}`
        })
    }).then(res => res.json());
}