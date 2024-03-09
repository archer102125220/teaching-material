// Copyright 2021-2023, University of Colorado Boulder

/**
 * Text tests
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import DerivedProperty from '../../axon/DerivedProperty';
import StringProperty from '../../axon/StringProperty';
import Text from './Text';

QUnit.module('Text');

QUnit.test('Mutually exclusive options', assert => {

  window.assert.ok(true, 'always true, even when assertions are not on.');

  const stringProperty = new StringProperty('oh boy, here we go.');
  window.assert && window.assert.throws(() => {
    return new Text({

      // @ts-expect-error for testing
      string: 'hi',
      stringProperty
    });
  }, 'text and stringProperty values do not match');

});

QUnit.test('DerivedProperty stringProperty', assert => {

  window.assert.ok(true, 'always true, even when assertions are not on.');

  const string = 'oh boy, here we go';
  const stringProperty = new StringProperty(string);

  const extra = '!!';
  const aBitExtraForAStringProperty = new DerivedProperty([stringProperty], value => value + extra);

  const text = new Text(aBitExtraForAStringProperty);

  window.assert.ok(text.stringProperty.value === string + extra);
  stringProperty.value = string + extra;
  window.assert.ok(text.string === string + extra + extra);

  window.assert && window.assert.throws(() => {
    text.string = 'hi';
  }, 'cannot set a derivedProperty');
});

