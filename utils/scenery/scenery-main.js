// Copyright 2016-2024, University of Colorado Boulder

/**
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import '@/utils/axon/main';
import '@/utils/dot/main';
import '@/utils/kite/main';
import '@/utils/phet-core/main';
import '@/utils/utterance-queue/main';
import '@/utils/scenery/main';

// if (!window.hasOwnProperty('_')) {
//   throw new Error('Underscore/Lodash not found: _');
// }
// if (!window.hasOwnProperty('$')) {
//   throw new Error('jQuery not found: $');
// }

window.phet.scenery.Utils.polyfillRequestAnimationFrame();
