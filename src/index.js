import ExpectTestSuite from './etr/ExpectTestSuite';
import expect from 'expect';

new ExpectTestSuite('This is my Test Suite')
  .it('should not fail if Universe exists', () => {

    const universe = 'Universe';
    expect(universe).toExist();
  })
  .it('should fail if I expect 2 toEqual 3', ()=> {

    expect(2).toEqual(3)
  }).run();

