// Copyright 2021-2023, University of Colorado Boulder

/**
 * Generalized support for mutating objects that take ES5 getters/setters, similar to Node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import _ from 'lodash';

import phetCore from '@/utils/phet-core/phetCore';

/**
 * For example:
 *
 * mutate( something, [ 'left', 'right', 'top', 'bottom' ], { top: 0, left: 5 } );
 *
 * will be equivalent to:
 *
 * something.left = 5;
 * something.top = 0;
 *
 * First param will be mutated
 */
function mutate(target: object, orderedKeys: string[], options?: object): void {
  window.assert && window.assert(target);
  window.assert && window.assert(Array.isArray(orderedKeys));

  if (!options) {
    return;
  }

  window.assert && window.assert(Object.getPrototypeOf(options) === Object.prototype,
    'Extra prototype on options object is a code smell');

  _.each(orderedKeys, key => {

    // See https://github.com/phetsims/scenery/issues/580 for more about passing undefined.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.assert && window.assert(!options.hasOwnProperty(key) || options[key] !== undefined,
      `Undefined not allowed for key: ${key}`);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (options[key] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      target[key] = options[key]!;
    }
  });
}

phetCore.register('mutate', mutate);
export default mutate;