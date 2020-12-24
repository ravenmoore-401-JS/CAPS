'use strict';

require('dotenv').config();

const io = require('socket.io-client');
const uuid = require('uuid').v4;
const host = process.env.HOST;

const capsConnect = io.connect(`${host}/caps`);
console.log(' i am a dragon');
const messageQueue = {
  pickup : {},

};
capsConnect.on('pickup', orderInfo => {
  console.log('in the pickup recived');
  const messageId =uuid();
  const storeName = orderInfo.storeName;
  messageQueue.pickup['Event'] = 'pickup';
  messageQueue.pickup[messageId] = orderInfo;
  messageQueue.pickup['store name'] = storeName;

  capsConnect.emit('pickupRecived',{messageId, orderInfo});
});

capsConnect.on('driver-retriveMessages', () =>{
  Object.keys(messageQueue.pickup).forEach(id => {
    capsConnect.emit('pickup', {id, payload: messageQueue.pickup[id]});
  });
});