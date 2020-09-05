const mongoose = require('mongoose');
const Player = require('./playerSchema');
const Event = require('./eventSchema');

const mongoCredentials = "mongodb+srv://temp_user2:CdrDBtwcBwLFBkfZ@testcluster-c2vkw.mongodb.net/tipitos?retryWrites=true&w=majority";

mongoose.connect(mongoCredentials, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDb conectado");

    //Se eliminan los jugadores que no hayan respondido por mas de cierto tiempo
    //El tiempo maximo sin respuesta esta seteado en MaxTimeOut
    setInterval(() => {
        Player.find()
        .then(players => {
            const time = timeNow();

            players.forEach(player => {
                if((time - player.lastTime) > MaxTimeOut){
                    //Eliminarlo de la bd y agregar al contador
                    Player.findByIdAndDelete(player._id, (err, doc) => {
                        if(err){
                            console.log(err);
                        }else{
                            console.log(`Deleted { ${doc._id} , ${doc.name} }`);
                        }
                    });
                }
            });

        });
    }, 2500);

    //Aprovecho y hago tambien aca el sistema para eliminar eventos en timeOut de la base
    //De esta forma no se entregaran eventos mas de una vez
    setInterval(() => {
        Event.find()
        .then(events => {
            const time = timeNow();

            events.forEach(event => {
                if((time - event.time) > EventTimeOut){
                    //Eliminarlo de la bd
                    Event.findByIdAndDelete(event._id, (err, doc) => {
                        if(err){
                            console.log(err);
                        }
                    });
                }
            });

        });
    }, 125);
});

const MaxTimeOut = (1000 * 60 * 2);
const EventTimeOut = 125;

function timeNow(){
    const date = new Date();
    const days = 1000 * 60 * 60 * 24;
    return (date.getTime() % days);
};

