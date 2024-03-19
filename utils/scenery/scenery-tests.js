// Copyright 2017-2023, University of Colorado Boulder

/**
 * Unit tests for scenery. Please run once in phet brand and once in brand=phet-io to cover all functionality.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import '@/utils/scenery/accessibility/FocusTests';
import '@/utils/scenery/accessibility/KeyStateTrackerTests';
import '@/utils/scenery/accessibility/pdom/ParallelDOMTests';
import '@/utils/scenery/accessibility/pdom/PDOMInputTests';
import '@/utils/scenery/accessibility/pdom/PDOMSiblingTests';
import '@/utils/scenery/accessibility/pdom/PDOMUtilsTests';
import '@/utils/scenery/display/DisplayTests';
import '@/utils/scenery/display/FuzzTests';
import '@/utils/scenery/layout/constraints/ManualConstraintTests.';
import '@/utils/scenery/layout/nodes/AlignBoxTests';
import '@/utils/scenery/listeners/DragListenerTests';
import '@/utils/scenery/listeners/FireListenerTests';
import '@/utils/scenery/listeners/PressListenerTests';
import '@/utils/scenery/listeners/KeyboardListenerTests';
import '@/utils/scenery/nodes/NodeTests';
import '@/utils/scenery/nodes/RichTextTests';
import '@/utils/scenery/nodes/ShapeTests';
import '@/utils/scenery/nodes/TextTests';
import '@/utils/scenery/tests/MiscellaneousTests';
import '@/utils/scenery/tests/PixelComparisonTests';
import '@/utils/scenery/util/AncestorNodesPropertyTests';
import '@/utils/scenery/util/ColorTests';
import '@/utils/scenery/util/DisplayedPropertyTests';
import '@/utils/scenery/util/FontTests';
import '@/utils/scenery/util/MatrixBetweenPropertyTests';
import '@/utils/scenery/util/TrailTests';
import QueryStringMachine from '@/utils/query-string-machine/QueryStringMachine';
import $ from '@/utils/sherpa/lib/jquery-2.1.0';
import qunitStart from '@/utils/chipper/sim-tests/qunitStart';
import scenery from '@/utils/scenery/scenery';

// const $ = require('@/utils/sherpa/lib/jquery-2.1.0');
if (
  typeof window === 'object' &&
  typeof window.QueryStringMachine !== 'object'
) {
  window.QueryStringMachine = QueryStringMachine;
}

// add elements to the QUnit fixture for our Scenery-specific tests
// TODO: is this necessary? https://github.com/phetsims/scenery/issues/1581
const $fixture = $('#qunit-fixture');
$fixture.append(
  $('<div>')
    .attr('id', 'main')
    .attr(
      'style',
      'position: absolute; left: 0; top: 0; background-color: white; z-index: 1; width: 640px; height: 480px;'
    )
);
$fixture.append(
  $('<div>')
    .attr('id', 'secondary')
    .attr(
      'style',
      'position: absolute; left: 0; top: 0; background-color: white; z-index: 0; width: 640px; height: 480px;'
    )
);

// schema should be the same as in initializeGlobals
const sceneryLogQueryParameter = window.QueryStringMachine.get('sceneryLog', {
  type: 'array',
  elementSchema: {
    type: 'string'
  },
  defaultValue: null
});
sceneryLogQueryParameter && scenery.enableLogging(sceneryLogQueryParameter);

// Since our tests are loaded asynchronously, we must direct QUnit to begin the tests
qunitStart();
