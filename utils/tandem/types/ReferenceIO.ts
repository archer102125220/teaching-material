// Copyright 2019-2024, University of Colorado Boulder

/**
 * ReferenceIO uses reference identity for toStateObject/fromStateObject
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Validation from '../../axon/Validation';
import CouldNotYetDeserializeError from '../CouldNotYetDeserializeError';
import tandemNamespace from '../tandemNamespace';
import IOType from './IOType';
import StringIO from './StringIO';
import { type PhetioID } from '../TandemConstants';
import IOTypeCache from '../IOTypeCache';

// Cache each parameterized ReferenceIO so that it is only created once
const cache = new IOTypeCache();

export type ReferenceIOState = {
  phetioID: PhetioID;
};

const ReferenceIO = (parameterType: IOType): IOType => {
  window.assert && window.assert(parameterType, 'ReferenceIO needs parameterType');

  const cacheKey = parameterType;

  if (!cache.has(cacheKey)) {

    window.assert && window.assert(typeof parameterType.typeName === 'string', 'type name should be a string');
    cache.set(cacheKey, new IOType(`ReferenceIO<${parameterType.typeName}>`, {
      isValidValue: value => Validation.isValueValid(value, parameterType.validator),
      documentation: 'Uses reference identity for serializing and deserializing, and validates based on its parameter PhET-iO Type.',
      parameterTypes: [parameterType],

      /**
       * Return the json that ReferenceIO is wrapping.  This can be overridden by subclasses, or types can use ReferenceIO type
       * directly to use this implementation.
       */
      toStateObject(phetioObject): ReferenceIOState {

        // NOTE: We cannot assert that phetioObject.phetioState === false here because sometimes ReferenceIO is used statically like
        // ReferenceIO( Vector2IO ).toStateObject( myVector );
        return {
          phetioID: phetioObject.tandem.phetioID
        };
      },

      stateSchema: {
        phetioID: StringIO
      },

      /**
       * Decodes the object from a state, used in PhetioStateEngine.setState.  This can be overridden by subclasses, or types can
       * use ReferenceIO type directly to use this implementation.
       * @throws CouldNotYetDeserializeError
       */
      fromStateObject(stateObject: ReferenceIOState) {
        window.assert && window.assert(stateObject && typeof stateObject.phetioID === 'string', 'phetioID should be a string');
        if (phet.phetio.phetioEngine.hasPhetioObject(stateObject.phetioID)) {
          return phet.phetio.phetioEngine.getPhetioElement(stateObject.phetioID);
        }
        else {
          throw new CouldNotYetDeserializeError();
        }
      },

      /**
       * References should be using fromStateObject to get a copy of the PhET-iO Element.
       */
      applyState(coreObject) {
        window.assert && window.assert(false, `ReferenceIO is meant to be used as DataType serialization (see fromStateObject) for phetioID: ${coreObject.tandem.phetioID}`);
      }
    }));
  }

  return cache.get(cacheKey)!;
};

tandemNamespace.register('ReferenceIO', ReferenceIO);
export default ReferenceIO;