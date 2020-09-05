const Player = require("./playerSchema");

var allPlayers;
setInterval(() => {
    Player.find()
    .then(players => allPlayers = players)
}, 125);

module.exports = {
    async newPlayer(req, res){
        //Creado de nuevo jugador
        const data = req.body;

        const nuevoPlayer = new Player({
            name: data.name,
            xPos: 0,
            yPos: 0,
            lastTime: data.time
        });

        nuevoPlayer.save(nuevoPlayer);
        console.log(data.name, nuevoPlayer._id);
        return res.json(nuevoPlayer._id);
    },

    async updatePosPlayer(req, res){
        const data = req.body;
        //const playerId = req.params.theid;

        try {
            await Player.updateOne({_id: req.params.theid}, {
                $set: {
                    xPos: data.xPos,
                    yPos: data.yPos,
                    lastTime: data.time
                }
            });

            return res.json(allPlayers);
        } catch (error) {
            console.log("aca");
            console.log(error);
            return res.status(500);
        }
    }
}