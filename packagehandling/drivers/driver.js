'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const host = process.env.HOST;

const capsConnect = io.connect(`${host}/caps`);

capsConnect.on('pickup', (orderInfo) =>{
  setTimeout(() =>{
    console.log(`DRIVER: picked up [${orderInfo.orderId}]`);
    capsConnect.emit('in-transit', orderInfo);
  },1000);
  setTimeout(() =>{
    console.log('DRIVER: delivered');
    capsConnect.emit('delivered', orderInfo);
  },3000);
});