'use strict';

const events = require('./events');

require('./packagehandling/drivers/driver');
require('./packagehandling/vendors/vendors');

let date = Date().toString();

events.on('pickup', (orderInfo) => {
  console.log(orderInfo);
  console.log(`EVENT { event: 'pickup', time: ${date}, payload: ${orderInfo} }`);
});

events.on('in-transit', (orderInfo) =>{
  console.log(`EVENT { event: 'in-transit', time: ${date}, payload: ${orderInfo} }`);
});

events.on('delivered', (orderInfo) => {
  console.log(`EVENT { event: 'delivered', time: ${date}, payload: ${orderInfo} }`);
});


