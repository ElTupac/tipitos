const express = require('express');
const routes = express.Router();

const eventManager = require("./events");

const app = express();

routes.get('/status', (req, res) => {
    res.status(200);
});

//Controladores

routes.get('/events', eventManager.getEventos);
routes.post('/events', eventManager.postEvento);


module.exports = routes;