// Copyright 2017-2023, University of Colorado Boulder

/**
 * Node tests
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../axon/js/BooleanProperty.js';
import TProperty from '../../../axon/js/TProperty.js';
import Bounds2 from '../../../dot/js/Bounds2.js';
import Vector2 from '../../../dot/js/Vector2.js';
import { Shape } from '../../../kite/js/imports.js';
import IntentionalAny from '../../../phet-core/js/types/IntentionalAny.js';
import Tandem from '../../../tandem/js/Tandem.js';
import Touch from '../input/Touch.js';
import Node from './Node.js';
import Rectangle from './Rectangle.js';

QUnit.module('Node');

function fakeTouchPointer(vector: Vector2): Touch {
  return new Touch(0, vector, {} as Event);
}

QUnit.test('Mouse and Touch areas', assert => {
  const node = new Node();
  const rect = new Rectangle(0, 0, 100, 50);
  rect.pickable = true;

  node.addChild(rect);

  window.assert.ok(!!rect.hitTest(new Vector2(10, 10)), 'Rectangle intersection');
  window.assert.ok(!!rect.hitTest(new Vector2(90, 10)), 'Rectangle intersection');
  window.assert.ok(!rect.hitTest(new Vector2(-10, 10)), 'Rectangle no intersection');

  node.touchArea = Shape.rectangle(-50, -50, 100, 100);

  window.assert.ok(!!node.hitTest(new Vector2(10, 10)), 'Node intersection');
  window.assert.ok(!!node.hitTest(new Vector2(90, 10)), 'Node intersection');
  window.assert.ok(!node.hitTest(new Vector2(-10, 10)), 'Node no intersection');

  window.assert.ok(!!node.trailUnderPointer(fakeTouchPointer(new Vector2(10, 10))), 'Node intersection (isTouch)');
  window.assert.ok(!!node.trailUnderPointer(fakeTouchPointer(new Vector2(90, 10))), 'Node intersection (isTouch)');
  window.assert.ok(!!node.trailUnderPointer(fakeTouchPointer(new Vector2(-10, 10))), 'Node intersection (isTouch)');

  node.clipArea = Shape.rectangle(0, 0, 50, 50);

  // points outside the clip area shouldn't register as hits
  window.assert.ok(!!node.trailUnderPointer(fakeTouchPointer(new Vector2(10, 10))), 'Node intersection (isTouch with clipArea)');
  window.assert.ok(!node.trailUnderPointer(fakeTouchPointer(new Vector2(90, 10))), 'Node no intersection (isTouch with clipArea)');
  window.assert.ok(!node.trailUnderPointer(fakeTouchPointer(new Vector2(-10, 10))), 'Node no intersection (isTouch with clipArea)');
});


const epsilon = 0.000000001;

QUnit.test('Points (parent and child)', assert => {
  const a = new Node();
  const b = new Node();
  a.addChild(b);
  a.x = 10;
  b.y = 10;

  window.assert.ok(new Vector2(5, 15).equalsEpsilon(b.localToParentPoint(new Vector2(5, 5)), epsilon), 'localToParentPoint on child');
  window.assert.ok(new Vector2(15, 5).equalsEpsilon(a.localToParentPoint(new Vector2(5, 5)), epsilon), 'localToParentPoint on root');

  window.assert.ok(new Vector2(5, -5).equalsEpsilon(b.parentToLocalPoint(new Vector2(5, 5)), epsilon), 'parentToLocalPoint on child');
  window.assert.ok(new Vector2(-5, 5).equalsEpsilon(a.parentToLocalPoint(new Vector2(5, 5)), epsilon), 'parentToLocalPoint on root');

  window.assert.ok(new Vector2(15, 15).equalsEpsilon(b.localToGlobalPoint(new Vector2(5, 5)), epsilon), 'localToGlobalPoint on child');
  window.assert.ok(new Vector2(15, 5).equalsEpsilon(a.localToGlobalPoint(new Vector2(5, 5)), epsilon), 'localToGlobalPoint on root (same as localToparent)');

  window.assert.ok(new Vector2(-5, -5).equalsEpsilon(b.globalToLocalPoint(new Vector2(5, 5)), epsilon), 'globalToLocalPoint on child');
  window.assert.ok(new Vector2(-5, 5).equalsEpsilon(a.globalToLocalPoint(new Vector2(5, 5)), epsilon), 'globalToLocalPoint on root (same as localToparent)');

  window.assert.ok(new Vector2(15, 5).equalsEpsilon(b.parentToGlobalPoint(new Vector2(5, 5)), epsilon), 'parentToGlobalPoint on child');
  window.assert.ok(new Vector2(5, 5).equalsEpsilon(a.parentToGlobalPoint(new Vector2(5, 5)), epsilon), 'parentToGlobalPoint on root');

  window.assert.ok(new Vector2(-5, 5).equalsEpsilon(b.globalToParentPoint(new Vector2(5, 5)), epsilon), 'globalToParentPoint on child');
  window.assert.ok(new Vector2(5, 5).equalsEpsilon(a.globalToParentPoint(new Vector2(5, 5)), epsilon), 'globalToParentPoint on root');

});

QUnit.test('Bounds (parent and child)', assert => {
  const a = new Node();
  const b = new Node();
  a.addChild(b);
  a.x = 10;
  b.y = 10;

  const bounds = new Bounds2(4, 4, 20, 30);

  window.assert.ok(new Bounds2(4, 14, 20, 40).equalsEpsilon(b.localToParentBounds(bounds), epsilon), 'localToParentBounds on child');
  window.assert.ok(new Bounds2(14, 4, 30, 30).equalsEpsilon(a.localToParentBounds(bounds), epsilon), 'localToParentBounds on root');

  window.assert.ok(new Bounds2(4, -6, 20, 20).equalsEpsilon(b.parentToLocalBounds(bounds), epsilon), 'parentToLocalBounds on child');
  window.assert.ok(new Bounds2(-6, 4, 10, 30).equalsEpsilon(a.parentToLocalBounds(bounds), epsilon), 'parentToLocalBounds on root');

  window.assert.ok(new Bounds2(14, 14, 30, 40).equalsEpsilon(b.localToGlobalBounds(bounds), epsilon), 'localToGlobalBounds on child');
  window.assert.ok(new Bounds2(14, 4, 30, 30).equalsEpsilon(a.localToGlobalBounds(bounds), epsilon), 'localToGlobalBounds on root (same as localToParent)');

  window.assert.ok(new Bounds2(-6, -6, 10, 20).equalsEpsilon(b.globalToLocalBounds(bounds), epsilon), 'globalToLocalBounds on child');
  window.assert.ok(new Bounds2(-6, 4, 10, 30).equalsEpsilon(a.globalToLocalBounds(bounds), epsilon), 'globalToLocalBounds on root (same as localToParent)');

  window.assert.ok(new Bounds2(14, 4, 30, 30).equalsEpsilon(b.parentToGlobalBounds(bounds), epsilon), 'parentToGlobalBounds on child');
  window.assert.ok(new Bounds2(4, 4, 20, 30).equalsEpsilon(a.parentToGlobalBounds(bounds), epsilon), 'parentToGlobalBounds on root');

  window.assert.ok(new Bounds2(-6, 4, 10, 30).equalsEpsilon(b.globalToParentBounds(bounds), epsilon), 'globalToParentBounds on child');
  window.assert.ok(new Bounds2(4, 4, 20, 30).equalsEpsilon(a.globalToParentBounds(bounds), epsilon), 'globalToParentBounds on root');
});

QUnit.test('Points (order of transforms)', assert => {
  const a = new Node();
  const b = new Node();
  const c = new Node();
  a.addChild(b);
  b.addChild(c);
  a.x = 10;
  b.scale(2);
  c.y = 10;

  window.assert.ok(new Vector2(20, 30).equalsEpsilon(c.localToGlobalPoint(new Vector2(5, 5)), epsilon), 'localToGlobalPoint');
  window.assert.ok(new Vector2(-2.5, -7.5).equalsEpsilon(c.globalToLocalPoint(new Vector2(5, 5)), epsilon), 'globalToLocalPoint');
  window.assert.ok(new Vector2(20, 10).equalsEpsilon(c.parentToGlobalPoint(new Vector2(5, 5)), epsilon), 'parentToGlobalPoint');
  window.assert.ok(new Vector2(-2.5, 2.5).equalsEpsilon(c.globalToParentPoint(new Vector2(5, 5)), epsilon), 'globalToParentPoint');
});

QUnit.test('Bounds (order of transforms)', assert => {
  const a = new Node();
  const b = new Node();
  const c = new Node();
  a.addChild(b);
  b.addChild(c);
  a.x = 10;
  b.scale(2);
  c.y = 10;

  const bounds = new Bounds2(4, 4, 20, 30);

  window.assert.ok(new Bounds2(18, 28, 50, 80).equalsEpsilon(c.localToGlobalBounds(bounds), epsilon), 'localToGlobalBounds');
  window.assert.ok(new Bounds2(-3, -8, 5, 5).equalsEpsilon(c.globalToLocalBounds(bounds), epsilon), 'globalToLocalBounds');
  window.assert.ok(new Bounds2(18, 8, 50, 60).equalsEpsilon(c.parentToGlobalBounds(bounds), epsilon), 'parentToGlobalBounds');
  window.assert.ok(new Bounds2(-3, 2, 5, 15).equalsEpsilon(c.globalToParentBounds(bounds), epsilon), 'globalToParentBounds');
});

QUnit.test('Trail and Node transform equivalence', assert => {
  const a = new Node();
  const b = new Node();
  const c = new Node();
  a.addChild(b);
  b.addChild(c);
  a.x = 10;
  b.scale(2);
  c.y = 10;

  const trailMatrix = c.getUniqueTrail().getMatrix();
  const nodeMatrix = c.getUniqueTransform().getMatrix();
  window.assert.ok(trailMatrix.equalsEpsilon(nodeMatrix, epsilon), 'Trail and Node transform equivalence');
});

QUnit.test('Mutually exclusive options', assert => {

  window.assert.ok(true, 'always true, even when assertions are not on.');

  const visibleProperty = new BooleanProperty(true);
  window.assert && window.assert.throws(() => {
    return new Node({
      visible: false,
      visibleProperty
    });
  }, 'visible and visibleProperty values do not match');

  const pickableProperty = new BooleanProperty(true);
  window.assert && window.assert.throws(() => {
    return new Node({
      pickable: false,
      pickableProperty
    });
  }, 'pickable and pickableProperty values do not match');

  const enabledProperty = new BooleanProperty(true);
  window.assert && window.assert.throws(() => {
    return new Node({
      enabled: false,
      enabledProperty
    });
  }, 'enabled and enabledProperty values do not match');

  const inputEnabledProperty = new BooleanProperty(true);
  window.assert && window.assert.throws(() => {
    return new Node({
      inputEnabled: false,
      inputEnabledProperty
    });
  }, 'inputEnabled and inputEnabledProperty values do not match');

});

if (Tandem.PHET_IO_ENABLED) {

  QUnit.test('Node instrumented visibleProperty', assert => testInstrumentedNodeProperty(assert, 'visible',
    'visibleProperty', 'setVisibleProperty',
    true, 'phetioVisiblePropertyInstrumented'));

  QUnit.test('Node instrumented enabledProperty', assert => testInstrumentedNodeProperty(assert, 'enabled',
    'enabledProperty', 'setEnabledProperty',
    Node.DEFAULT_NODE_OPTIONS.phetioEnabledPropertyInstrumented, 'phetioEnabledPropertyInstrumented'));

  QUnit.test('Node instrumented inputEnabledProperty', assert => testInstrumentedNodeProperty(assert, 'inputEnabled',
    'inputEnabledProperty', 'setInputEnabledProperty',
    Node.DEFAULT_NODE_OPTIONS.phetioInputEnabledPropertyInstrumented, 'phetioInputEnabledPropertyInstrumented'));

  /**
   * Factor out a way to test added Properties to Node and their PhET-iO instrumentation
   * @param assert - from qunit test
   * @param nodeField - name of getter/setter, like `visible`
   * @param nodeProperty - name of public property, like `visibleProperty`
   * @param nodePropertySetter - name of setter function, like `setVisibleProperty`
   * @param ownedPropertyInstrumented - default value of phetioNodePropertyInstrumentedKeyName option in Node.
   * @param phetioNodePropertyInstrumentedKeyName - key name for setting opt-in PhET-iO instrumentation
   */
  const testInstrumentedNodeProperty = (assert: Assert, nodeField: keyof Node,
    nodeProperty: string, nodePropertySetter: string,
    ownedPropertyInstrumented: boolean, phetioNodePropertyInstrumentedKeyName: string): void => {

    const apiValidation = phet.tandem.phetioAPIValidation;
    const previousAPIValidationEnabled = apiValidation.enabled;
    const previousSimStarted = apiValidation.simHasStarted;

    apiValidation.simHasStarted = false;

    const testNodeAndProperty = (node: Node, property: TProperty<IntentionalAny>) => {
      const initialValue = node[nodeField];
      window.assert.ok(property.value === node[nodeField], 'initial values should be the same');
      // @ts-expect-error - no sure now to do this well in typescript
      node[nodeField] = !initialValue;
      window.assert.ok(property.value === !initialValue, 'property should reflect node change');
      property.value = initialValue;
      window.assert.ok(node[nodeField] === initialValue, 'node should reflect property change');

      // @ts-expect-error - no sure now to do this well in typescript
      node[nodeField] = initialValue;
    };

    const instrumentedProperty = new BooleanProperty(false, { tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyProperty`) });
    const otherInstrumentedProperty = new BooleanProperty(false, { tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyOtherProperty`) });
    const uninstrumentedProperty = new BooleanProperty(false);

    /***************************************
     /* Testing uninstrumented Nodes
     */


    // uninstrumentedNode => no property (before startup)
    let uninstrumented = new Node();
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(uninstrumented[nodeProperty]['targetProperty'] === undefined);
    // @ts-expect-error - no sure now to do this well in typescript
    testNodeAndProperty(uninstrumented, uninstrumented[nodeProperty]);

    // uninstrumentedNode => uninstrumented property (before startup)
    uninstrumented = new Node({ [nodeProperty]: uninstrumentedProperty });
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(uninstrumented[nodeProperty]['targetProperty'] === uninstrumentedProperty);
    testNodeAndProperty(uninstrumented, uninstrumentedProperty);

    // uninstrumentedNode => instrumented property (before startup)
    uninstrumented = new Node();
    uninstrumented.mutate({
      [nodeProperty]: instrumentedProperty
    });
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(uninstrumented[nodeProperty]['targetProperty'] === instrumentedProperty);
    testNodeAndProperty(uninstrumented, instrumentedProperty);

    //  uninstrumentedNode => instrumented property => instrument the Node (before startup) OK
    uninstrumented = new Node();
    uninstrumented.mutate({
      [nodeProperty]: instrumentedProperty
    });
    uninstrumented.mutate({ tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode`) });
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(uninstrumented[nodeProperty]['targetProperty'] === instrumentedProperty);
    testNodeAndProperty(uninstrumented, instrumentedProperty);
    uninstrumented.dispose();

    // ////////////////////////////////////////////////
    apiValidation.simHasStarted = true;

    // uninstrumentedNode => no property (before startup)
    uninstrumented = new Node();
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(uninstrumented[nodeProperty]['targetProperty'] === undefined);
    // @ts-expect-error - no sure now to do this well in typescript
    testNodeAndProperty(uninstrumented, uninstrumented[nodeProperty]);

    // uninstrumentedNode => uninstrumented property (before startup)
    uninstrumented = new Node({ [nodeProperty]: uninstrumentedProperty });
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(uninstrumented[nodeProperty]['targetProperty'] === uninstrumentedProperty);
    testNodeAndProperty(uninstrumented, uninstrumentedProperty);

    // uninstrumentedNode => instrumented property (before startup)
    uninstrumented = new Node();
    uninstrumented.mutate({
      [nodeProperty]: instrumentedProperty
    });
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(uninstrumented[nodeProperty]['targetProperty'] === instrumentedProperty);
    testNodeAndProperty(uninstrumented, instrumentedProperty);

    //  uninstrumentedNode => instrumented property => instrument the Node (before startup) OK
    uninstrumented = new Node();
    uninstrumented.mutate({
      [nodeProperty]: instrumentedProperty
    });

    uninstrumented.mutate({ tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode`) });
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(uninstrumented[nodeProperty]['targetProperty'] === instrumentedProperty);
    testNodeAndProperty(uninstrumented, instrumentedProperty);
    uninstrumented.dispose();
    apiValidation.simHasStarted = false;


    /***************************************
     /* Testing instrumented nodes
     */

    // instrumentedNodeWithDefaultInstrumentedProperty => instrumented property (before startup)
    let instrumented = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode`),
      [phetioNodePropertyInstrumentedKeyName]: true
    });
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(instrumented[nodeProperty]['targetProperty'] === instrumented[nodeProperty].ownedPhetioProperty);
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(instrumented['linkedElements'].length === 0, `no linked elements for default ${nodeProperty}`);
    // @ts-expect-error - no sure now to do this well in typescript
    testNodeAndProperty(instrumented, instrumented[nodeProperty]);
    instrumented.dispose();

    // instrumentedNodeWithDefaultInstrumentedProperty => uninstrumented property (before startup)
    instrumented = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode`),
      [phetioNodePropertyInstrumentedKeyName]: true
    });
    // @ts-expect-error - no sure now to do this well in typescript
    instrumented.hasOwnProperty('phetioNodePropertyInstrumentedKeyName') && window.assert.ok(instrumented[phetioNodePropertyInstrumentedKeyName] === true, 'getter should work');
    window.assert && window.assert.throws(() => {
      instrumented.mutate({ [nodeProperty]: uninstrumentedProperty });
    }, `cannot remove instrumentation from the Node's ${nodeProperty}`);
    instrumented.dispose();

    // instrumentedNodeWithPassedInInstrumentedProperty => instrumented property (before startup)
    instrumented = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode`),
      [phetioNodePropertyInstrumentedKeyName]: true
    });
    instrumented.mutate({ [nodeProperty]: instrumentedProperty });
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(instrumented[nodeProperty]['targetProperty'] === instrumentedProperty);
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(instrumented['linkedElements'].length === 1, 'added linked element');
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(instrumented['linkedElements'][0].element === instrumentedProperty,
      `added linked element should be for ${nodeProperty}`);
    testNodeAndProperty(instrumented, instrumentedProperty);
    instrumented.dispose();

    instrumented = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode`),
      [nodeProperty]: instrumentedProperty
    });
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(instrumented[nodeProperty]['targetProperty'] === instrumentedProperty);
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(instrumented['linkedElements'].length === 1, 'added linked element');
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(instrumented['linkedElements'][0].element === instrumentedProperty,
      `added linked element should be for ${nodeProperty}`);
    testNodeAndProperty(instrumented, instrumentedProperty);
    instrumented.dispose();

    // instrumentedNodeWithPassedInInstrumentedProperty => uninstrumented property (before startup)
    instrumented = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode`),
      [nodeProperty]: instrumentedProperty
    });
    window.assert && window.assert.throws(() => {
      instrumented.mutate({ [nodeProperty]: uninstrumentedProperty });
    }, `cannot remove instrumentation from the Node's ${nodeProperty}`);
    instrumented.dispose();
    instrumented = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode`)
    });
    instrumented.mutate({ [nodeProperty]: instrumentedProperty });
    window.assert && window.assert.throws(() => {
      instrumented.mutate({ [nodeProperty]: uninstrumentedProperty });
    }, `cannot remove instrumentation from the Node's ${nodeProperty}`);
    instrumented.dispose();

    apiValidation.enabled = true;
    apiValidation.simHasStarted = true;
    // instrumentedNodeWithDefaultInstrumentedProperty => instrumented property (after startup)
    const instrumented1 = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyUniquelyNamedNodeThatWillNotBeDuplicated1`),
      [phetioNodePropertyInstrumentedKeyName]: true
    });
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(instrumented1[nodeProperty]['targetProperty'] === instrumented1[nodeProperty].ownedPhetioProperty);
    // @ts-expect-error - no sure now to do this well in typescript
    window.assert.ok(instrumented1['linkedElements'].length === 0, `no linked elements for default ${nodeProperty}`);
    // @ts-expect-error - no sure now to do this well in typescript
    testNodeAndProperty(instrumented1, instrumented1[nodeProperty]);

    // instrumentedNodeWithDefaultInstrumentedProperty => uninstrumented property (after startup)
    const instrumented2 = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyUniquelyNamedNodeThatWillNotBeDuplicated2`),
      [phetioNodePropertyInstrumentedKeyName]: true
    });
    window.assert && window.assert.throws(() => {
      // @ts-expect-error - no sure now to do this well in typescript
      instrumented2[nodePropertySetter](uninstrumentedProperty);
    }, `cannot remove instrumentation from the Node's ${nodeProperty}`);

    // instrumentedNodeWithPassedInInstrumentedProperty => instrumented property (after startup)
    const instrumented3 = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyUniquelyNamedNodeThatWillNotBeDuplicated3`),
      [nodeProperty]: instrumentedProperty
    });

    window.assert && window.assert.throws(() => {
      instrumented3.mutate({ [nodeProperty]: otherInstrumentedProperty });
    }, 'cannot swap out one instrumented for another');

    // instrumentedNodeWithPassedInInstrumentedProperty => uninstrumented property (after startup)
    const instrumented4 = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyUniquelyNamedNodeThatWillNotBeDuplicated4`),
      [nodeProperty]: instrumentedProperty
    });
    window.assert && window.assert.throws(() => {
      instrumented4.mutate({ [nodeProperty]: uninstrumentedProperty });
    }, `cannot remove instrumentation from the Node's ${nodeProperty}`);
    const instrumented5 = new Node({});
    instrumented5.mutate({ [nodeProperty]: instrumentedProperty });
    instrumented5.mutate({ tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyUniquelyNamedNodeThatWillNotBeDuplicated5`) });
    window.assert && window.assert.throws(() => {
      instrumented5.mutate({ [nodeProperty]: uninstrumentedProperty });
    }, `cannot remove instrumentation from the Node's ${nodeProperty}`);
    apiValidation.enabled = false;

    apiValidation.enabled = true;

    apiValidation.simHasStarted = false;

    // instrumentedNodeOptsOutOfDefault => instrumented Property set later (but before startup)
    const instrumented6 = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode6`),
      [phetioNodePropertyInstrumentedKeyName]: false // required when passing in an instrumented one later
    });

    // @ts-expect-error - no sure now to do this well in typescript
    instrumented6[nodeProperty] = new BooleanProperty(false, {
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyBooleanProperty`)
    });
    apiValidation.enabled = false;

    instrumented6.dispose();
    instrumented1.dispose();

    // These can't be disposed because they were broken while creating (on purpose in an assert.throws()). These elements
    // have special Tandem component names to make sure that they don't interfere with other tests (since they can't be
    // removed from the registry
    // instrumented2.dispose();
    // instrumented3.dispose();
    // instrumented4.dispose();
    // instrumented5.dispose();

    instrumented = new Node({
      tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode`),
      [phetioNodePropertyInstrumentedKeyName]: true
    });
    window.assert && window.assert.throws(() => {
      // @ts-expect-error - no sure now to do this well in typescript
      instrumented[nodePropertySetter](null);
    }, `cannot clear out an instrumented ${nodeProperty}`);
    instrumented.dispose();


    // If by default this property isn't instrumented, then this should cause an error
    if (!ownedPropertyInstrumented) {

      instrumented = new Node({
        tandem: Tandem.ROOT_TEST.createTandem(`${nodeField}MyNode`)
      });
      window.assert && window.assert.throws(() => {

        // @ts-expect-error - no sure now to do this well in typescript
        instrumented[phetioNodePropertyInstrumentedKeyName] = true;
      }, `cannot set ${phetioNodePropertyInstrumentedKeyName} after instrumentation`);
      instrumented.dispose();
    }


    instrumentedProperty.dispose();
    otherInstrumentedProperty.dispose();
    apiValidation.simHasStarted = previousSimStarted;
    apiValidation.enabled = previousAPIValidationEnabled;
  };
}
