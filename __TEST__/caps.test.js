'use strict';

const events = require('../events');
describe('caps events', () =>{
  let consoleSpy;
  let payload;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('hears event pickup', ()=>{
    events.on('pickup',payload);      
    expect(consoleSpy).toHaveBeenCalled();

  });
});