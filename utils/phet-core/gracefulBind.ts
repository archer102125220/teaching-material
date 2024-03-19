// Copyright 2021-2023, University of Colorado Boulder

/**
 * Support gracefully binding a global function to itself. Returns null if the global doesn't exist.
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import _ from 'lodash';

import phetCore from '@/utils/phet-core/phetCore';

/**
 * If the path exists on the window global, return it as a bound function, otherwise returns null
 * @param path a path to a method, dot-separated, including the method, such as 'phet.joist.sim.showPopup'
 */
const gracefulBind = (path: string): null | VoidFunction => {
  window.assert && window.assert(path.split('.').length > 1, 'path must have multiple parts');
  window.assert && window.assert(path.trim() === path, 'path must be trimmed');
  const terms = path.split('.');
  const method = terms.pop()!; // mutates terms to become the method container
  const object = _.get(window, terms);
  return object ? object[method].bind(object) : null;
};

phetCore.register('gracefulBind', gracefulBind);

export default gracefulBind;