// Copyright 2014-2023, University of Colorado Boulder

/**
 * Removes a single (the first) matching object from an Array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */
import _ from 'lodash';

import phetCore from '@/utils/phet-core/phetCore';

console.log('phet-core/arrayRemove.ts');

function arrayRemove<T>(array: T[], toRemove: T): void {
  window.assert &&
    window.assert(Array.isArray(array), 'arrayRemove takes an Array');

  const index = _.indexOf(array, toRemove);
  window.assert && window.assert(index >= 0, 'item not found in Array');

  array.splice(index, 1);
}

phetCore.register('arrayRemove', arrayRemove);

export default arrayRemove;
