// Copyright 2020-2023, University of Colorado Boulder

/**
 * Throws an assertion error if specified object doesn't have all provided properties. This will also work for anything
 * defined on class prototypes (like Node.prototype.setOpacity)
 *
 * @example
 * assertHasProperties( { tree:1, flower:2 }, [ 'tree' ] ) => no error
 * assertHasProperties( { flower:2 }, [ 'tree' ] ) => error
 * assertHasProperties( { tree:1, flower:2 }, [ 'tree', 'flower' ] ) => no error
 * assertHasProperties( { tree:1 }, [ 'tree', 'flower' ] ) => error
 * assertHasProperties( new window.phet.scenery.Node(), [ 'getOpacity','opacity', '_opacity' ] ) => no error
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import _ from 'lodash';

import inheritance from '@/utils/phet-core/inheritance';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';
import phetCore from '@/utils/phet-core/phetCore';

const assertHasProperties = (object: IntentionalAny, properties: string[]): void => {
  if (window.assert && object) {


    properties.forEach(property => {

      window.assert && window.assert(Object.getOwnPropertyDescriptor(object, property) || // support fields directly on the object

        // test up the class hierarchy for if the property is defined on a prototype.
        _.some(inheritance(object.constructor).map(type => Object.getOwnPropertyDescriptor(type.prototype, property))),
        `property not defined: ${property}`);
    });
  }
};

phetCore.register('assertHasProperties', assertHasProperties);
export default assertHasProperties;