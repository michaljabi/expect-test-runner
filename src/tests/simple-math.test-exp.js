import ExpectTestSuite from '../etr/ExpectTestSuite';
import expect from 'expect';

const addTwoNumbers = ( a, b ) => {
  return a + b;
}

const compareNumbers = ( a, b ) => {
  return a == b ? -1 : a > b;
}

export default new ExpectTestSuite( 'Simple math functions' )
  .it( 'should add two numbers and give right result', () => {

    expect(addTwoNumbers(8,2)).toNotEqual(12);
    expect(addTwoNumbers(8,2)).toEqual(10);
  } )
  .xshould( 'compare two numbers', () => {

    expect(compareNumbers(3,3)).toEqual(-1);
    expect(compareNumbers(345,345)).toNotEqual(-1);
    expect(compareNumbers(8,2)).toEqual(true);
  } )
  .it( 'should round number to nearest integer', () => {

    expect( Math.round( 2.3 ) ).toEqual( 2 );
    expect( Math.round( 2.5 ) ).toEqual( 3 );
  } )
