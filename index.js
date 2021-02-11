const express = require('express');
const app = express();
const server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', (request, respons) => {
  respons.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', (socket) => {
  console.log('Успешное соеденение');
  connections.push(socket);

  socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Отключились');
  });

  socket.on('send mess', (data) => {
    io.sockets.emit('add mess', { mess: data.mess, name: data.name, className: data.className });
  });
});
