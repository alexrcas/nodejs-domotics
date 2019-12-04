const express = require('express');
const app = express();

const path = require('path');

const gpio = require('./gpio.js');
const controller = new gpio();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const wemos = require('./wemos.js');
const wemosController = new wemos('192.168.0.105');

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

io.sockets.on('connection', (socket) => {
    console.log('cliente conectado!');

    //Cambiar esta función para usar wemosController
    socket.emit('status', controller.status());

    socket.on('toggle', () => {
        wemosController.toggle().then( (res) => {
            socket.emit('status', res);
            socket.broadcast.emit('status', res);
        })
    });
});