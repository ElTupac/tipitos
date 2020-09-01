const mongoose = require('mongoose');

const mongoCredentials = "mongodb+srv://temp_user2:CdrDBtwcBwLFBkfZ@testcluster-c2vkw.mongodb.net/tipitos?retryWrites=true&w=majority";

mongoose.connect(mongoCredentials, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDb conectado");
});