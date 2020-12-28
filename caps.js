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
  
  console.log('CAPS Status Ready', socket.id);

  socket.on('join', vendorRoom =>{
    console.log(`you are in ${vendorRoom} room`);
    socket.join(vendorRoom);

  });

  socket.on('driver-retriveMessages', (orderInfo) =>{
    caps.emit('driver-retriveMessages',orderInfo);
  });

  socket.on('pickup', (orderInfo) =>{
    eventLoger('pickup',orderInfo);
    caps.emit('pickup',orderInfo);
  });
  socket.on('pickupRecived', (payload) =>{
    eventLoger('pickup',payload);
    caps.emit('pickupRecived',payload);
  });

  socket.on('in-transit', (orderInfo) =>{
    eventLoger('in-transit',orderInfo);


    caps.to(orderInfo.storeName).emit('in-transit',orderInfo);
  });

  socket.on('delivered', (orderInfo) =>{
    eventLoger('delivered',orderInfo);
    //SAVE TO

    caps.to(orderInfo.storeName).emit('delivered',orderInfo);
  });
  
  
});
function eventLoger(event, payload) {
  const date = new Date().toString();
  console.log('EVENT', { event, date, payload });
}

module.exports = eventLoger;




