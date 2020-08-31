const Player = require("./playerSchema");

var allPlayers;
setInterval(() => {
    Player.find()
    .then(players => allPlayers = players)
}, 2000);

module.exports = {
    async newPlayer(req, res){
        //Creado de nuevo jugador
        //TODO Checkear que no exista el mismo nombre
        const data = req.body;

        const nuevoPlayer = new Player({
            name: data.name,
            xPos: 0,
            yPos: 0
        });

        nuevoPlayer.save(nuevoPlayer);
        console.log(data.name, nuevoPlayer._id);
        return res.json(nuevoPlayer._id);
    },

    async updatePosPlayer(req, res){
        const data = req.body;
        const {theid} = req.params;

        try {
            await Player.updateOne({_id: theid}, {
                $set: {
                    xPos: data.xPos,
                    yPos: data.yPos
                }
            });

            //console.log(data.name, data.xPos, data.yPos);
            return res.json(allPlayers);
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
}