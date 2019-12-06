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
});

/* SOCKETS. USER INTERFACE INTERACTION */

io.sockets.on('connection', (socket) => {
    console.log('cliente conectado!');
    socket.emit('getSlaves', controllersManager.getSlaves());

    controllersManager.slave(0).status().then( (res) => {
        socket.emit('status', res);
        socket.broadcast.emit('status', res);
    } )
    
    socket.on('toggle', (id) => {
        controllersManager.slave(0).toggle().then( (res) => {
            socket.emit('status', res);
            socket.broadcast.emit('status', res);
        })
    });
});