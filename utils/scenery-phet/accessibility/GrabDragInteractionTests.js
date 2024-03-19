// Copyright 2018-2023, University of Colorado Boulder

/**
 * QUnit tests for GrabDragInteraction
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
import QUnit from 'qunit';

import {
  Display,
  KeyboardDragListener,
  Node,
  Rectangle
} from '@/utils/scenery/imports';
import Tandem from '@/utils/tandem/Tandem';
import GrabDragInteraction from '@/utils/scenery-phet/accessibility/GrabDragInteraction';

// constants
const thingString = 'thing';
const movableString = 'movable';

QUnit.module('GrabDragInteraction');

QUnit.test('GrabDragInteraction defaults', (assert) => {
  assert.ok(true, 'first test');

  const rootNode = new Node({ tagName: 'div' });
  const display = new Display(rootNode);
  display.initializeEvents();
  document.body.appendChild(display.domElement);

  window.phet = window.phet || {};
  window.phet.joist = window.phet.joist || {};
  window.phet.joist.sim = window.phet.joist.sim || {};

  // GrabDragInteraction requires a sim
  window.phet.joist.sim.supportsGestureDescription =
    window.phet.joist.sim.supportsGestureDescription || false;

  const a = new Rectangle(0, 0, 5, 5);

  rootNode.addChild(a);

  const keyboardDragListener = new KeyboardDragListener({
    tandem: Tandem.ROOT_TEST.createTandem('myKeyboardDragListener')
  });
  const interaction = new GrabDragInteraction(a, keyboardDragListener, {
    tandem: Tandem.ROOT_TEST.createTandem('myGrabDragInteraction'),
    objectToGrabString: thingString
  });

  const testDefaultGrabbable = () => {
    // GrabDragInteraction requires the page to be active to behave corectly, otherwise focus/blur events do not
    // fire. See https://github.com/phetsims/aqua/issues/134.
    if (document.hasFocus()) {
      assert.ok(interaction.grabbable, 'default to grabbable');
      assert.ok(
        a.tagName.toUpperCase() === 'BUTTON',
        'grabbable defaults to button'
      );
      assert.ok(a.ariaRole === null, 'no role for grabbable');
      assert.ok(
        a.ariaLabel.indexOf(thingString) >= 0,
        'ariaLabel should include thing string for grabbable'
      );

      const aElement = a.pdomInstances[0].peer.primarySibling;
      assert.ok(
        aElement.tagName === 'BUTTON',
        'grabbable defaults to button html element.'
      );
    } else {
      console.warn(
        'Cannot complete tests because document does not have focus.'
      );
    }
  };

  testDefaultGrabbable();

  a.pdomInstances[0].peer.primarySibling.click();

  const testDefaultDraggable = () => {
    assert.ok(
      !interaction.grabbable,
      'should be draggable after click draggable'
    );
    assert.ok(a.tagName.toUpperCase() === 'DIV', 'draggable defaults to div');
    assert.ok(a.ariaRole === 'application', 'draggable gets application role');
    assert.ok(
      a.ariaLabel.indexOf(thingString) >= 0,
      'ariaLabel should include thing string'
    );
    assert.ok(
      a.ariaLabel === a.innerContent,
      'ariaLabel should include thing string'
    );

    const aElement = a.pdomInstances[0].peer.primarySibling;
    assert.ok(
      aElement.tagName === 'DIV',
      'draggable defaults to div html element.'
    );
    assert.ok(
      aElement.getAttribute('aria-roledescription') === movableString,
      'aria role description should describe that it is movable by default'
    );
    assert.ok(
      aElement.innerHTML === a.ariaLabel,
      'element innerHTML should be same as model label'
    );
    assert.ok(
      aElement.getAttribute('aria-label') === a.ariaLabel,
      'element innerHTML should be same as model label'
    );
  };

  testDefaultDraggable();

  a.pdomInstances[0].peer.primarySibling.blur();

  testDefaultGrabbable();

  display.dispose();
});
