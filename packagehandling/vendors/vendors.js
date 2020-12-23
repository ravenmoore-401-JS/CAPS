'use strict';

require('dotenv').config();

const faker = require('faker');
const io = require('socket.io-client');
const host = process.env.HOST;

const capsConnect = io.connect(`${host}/caps`);

setInterval(() => {
  let orderId = Math.ceil(Math.random()*900);
  let locationOptions = [process.env.STORE,process.env.STORE2,process.env.STORE3];
  let randomLocation = Math.floor(Math.random()*locationOptions.length-1);
  let newOrder = {
    customerName : faker.name.firstName(),
    customerAddress: faker.address.city(),
    orderId,
    storeName: locationOptions[randomLocation],
  };
  console.log(`Vender sent order ${newOrder}`);
  capsConnect.emit('pickup', newOrder);
},5000);



const handleDelivered1 = (orderInfo) => {
  if(orderInfo.storeName === process.env.STORE){
    console.log(`thank you for delivering${orderInfo.orderId} from ${orderInfo.storeName}.`);}
  if(orderInfo.storeName === process.env.STORE2){
    console.log(`thank you for delivering${orderInfo.orderId} from ${orderInfo.storeName}.`);}
  if(orderInfo.storeName === process.env.STORE3){
    console.log(`thank you for delivering${orderInfo.orderId} from ${orderInfo.storeName}.`);}
  console.log('lost package?');
};

capsConnect.on('delivered', handleDelivered1);
