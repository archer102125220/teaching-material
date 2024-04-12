// Copyright 2014-2023, University of Colorado Boulder

/**
 * Creates an array of arrays, which consists of pairs of objects from the input array without duplication.
 *
 * For example, window.phet.phetCore.pairs( [ 'a', 'b', 'c' ] ) will return:
 * [ [ 'a', 'b' ], [ 'a', 'c' ], [ 'b', 'c' ] ]
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import phetCore from '@/utils/phet-core/phetCore';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';

type ArrayOfPairs = Array<readonly [IntentionalAny, IntentionalAny]>;

function pairs(array: IntentionalAny[]): ArrayOfPairs {
  const result: ArrayOfPairs = [];
  const length = array.length;
  if (length > 1) {
    for (let i = 0; i < length - 1; i++) {
      const first = array[i];
      for (let j = i + 1; j < length; j++) {
        result.push([first, array[j]] as const);
      }
    }
  }
  return result;
}

phetCore.register('pairs', pairs);

export default pairs;