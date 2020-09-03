const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    playerId: String,
    tipoEvento: String,
    posX: Number,
    posY: Number
});

module.exports = mongoose.model('event', EventSchema);