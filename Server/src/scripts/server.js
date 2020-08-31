const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const mongoCredentials = "mongodb+srv://temp_user:wrt11334mfSWIvBj@testcluster-c2vkw.mongodb.net/tipitos?retryWrites=true&w=majority";

mongoose.connect(mongoCredentials, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDb conectado");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);


try {
    app.listen(PORT, () => {
        console.log(`Server en puerto ${PORT}`);
    })
} catch (error) {
    console.log(`Fallo iniciar en puerto ${PORT}`, error);
}