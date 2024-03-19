// Copyright 2021-2024, University of Colorado Boulder

import _ from 'lodash';

import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';
import tandemNamespace from '@/utils/tandem/tandemNamespace';
import IOType from '@/utils/tandem/types/IOType';
import StateSchema from '@/utils/tandem/types/StateSchema';
import ValueIO from '@/utils/tandem/types/ValueIO';

type ObjectIOState = Record<string, IntentionalAny>;
const noExtraPrototype = (object: object) => Object.getPrototypeOf(object) === Object.prototype;
/**
 * IOType intended for usage with object literals, primarily for toStateObject/fromStateObject.
 * @author Sam Reid (PhET Interactive Simulations)
 */
const ObjectLiteralIO = new IOType<object, ObjectIOState>('ObjectLiteralIO', {
  documentation: 'PhET-iO Type for object literals',
  isValidValue: noExtraPrototype,
  supertype: ValueIO,
  stateSchema: StateSchema.asValue<ObjectIOState, ObjectIOState>('object', { valueType: Object, isValidValue: noExtraPrototype }),
  toStateObject: _.identity
});

tandemNamespace.register('ObjectLiteralIO', ObjectLiteralIO);
export default ObjectLiteralIO;