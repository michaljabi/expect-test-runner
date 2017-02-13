import chalk from 'chalk';

export default class ExpectTestSuite {

  constructor ( name ) {
    this.name = name;
    this.ch = {
      error: chalk.bold.red,
      pass: chalk.bgGreen.black,
      fail: chalk.bgRed.black,
      intro: chalk.green,
      completed: chalk.green,
    };
    this.testCases = [];
    return this;
  }

  titlePrint () {
    return `> Test Suite: '${this.name}'`;
  }

  describePrint ( no, description ) {
    const blue = chalk.blue;
    return `Run TC [${no}]: ${blue( description )}`;
  }

  it ( name, testCase ) {
    this.testCases.push( { name, testCase } );
    return this;
  }

  run ( opt = { trace: false } ) {

    let passed = 0;
    let failed = 0;
    console.log( this.ch.intro( this.titlePrint() ) );
    console.time( "time" );

    for ( let idx = 0; idx < this.testCases.length; idx++ ) {
      const { name, testCase } = this.testCases[ idx ];
      const desc = this.describePrint( idx + 1, name );
      try {
        testCase();
        console.log( desc, "|", this.ch.pass( "[PASSED]" ) );
        passed++;
      } catch ( e ) {
        console.log( desc, "|", this.ch.fail( "[FAILED]" ) );
        console.log( this.ch.fail( `>   TC [${idx + 1}]:` ), this.ch.error( e ) );
        if ( opt.trace ) {
          console.trace( e );
        }
        failed++;
      }
    }
    console.log( this.ch.completed( `Test Cases run: ${this.testCases.length}/(${passed})\npassed : ${passed} | failed : ${this.ch.error( failed )}` ) );
    console.timeEnd( "time" );
  }

}