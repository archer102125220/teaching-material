// Copyright 2017-2022, University of Colorado Boulder

/**
 * Unit tests for kite. Please run once in phet brand and once in brand=phet-io to cover all functionality.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import qunitStart from '@/utils/chipper/sim-tests/qunitStart';
import '@/utils/kite/ShapeTests';

// Since our tests are loaded asynchronously, we must direct QUnit to begin the tests
qunitStart();