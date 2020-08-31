const Player = require("./playerSchema");

module.exports = {
    async newPlayer(req, res){
        const data = req.body;
        console.log(data.name);
        return res.json(data);
    }
}