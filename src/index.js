const http = require('http');
const path = require('path')

const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//db conexion
  mongoose.connect('mongodb://localhost/chat')
  .then(db => consolo.log('db is connected'))
  .catch(err => consolo.log(err));
//confirguracion
 app.set('port', process.env.PORT || 4000)


require('./sockets')(io);



//static files 
app.use(express.static(path.join(__dirname, 'public')));


//inicia el server
server.listen(app.get('port'),() => {
    console.log('server on port' ,app.get('port'));
})

