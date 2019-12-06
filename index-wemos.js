const express = require('express');
const app = express();

const path = require('path');

const server = require('http').Server(app);
const io = require('socket.io')(server);

const manager = require('./manager.js');
const controllersManager = new manager();


/* WEB SERVER REQUESTS */

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/js/scripts.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/js/scripts.js'));
});

app.get('/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/css/styles.css'));
})


/* REQUESTS FROM ARDUINO. POSSIBLY CHANGE INTO POST REQUESTS */

app.get('/handshake', (req, res) => {
    console.log("Handshake recibido!", req.query.ip);
    controllersManager.addSlave(req.query.ip);
    //Hay que notificar el estado al socket
    //La solución podría ser que controllersManager heredase de eventEmitter
    //Así podría actualizar el código dentro del socket
});

/* SOCKETS. USER INTERFACE INTERACTION */

io.sockets.on('connection', (socket) => {
    console.log('cliente conectado!');
    socket.emit('getSlaves', controllersManager.getSlaves());

   let slaves = controllersManager.getSlaves()
   slaves.forEach(slave => {
        controllersManager.slave(slave.id).status().then( (res) => {
            socket.emit('status', slave.id + ',' + res);
            socket.broadcast.emit('status', slave.id + ',' + res);
        });
   });
    
    socket.on('toggle', (id) => {
        controllersManager.slave(id).toggle().then( (res) => {
            socket.emit('status', id + ',' + res);
            socket.broadcast.emit('status', id + ',' + res);
        });
    });
});