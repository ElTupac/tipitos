const mongoose = require('mongoose');
const Player = require('./playerSchema');

const mongoCredentials = "mongodb+srv://temp_user2:CdrDBtwcBwLFBkfZ@testcluster-c2vkw.mongodb.net/tipitos?retryWrites=true&w=majority";

mongoose.connect(mongoCredentials, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDb conectado");
    setInterval(() => {
        Player.find()
        .then(players => {
            console.log("Checkeando");
            const time = timeNow();
            var contador = 0;

            players.forEach(player => {
                if((time - player.lastTime) > MaxTimeOut){
                    //Eliminarlo de la bd y agregar al contador
                    Player.findByIdAndDelete(player._id, (err, doc) => {
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Deleted " + doc._id);
                            contador++;
                        }
                    });
                }
            })

            if(contador){
                console.log("Eliminados " + contador + " jugadores");
            }
        })
    }, 5000);
});

const MaxTimeOut = 5000;

function timeNow(){
    const date = new Date();
    const days = 1000 * 60 * 60 * 24;
    return (date.getTime() % days);
};

