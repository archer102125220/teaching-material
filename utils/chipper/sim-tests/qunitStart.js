// Copyright 2020-2024, University of Colorado Boulder

/**
 * Start Qunit while supporting PhET-iO brand
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
import _ from 'lodash';
import QUnit from 'qunit';

import QueryStringMachine from '@/utils/query-string-machine/QueryStringMachine';
// import Tandem from '../../tandem/Tandem';

if (
  typeof window === 'object' &&
  typeof window.QueryStringMachine !== 'object'
) {
  window.QueryStringMachine = QueryStringMachine;
}

const qunitStart = () => {
  const start = () => {
    // Uncomment for a debugger whenever a test fails
    if (
      _.hasIn(window, 'phet.chipper.queryParameters') &&
      window.phet.chipper.queryParameters.debugger
    ) {
      QUnit.log((context) => {
        if (!context.result) {
          debugger;
        }
      });
    }

    // if (Tandem.PHET_IO_ENABLED) {
    //   import(
    //     /* webpackMode: "eager" */ '../../../phet-io/js/phetioEngine.js'
    //   ).then(() => {
    //     // no API validation in unit tests
    //     window.phet.tandem.phetioAPIValidation.enabled = false;
    //     window.phet.phetio.phetioEngine.flushPhetioObjectBuffer();
    //     QUnit.start();
    //   });
    // } else {
    //   QUnit.start();
    // }
    QUnit.start();
  };

  // When running in the puppeteer harness, we need the opportunity to wire up listeners before QUnit begins.
  if (window.QueryStringMachine.containsKey('qunitHooks')) {
    window.qunitLaunchAfterHooks = start;
  } else {
    start();
  }
};

export default qunitStart;
