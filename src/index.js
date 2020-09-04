const http = require('http');
const path = require('path')

const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//confirguracion
 app.set('port', process.env.PORT || 3000)


require('./sockets')(io);



//static files 
app.use(express.static(path.join(__dirname, 'public')));


//inicia el server
server.listen(app.get('port'),() => {
    console.log('server on port' ,app.get('port'));
})

