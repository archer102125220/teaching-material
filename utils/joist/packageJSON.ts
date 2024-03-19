// Copyright 2015-2023, University of Colorado Boulder

/**
 * Make the package.json contents available to the simulation, so it can access the version, sim name, etc.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import joist from '@/utils/joist/joist';

const packageJSON = (window.phet && window.phet.chipper) ? window.phet.chipper.packageObject : { name: 'placeholder' };

joist.register('packageJSON', packageJSON);

export default packageJSON;