import ExpectTestSuite from '../etr/ExpectTestSuite';
import expect from 'expect';

export default new ExpectTestSuite( 'Other tests....' )
  .it( 'should be a number to Bob', () => {

    const bobCell = 12771923;

    expect( bobCell ).toBeA( 'number' );
  } )
  .it( 'shall not pass', () => {

    function GoodGuy (nick) {
      this.name = nick;
    }

    function BadGuy (nick) {
      this.name = nick;
    }

    const creature = new BadGuy('Balrog');

    expect( creature ).toBeA( GoodGuy );
  } )
