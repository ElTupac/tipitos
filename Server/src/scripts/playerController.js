const Player = require("./playerSchema");
const e = require("express");

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

            console.log(data.name, data.xPos, data.yPos);
            return res.status(201); 
            //TODO Devolver un mapa con las posiciones de los demas
        } catch (error) {
            console.log(error);
            return res.status(500);
        }
    }
}