// Copyright 2021-2023, University of Colorado Boulder

/**
 * Support gracefully getting a global object to itself. Returns null if the global doesn't exist.
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import _ from 'lodash';

import phetCore from '@/utils/phet-core/phetCore';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';

/**
 * If the path exists on the window global, return it, otherwise returns null
 * @param path a path to global, such as 'window.phet.joist.sim'
 */
const getGlobal = (path: string): IntentionalAny | null => {
  window.assert && window.assert(path.trim() === path, 'path must be trimmed');
  const global = _.get(window, path);
  return global !== undefined ? global : null;
};

phetCore.register('getGlobal', getGlobal);

export default getGlobal;