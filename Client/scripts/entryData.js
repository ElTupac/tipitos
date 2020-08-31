const URL = "http://127.0.0.1:3000/"

const nickName = window.prompt("Ingresa tu nick");

const id = createPlayer(nickName);
id.then(res => console.log(res));


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