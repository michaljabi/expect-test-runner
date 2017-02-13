import fs from 'fs';
import path from 'path';

export default function expectTestRunner ( { src, matcher, trace } ) {

  if ( src ) {
    const testCases = [];

    function loadTestCases ( pathToTestCase ) {
      const stats = fs.lstatSync( pathToTestCase );

      if ( stats.isDirectory() ) {
        const files = fs.readdirSync( pathToTestCase );
        for ( let step = 0; step < files.length; step++ ) {
          loadTestCases( path.join( pathToTestCase, files[ step ] ) )
        }
      } else {
        const extension = path.extname( pathToTestCase );
        const filename = path.basename( pathToTestCase );

        if ( extension === '.js' && filename.match( matcher ) ) {
          let module = require( path.resolve( pathToTestCase ) );
          if ( module.default && typeof module.default.run === 'function' ) {
            testCases.push( module );
          }
        }
      }
    }

    function runTestCases () {
      let traceErrors = false;
      if(trace){
        traceErrors = trace;
      }
      for ( let idx = 0; idx < testCases.length; idx++ ) {
        testCases[ idx ].default.run({trace:traceErrors});
      }
    }

    loadTestCases( src );
    runTestCases();

  }

}