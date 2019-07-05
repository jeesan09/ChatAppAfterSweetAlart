'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);



io.on('connection',function(socket){

 console.log('connetion made',socket.id);


     socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });
     
    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });


});


setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
