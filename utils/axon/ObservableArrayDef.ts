// Copyright 2020-2023, University of Colorado Boulder

/**
 * This is a type definition for values returned by createObservableArray.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import axon from '@/utils/axon/axon';
import { type ObservableArray } from '@/utils/axon/createObservableArray';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';

/**
 * @typedef {Array} ObservableArrayDef
 * @property {Emitter} elementAddedEmitter
 * @property {Emitter} elementRemovedEmitter
 * @property {Property.<Number>} lengthProperty
 * See createObservableArray for details
 */
const ObservableArrayDef = {

  /**
   * Returns true if the argument has the properties that an ObservableArrayDef should have.
   */
  isObservableArray(observableArray: ObservableArray<IntentionalAny>): boolean {
    return !!(Array.isArray(observableArray) && observableArray.elementAddedEmitter && observableArray.elementRemovedEmitter && observableArray.lengthProperty);
  }
};

axon.register('ObservableArrayDef', ObservableArrayDef);
export default ObservableArrayDef;