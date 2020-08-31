const express = require('express');
const routes = express.Router();
const path = require('path');

const playerController = require("./playerController");

const app = express();

routes.use(express.static(path.join(__dirname, '/../../../Client/')));

routes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../../../Client/pages/index.html'));
});

//Aca van los controladores

routes.post('/newplayer', playerController.newPlayer);

routes.get('/status', (req, res) => {
    res.send({status: 200});
});

module.exports = routes;