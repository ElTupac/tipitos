const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerSchema = new Schema ({
    name: String,
    xPos: Number,
    yPos: Number,
    lastTime: Number
});

module.exports = mongoose.model('player', PlayerSchema);