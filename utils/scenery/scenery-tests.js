// Copyright 2017-2023, University of Colorado Boulder

/**
 * Unit tests for scenery. Please run once in phet brand and once in brand=phet-io to cover all functionality.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import './accessibility/FocusTests';
import './accessibility/KeyStateTrackerTests';
import './accessibility/pdom/ParallelDOMTests';
import './accessibility/pdom/PDOMInputTests';
import './accessibility/pdom/PDOMSiblingTests';
import './accessibility/pdom/PDOMUtilsTests';
import './display/DisplayTests';
import './display/FuzzTests';
import './layout/constraints/ManualConstraintTests.';
import './layout/nodes/AlignBoxTests';
import './listeners/DragListenerTests';
import './listeners/FireListenerTests';
import './listeners/PressListenerTests';
import './listeners/KeyboardListenerTests';
import './nodes/NodeTests';
import './nodes/RichTextTests';
import './nodes/ShapeTests';
import './nodes/TextTests';
import './tests/MiscellaneousTests';
import './tests/PixelComparisonTests';
import './util/AncestorNodesPropertyTests';
import './util/ColorTests';
import './util/DisplayedPropertyTests';
import './util/FontTests';
import './util/MatrixBetweenPropertyTests';
import './util/TrailTests';
import QueryStringMachine from '@/utils/query-string-machine/QueryStringMachine';
import qunitStart from '../chipper/sim-tests/qunitStart';
import scenery from './scenery';

// add elements to the QUnit fixture for our Scenery-specific tests
// TODO: is this necessary? https://github.com/phetsims/scenery/issues/1581
const $fixture = $( '#qunit-fixture' );
$fixture.append( $( '<div>' ).attr( 'id', 'main' ).attr( 'style', 'position: absolute; left: 0; top: 0; background-color: white; z-index: 1; width: 640px; height: 480px;' ) );
$fixture.append( $( '<div>' ).attr( 'id', 'secondary' ).attr( 'style', 'position: absolute; left: 0; top: 0; background-color: white; z-index: 0; width: 640px; height: 480px;' ) );

// schema should be the same as in initializeGlobals
const sceneryLogQueryParameter = QueryStringMachine.get( 'sceneryLog', {
  type: 'array',
  elementSchema: {
    type: 'string'
  },
  defaultValue: null
} );
sceneryLogQueryParameter && scenery.enableLogging( sceneryLogQueryParameter );

// Since our tests are loaded asynchronously, we must direct QUnit to begin the tests
qunitStart();