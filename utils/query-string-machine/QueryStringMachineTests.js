// Copyright 2016-2024, University of Colorado Boulder

/**
 * QueryStringMachine tests
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import _ from 'lodash';
import QUnit from 'qunit';

import QueryStringMachine from '@/utils/query-string-machine/QueryStringMachine';

QUnit.module('QueryStringMachine');

// assert shadows window.assert
QUnit.test('basic tests', (assert) => {
  const value = 'hello';
  window.assert.equal(value, 'hello', 'We expect value to be hello');

  const schemaMap = {
    height: {
      type: 'number',
      defaultValue: 6,
      validValues: [4, 5, 6, 7, 8]
    },
    name: {
      type: 'string',
      defaultValue: 'Larry',
      isValidValue: function (str) {
        return str.indexOf('Z') !== 0; // Name cannot start with 'Z'
      }
    },
    custom: {
      type: 'custom',
      defaultValue: 'abc',
      validValues: ['abc', 'def', 'ghi'],
      parse: function (string) {
        return string.toLowerCase();
      }
    },
    isWebGL: {
      type: 'flag'
    },
    screens: {
      type: 'array',
      defaultValue: [],
      elementSchema: {
        type: 'number'
      }
    },
    colors: {
      type: 'array',
      defaultValue: ['red', 'green', 'blue'],
      elementSchema: {
        type: 'string'
      }
    }
  };

  window.assert.deepEqual(
    QueryStringMachine.getAllForString(schemaMap, ''),
    {
      height: 6,
      name: 'Larry',
      custom: 'abc',
      isWebGL: false,
      screens: [],
      colors: ['red', 'green', 'blue']
    },
    'A blank query string should provide defaults'
  );

  window.assert.deepEqual(
    QueryStringMachine.getAllForString(schemaMap, '?height=7&isWebGL'),
    {
      height: 7,
      name: 'Larry',
      custom: 'abc',
      isWebGL: true,
      screens: [],
      colors: ['red', 'green', 'blue']
    },
    'Query parameter values should be parsed'
  );

  window.assert.deepEqual(
    QueryStringMachine.getAllForString(schemaMap, '?screens='),
    {
      height: 6,
      name: 'Larry',
      custom: 'abc',
      isWebGL: false,
      screens: [],
      colors: ['red', 'green', 'blue']
    },
    'No value for screens should result in an empty array '
  );

  window.assert.deepEqual(
    QueryStringMachine.getAllForString(
      schemaMap,
      '?height=7&isWebGL&custom=DEF'
    ),
    {
      height: 7,
      name: 'Larry',
      custom: 'def',
      isWebGL: true,
      screens: [],
      colors: ['red', 'green', 'blue']
    },
    'Custom query parameter should be supported'
  );

  window.assert.deepEqual(
    QueryStringMachine.getAllForString(
      schemaMap,
      '?isWebGL&screens=1,2,3,5&colors=yellow,orange,pink'
    ),
    {
      height: 6,
      name: 'Larry',
      custom: 'abc',
      isWebGL: true,
      screens: [1, 2, 3, 5],
      colors: ['yellow', 'orange', 'pink']
    },
    'Array should be parsed'
  );

  const flagSchema = {
    flag: {
      type: 'flag'
    }
  };
  window.assert.deepEqual(
    QueryStringMachine.getAllForString(flagSchema, '?flag'),
    {
      flag: true
    },
    'Flag was provided'
  );

  window.assert.deepEqual(
    QueryStringMachine.getAllForString(flagSchema, '?flag='),
    {
      flag: true
    },
    'Flag was provided with no value'
  );

  window.assert.throws(() => {
    QueryStringMachine.getAllForString(flagSchema, '?flag=hello');
  }, 'Flags cannot have values');

  window.assert.throws(() => {
    QueryStringMachine.getAllForString(flagSchema, '?flag=true');
  }, 'Flags cannot have values');

  // Test that isValidValue is supported for arrays with a contrived check (element sum == 7).
  // With an input of [2,4,0], QSM should throw an error, and it should be caught here.
  window.assert.throws(() => {
    QueryStringMachine.getAllForString(
      {
        numbers: {
          type: 'array',
          elementSchema: {
            type: 'number'
          },
          defaultValue: [1, 6, 0],
          isValidValue: function (arr) {
            // Fake test: check that elements sum to 7 for phetsims/query-string-machine#11
            const arraySum = arr.reduce((a, b) => a + b, 0);
            return arraySum === 7;
          }
        }
      },
      '?numbers=2,4,0'
    );
  }, 'Array error handling should catch exception');

  window.assert.throws(() => {
    QueryStringMachine.getAllForString(
      {
        sim: {
          type: 'string'
        }
      },
      '?ea&hello=true'
    );
  }, 'Catch missing required query parameter');

  window.assert.deepEqual(
    QueryStringMachine.getForString(
      'hello',
      {
        type: 'array',
        elementSchema: {
          type: 'number'
        },
        validValues: [
          [1, 2],
          [3, 4],
          [1, 2, 3]
        ],
        defaultValue: [1, 2]
      },
      '?ea&hello=1,2,3'
    ),
    [1, 2, 3],
    'Arrays should support defaultValue and validValues'
  );

  window.assert.throws(() => {
    QueryStringMachine.getForString(
      'hello',
      {
        type: 'array',
        elementSchema: {
          type: 'number'
        },
        validValues: [
          [1, 2],
          [3, 4],
          [1, 2, 3]
        ],
        defaultValue: [1, 2]
      },
      '?ea&hello=1,2,3,99'
    );
  }, 'Catch invalid value for array');

  window.assert.deepEqual(
    QueryStringMachine.getForString(
      'screens',
      {
        type: 'array',
        elementSchema: {
          type: 'number'
        },
        defaultValue: null
      },
      '?screens=1,2,3'
    ),
    [1, 2, 3],
    'Test array of numbers'
  );
});

// Tests for our own deepEquals method
QUnit.test('deepEquals', (assert) => {
  window.assert.equal(
    QueryStringMachine.deepEquals(7, 7),
    true,
    '7 should equal itself'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(7, 8),
    false,
    '7 should not equal 8'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(7, '7'),
    false,
    '7 should not equal "7"'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals({ 0: 'A' }, 'A'),
    false,
    'string tests'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(['hello', 7], ['hello', 7]),
    true,
    'array equality test'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(['hello', 7], ['hello', '7']),
    false,
    'array inequality test'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(
      ['hello', { hello: true }],
      ['hello', { hello: true }]
    ),
    true,
    'object in array inequality test'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(
      ['hello', { hello: true }],
      ['hello', { hello: false }]
    ),
    false,
    'object in array  inequality test'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(
      { x: [{ y: 'hello' }, true, 123, 'x'] },
      { x: [{ y: 'hello' }, true, 123, 'x'] }
    ),
    true,
    'object in array  inequality test'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(
      { x: [{ y: 'hello' }, true, 123, 'x'] },
      { x: [true, { y: 'hello' }, true, 123, 'x'] }
    ),
    false,
    'object in array  inequality test'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(
      { x: [{ y: 'hello' }, true, 123, 'x'] },
      { y: [{ y: 'hello' }, true, 123, 'x'] }
    ),
    false,
    'object in array  inequality test'
  );
  window.assert.equal(QueryStringMachine.deepEquals(null, null), true, 'null null');
  window.assert.equal(
    QueryStringMachine.deepEquals(null, undefined),
    false,
    'null undefined'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(undefined, undefined),
    true,
    'undefined undefined'
  );
  window.assert.equal(
    QueryStringMachine.deepEquals(
      () => {},
      () => {}
    ),
    false,
    'different implementations of similar functions'
  );
  const f = function () {};
  window.assert.equal(
    QueryStringMachine.deepEquals(f, f),
    true,
    'same reference function'
  );
});

QUnit.test('removeKeyValuePair', (assert) => {
  window.assert.equal(
    QueryStringMachine.removeKeyValuePair('?time=now', 'time'),
    '',
    'Remove single occurrence'
  );
  window.assert.equal(
    QueryStringMachine.removeKeyValuePair('?time=now&place=here', 'time'),
    '?place=here',
    'Remove single occurrence but leave other'
  );
  window.assert.equal(
    QueryStringMachine.removeKeyValuePair('?time=now&time=later', 'time'),
    '',
    'Remove multiple occurrences'
  );
  window.assert.equal(
    QueryStringMachine.removeKeyValuePair('?time=now&time', 'time'),
    '',
    'Remove multiple occurrences, one with value'
  );
  window.assert.equal(
    QueryStringMachine.removeKeyValuePair('?place=here&time=now', 'time'),
    '?place=here',
    'Different order'
  );
  window.assert.equal(
    QueryStringMachine.removeKeyValuePair('?time&place', 'time'),
    '?place',
    'Remove with no values'
  );
  window.assert.equal(
    QueryStringMachine.removeKeyValuePair('?place&time', 'time'),
    '?place',
    'Remove with no values'
  );
  window.assert.equal(
    QueryStringMachine.removeKeyValuePair('?place&time', 'times'),
    '?place&time',
    'Key to remove not present'
  );
  window.assert.equal(
    QueryStringMachine.removeKeyValuePair(
      '?sim=ohms-law&phetioValidation&phetioDebug=true',
      'fuzz'
    ),
    '?sim=ohms-law&phetioValidation&phetioDebug=true',
    'Key to remove not present'
  );
  window.assert.equal(
    QueryStringMachine.removeKeyValuePair('', 'fuzz'),
    '',
    'No search present'
  );

  if (window.assert) {
    window.assert.throws(
      () => QueryStringMachine.removeKeyValuePair('time=now', 'time'),
      'Not removed if there is no question mark'
    );
  }
});

QUnit.test('appendQueryString', (assert) => {
  const test = function (url, queryParameters, expected) {
    window.assert.equal(
      QueryStringMachine.appendQueryString(url, queryParameters),
      expected,
      `${url} + ${queryParameters} should be ok`
    );
  };

  test(
    'http://localhost.com/hello.html',
    '',
    'http://localhost.com/hello.html'
  );
  test(
    'http://localhost.com/hello.html?hi',
    '',
    'http://localhost.com/hello.html?hi'
  );
  test(
    'http://localhost.com/hello.html',
    '?test',
    'http://localhost.com/hello.html?test'
  );
  test(
    'http://localhost.com/hello.html',
    '&test',
    'http://localhost.com/hello.html?test'
  );
  test(
    'http://localhost.com/hello.html?abc',
    '',
    'http://localhost.com/hello.html?abc'
  );
  test(
    'http://localhost.com/hello.html?abc',
    '?123',
    'http://localhost.com/hello.html?abc&123'
  );
  test(
    'http://localhost.com/hello.html?abc',
    '&123',
    'http://localhost.com/hello.html?abc&123'
  );
});

QUnit.test('getSingleQueryParameterString', (assert) => {
  const test = function (url, key, expected) {
    window.assert.equal(
      QueryStringMachine.getSingleQueryParameterString(key, url),
      expected,
      `${url} + ${key} should be equal`
    );
  };

  test('http://phet.colorado.com/hello.html?test', 'test', 'test');
  test('http://phet.colorado.com/hello.html?test=hi', 'test', 'test=hi');
  test('http://phet.colorado.com/hello.html?hi&test=hi', 'test', 'test=hi');
  test('?hi&test=hi,4,3,%203', 'test', 'test=hi,4,3,%203');

  const parameterKey = encodeURIComponent('jf4238597043*$(%$*()#%&*#(^_(&');
  const parameterEntire = `${parameterKey}=7`;

  test(
    `http://something.edu/hello.html?${parameterEntire}`,
    decodeURIComponent(parameterKey),
    parameterEntire
  );
});
QUnit.test('public query parameters should be graceful', (assert) => {
  // clear any warnings from before this test
  QueryStringMachine.warnings.length = 0;

  const screensSchema = {
    type: 'array',
    elementSchema: {
      type: 'number',
      isValidValue: Number.isInteger
    },
    defaultValue: null,
    isValidValue: function (value) {
      // screen indices cannot be duplicated
      return value === null || value.length === _.uniq(value).length;
    },
    public: true
  };

  let screens = QueryStringMachine.getForString(
    'screens',
    screensSchema,
    '?screens=1'
  );
  window.assert.ok(screens.length === 1);
  window.assert.ok(screens[0] === 1);

  screens = QueryStringMachine.getForString(
    'screens',
    screensSchema,
    '?screens=1.1'
  );
  window.assert.ok(QueryStringMachine.warnings.length === 1);
  window.assert.ok(screens === null, 'should have the default value');
  screens = QueryStringMachine.getForString(
    'screens',
    screensSchema,
    '?screens=54890,fd'
  );
  window.assert.ok(QueryStringMachine.warnings.length === 2);
  window.assert.ok(screens === null, 'should have the default value');

  screens = QueryStringMachine.getForString(
    'screens',
    screensSchema,
    '?screens=1,1,1'
  );
  window.assert.ok(QueryStringMachine.warnings.length === 3);
  window.assert.ok(screens === null, 'should have the default value');

  // should use the fallback
  screens = QueryStringMachine.getForString(
    'screens',
    screensSchema,
    '?screens=Hello1,1,Goose1'
  );
  window.assert.ok(screens === null, 'should have the default value');

  QueryStringMachine.warnings.length = 0;

  const otherScreensSchema = {
    type: 'array',
    elementSchema: {
      type: 'string',
      validValues: ['first', 'notFirst']
    },
    defaultValue: null,
    isValidValue: function (value) {
      // screen indices cannot be duplicated
      return value === null || value.length === _.uniq(value).length;
    },
    public: true
  };
  screens = QueryStringMachine.getForString(
    'screens',
    otherScreensSchema,
    '?screens=first'
  );
  window.assert.ok(screens.length === 1);
  window.assert.ok(screens[0] === 'first');

  screens = QueryStringMachine.getForString(
    'screens',
    otherScreensSchema,
    '?screens=first,notFirst'
  );
  window.assert.ok(screens.length === 2);
  window.assert.ok(screens[0] === 'first');
  window.assert.ok(screens[1] === 'notFirst');

  screens = QueryStringMachine.getForString(
    'screens',
    otherScreensSchema,
    '?screens=firsfdt,notFisrst'
  );
  window.assert.ok(QueryStringMachine.warnings.length === 1);
  window.assert.ok(screens === null);

  screens = QueryStringMachine.getForString(
    'screens',
    otherScreensSchema,
    '?screens=firsfdt,1'
  );
  window.assert.ok(QueryStringMachine.warnings.length === 2);
  window.assert.ok(screens === null);

  QueryStringMachine.warnings.length = 0;

  const flagSchema = {
    type: 'flag',
    public: true
  };

  let flag = QueryStringMachine.getForString('flag', flagSchema, '?flag=true');
  window.assert.ok(flag === true);
  window.assert.ok(QueryStringMachine.warnings.length === 1);

  flag = QueryStringMachine.getForString('flag', flagSchema, '?flag=');
  window.assert.ok(flag === true);
  window.assert.ok(QueryStringMachine.warnings.length === 1);

  flag = QueryStringMachine.getForString('flag', flagSchema, '?hello');
  window.assert.ok(flag === false);
  window.assert.ok(QueryStringMachine.warnings.length === 1);

  QueryStringMachine.warnings.length = 0;
});
