'use strict';

require('dotenv').config();
const port = process.env.PORT||3000;
const io = require('socket.io')(port);

const caps =io.of('/caps');

io.on('connection', (socket) => {
  console.log('im alive');
  console.log('System Status Ready', socket.id);
});

caps.on('connection', (socket) =>{
  function eventLoger(event, payload) {
    const date = new Date().toString();
    console.log('EVENT', { event, date, payload });
  } 
  console.log('CAPS Status Ready', socket.id);

  socket.on('pickup', (orderInfo) =>{
    eventLoger('pickup',orderInfo);
    caps.emit('pickup',orderInfo);
  });

  socket.on('in-transit', (orderInfo) =>{
    eventLoger('in-transit',orderInfo);
    caps.emit('in-transit',orderInfo);
  });

  socket.on('delivered', (orderInfo) =>{
    eventLoger('delivered',orderInfo);
    caps.emit('delivered',orderInfo);
  });
});



