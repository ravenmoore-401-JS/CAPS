'use strict';

const events = require('../events');

describe('caps events', () =>{
  let consoleSpy;
  let events = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('hears event pickup', ()=>{
    events('pickup');

    
    expect(consoleSpy).toHaveBeenCalled();

  });
});