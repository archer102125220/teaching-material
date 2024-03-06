// Copyright 2016-2024, University of Colorado Boulder

/**
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import '../axon/main';
import '../dot/main';
import '../kite/main';
import '../phet-core/main';
import '../utterance-queue/main';
import './main';

if ( !window.hasOwnProperty( '_' ) ) {
  throw new Error( 'Underscore/Lodash not found: _' );
}
if ( !window.hasOwnProperty( '$' ) ) {
  throw new Error( 'jQuery not found: $' );
}

window.phet.scenery.Utils.polyfillRequestAnimationFrame();