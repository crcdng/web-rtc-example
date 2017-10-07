'use strict';

const fs = require('fs');
const https = require('https');
const nodeStatic = require('node-static');
const os = require('os');
const socketIO = require('socket.io');

const options = {
  key: fs.readFileSync('../ssl/server.key'),
  cert: fs.readFileSync('../ssl/server.crt')
};

const fileServer = new(nodeStatic.Server)('../client');

const app = https.createServer(options, (req, res) => {
  fileServer.serve(req, res);
}).listen(8080);

const io = socketIO.listen(app);
io.sockets.on('connection', (socket) => {

  function log(...args) {
    const array = ['Message from server:'];
    array.push.apply(array, args);
    socket.emit('log', array);
  }

  socket.on('message', (message) => {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', (room) => {
    log(`Received request to create or join room ${room}`);
    const numClients = io.engine.clientsCount;
    log(`Room ${room} now has ${numClients} ${numClients > 1 ? 'clients' : 'client'}`);

    if (numClients === 1) {
      socket.join(room);
      log(`Client ID ${socket.id} created room ${room}`);
      socket.emit('created', room, socket.id);
    } else if (numClients === 2) {
      log(`Client ID ${socket.id} created room ${room}`);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } else { // max two clients
      socket.emit('full', room);
    }
  });

  // socket.on('ipaddr', function() {
  //   const ifaces = os.networkInterfaces();
  //   console.log(ifaces);
  //   for (let dev in ifaces) {
  //     ifaces[dev].forEach(function(details) {
  //       if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
  //         socket.emit('ipaddr', details.address);
  //       }
  //     });
  //   }
  // });

  // socket.on('bye', function(){
  //   console.log('received bye');
  // });

});
