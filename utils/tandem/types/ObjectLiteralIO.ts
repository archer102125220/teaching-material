// Copyright 2021-2024, University of Colorado Boulder

import _ from 'lodash';

// @ts-expect-error
import IntentionalAny from '../../phet-core/types/IntentionalAny';
import tandemNamespace from '../tandemNamespace';
import IOType from './IOType';
import StateSchema from './StateSchema';
import ValueIO from './ValueIO';

type ObjectIOState = Record<string, IntentionalAny>;
const noExtraPrototype = ( object: object ) => Object.getPrototypeOf( object ) === Object.prototype;
/**
 * IOType intended for usage with object literals, primarily for toStateObject/fromStateObject.
 * @author Sam Reid (PhET Interactive Simulations)
 */
const ObjectLiteralIO = new IOType<object, ObjectIOState>( 'ObjectLiteralIO', {
  documentation: 'PhET-iO Type for object literals',
  isValidValue: noExtraPrototype,
  supertype: ValueIO,
  stateSchema: StateSchema.asValue<ObjectIOState, ObjectIOState>( 'object', { valueType: Object, isValidValue: noExtraPrototype } ),
  toStateObject: _.identity
} );

tandemNamespace.register( 'ObjectLiteralIO', ObjectLiteralIO );
export default ObjectLiteralIO;