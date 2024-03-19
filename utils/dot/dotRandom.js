// Copyright 2021, University of Colorado Boulder

/**
 * A singleton instance that is statically seeded; for use generally.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import _ from 'lodash';

import dot from '@/utils/dot/dot';
import Random from '@/utils/dot/Random';

const dotRandom = new Random({
  seed: _.hasIn(window, 'phet.chipper.queryParameters.randomSeed')
    ? window.phet.chipper.queryParameters.randomSeed
    : null
});

dot.register('dotRandom', dotRandom);

export default dotRandom;
