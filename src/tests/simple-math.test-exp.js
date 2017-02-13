import ExpectTestSuite from '../etr/ExpectTestSuite';
import expect from 'expect';

const addTwoNumbers = ( a, b ) => {
  return a + b;
}

export default new ExpectTestSuite( 'Simple math functions' )
  .it( 'should add two numbers and give right result', () => {

    expect(addTwoNumbers(8,2)).toNotEqual(12);
    expect(addTwoNumbers(8,2)).toEqual(10);
  } )
  .it( 'should round number to nearest integer', () => {

    expect( Math.round( 2.3 ) ).toEqual( 2 );
    expect( Math.round( 2.5 ) ).toEqual( 3 );
  } )
