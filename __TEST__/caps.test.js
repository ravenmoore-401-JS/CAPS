'use strict';

describe('caps events', () =>{
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('hears event pickup', ()=>{
    events.on();      
    expect(consoleSpy).toHaveBeenCalled();

  });
});