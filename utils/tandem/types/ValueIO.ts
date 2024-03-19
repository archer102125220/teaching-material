// Copyright 2021-2024, University of Colorado Boulder

import _ from 'lodash';

import tandemNamespace from '@/utils/tandem/tandemNamespace';
import IOType from '@/utils/tandem/types/IOType';
import StateSchema from '@/utils/tandem/types/StateSchema';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';

/**
 * IOType that uses value semantics for toStateObject/fromStateObject
 * @author Sam Reid (PhET Interactive Simulations)
 */
const ValueIO = new IOType<IntentionalAny, IntentionalAny>('ValueIO', {
  isValidValue: _.stubTrue,
  supertype: IOType.ObjectIO,
  toStateObject: coreObject => coreObject,
  fromStateObject: stateObject => stateObject,
  stateSchema: StateSchema.asValue('*', { isValidValue: _.stubTrue })
});

tandemNamespace.register('ValueIO', ValueIO);
export default ValueIO;