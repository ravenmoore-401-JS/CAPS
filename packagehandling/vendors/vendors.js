'use strict';

require('dotenv').config();

const faker = require('faker');
const io = require('socket.io-client');
const host = process.env.HOST;

const capsConnect = io.connect(`${host}/caps`);

capsConnect.emit('join', process.env.STORE);

setInterval(() => {
  let orderId = Math.ceil(Math.random()*900);
  let newOrder = {
    customerName : faker.name.firstName(),
    customerAddress: faker.address.city(),
    orderId,
    storeName: process.env.STORE,
  };
  console.log(`Vender sent order ${newOrder}`);  
  capsConnect.emit('pickup',newOrder);
},5000);

capsConnect.on('pickupRecived', () => {
  console.log('pickup acknowlaged disconnecting');
  capsConnect.disconnect();
})

const handleDelivered = (orderInfo) => {
  console.log(`thank you for delivering ${orderInfo.orderId} from ${orderInfo.storeName}.`);
};


capsConnect.on('delivered', handleDelivered);
