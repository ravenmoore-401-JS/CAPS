'use strict';

require('dotenv').config();
const events = require('../../events');
const faker = require('faker');





setInterval(() => {
  let randomId = Math.ceil(Math.random()*900);
  let newOrder = {
    customerName : faker.name.firstName(),
    customerAddress: faker.address.city(),
    orderId: randomId,
    storeName: process.env.STORE,
  };
  console.log('Vender sent order');
  events.emit('pickup', newOrder);
},5000);

events.on('delivered', (orderInfo) => {
  console.log('Thank You');
});


