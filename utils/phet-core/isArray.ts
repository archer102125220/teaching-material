// Copyright 2013-2022, University of Colorado Boulder

/**
 * Tests whether a reference is to an array.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from '@/utils/phet-core/phetCore';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';

function isArray(array: IntentionalAny): array is IntentionalAny[] {
  // yes, this is actually how to do this. see http://stackoverflow.com/questions/4775722/javascript-check-if-object-is-array
  return Object.prototype.toString.call(array) === '[object Array]';
}

phetCore.register('isArray', isArray);

export default isArray;