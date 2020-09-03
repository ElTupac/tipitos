const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({

});

module.exports = mongoose.model('event', EventSchema);