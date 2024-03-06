// Copyright 2021-2024, University of Colorado Boulder

import tandemNamespace from '../tandemNamespace';
import IOType from './IOType';
import StateSchema from './StateSchema';
// @ts-expect-error
import IntentionalAny from '../../phet-core/types/IntentionalAny';

/**
 * IOType that uses value semantics for toStateObject/fromStateObject
 * @author Sam Reid (PhET Interactive Simulations)
 */
const ValueIO = new IOType<IntentionalAny, IntentionalAny>( 'ValueIO', {
  isValidValue: _.stubTrue,
  supertype: IOType.ObjectIO,
  toStateObject: coreObject => coreObject,
  fromStateObject: stateObject => stateObject,
  stateSchema: StateSchema.asValue( '*', { isValidValue: _.stubTrue } )
} );

tandemNamespace.register( 'ValueIO', ValueIO );
export default ValueIO;