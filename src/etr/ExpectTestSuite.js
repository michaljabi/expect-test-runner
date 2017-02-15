import chalk from 'chalk';

export default class ExpectTestSuite {

  constructor ( suiteDescription ) {
    this.name = suiteDescription;
    this.ch = {
      error: chalk.bold.red,
      pass: chalk.bgGreen.black,
      fail: chalk.bgRed.black,
      skip: chalk.bgBlue.black,
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

  should ( name, testCase, skip = false  ) {
    return this.it( `should ${name}`, testCase, skip );
  }

  xshould ( name, testCase ) {
    return this.should( name, testCase, true );
  }

  it ( name, testCase, skip = false ) {
    this.testCases.push( { name, testCase, skip } );
    return this;
  }

  xit ( name, testCase ) {
    this.it( name, testCase, true );
    return this;
  }

  run ( opt = { trace: false } ) {

    let passed = 0;
    let failed = 0;
    let skipped = 0;
    console.log( this.ch.intro( this.titlePrint() ) );
    console.time( "time" );

    for ( let idx = 0; idx < this.testCases.length; idx++ ) {
      const { name, testCase, skip } = this.testCases[ idx ];
      const desc = this.describePrint( idx + 1, name );
      if(skip){
        console.log( desc, "|", this.ch.skip( "[SKIPPED]" ) );
        skipped++;
        continue;
      }
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
    console.log( this.ch.completed( `Test Cases run: ${this.testCases.length}/(${passed})\npassed : ${passed} | failed : ${this.ch.error( failed )} | skipped : ${skipped}` ) );
    console.timeEnd( "time" );
  }

}