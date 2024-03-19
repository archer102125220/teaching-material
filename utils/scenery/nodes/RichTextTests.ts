// Copyright 2021-2023, University of Colorado Boulder

/**
 * RichText tests
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
import QUnit from 'qunit';

import DerivedProperty from '@/utils/axon/DerivedProperty';
import StringProperty from '@/utils/axon/StringProperty';
import RichText from '@/utils/scenery/nodes/RichText';

QUnit.module('RichText');

QUnit.test('Mutually exclusive options', assert => {

  assert.ok(true, 'always true, even when assertions are not on.');

  const stringProperty = new StringProperty('um, hoss?');
  window.assert && assert.throws(() => {
    return new RichText({

      // @ts-expect-error for testing
      string: 'hi',
      stringProperty
    });
  }, 'text and stringProperty values do not match');

});

QUnit.test('DerivedProperty stringProperty', assert => {

  assert.ok(true, 'always true, even when assertions are not on.');

  const string = 'oh boy, here we go';
  const stringProperty = new StringProperty(string);

  const extra = '!!';
  const aBitExtraForAStringProperty = new DerivedProperty([stringProperty], value => value + extra);

  const text = new RichText(aBitExtraForAStringProperty);

  assert.ok(text.stringProperty.value === string + extra);
  stringProperty.value = string + extra;
  assert.ok(text.string === string + extra + extra);

  window.assert && assert.throws(() => {
    text.string = 'hi';
  }, 'cannot set a derivedProperty');
});