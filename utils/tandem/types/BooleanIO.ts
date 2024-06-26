// Copyright 2018-2024, University of Colorado Boulder

/**
 * PhET-iO Type for JS's built-in boolean type.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import _ from 'lodash';

import tandemNamespace from '@/utils/tandem/tandemNamespace';
import IOType from '@/utils/tandem/types/IOType';
import StateSchema from '@/utils/tandem/types/StateSchema';
import ValueIO from '@/utils/tandem/types/ValueIO';

const BooleanIO = new IOType<boolean, boolean>( 'BooleanIO', {
  supertype: ValueIO,
  valueType: 'boolean',
  documentation: 'PhET-iO Type for Javascript\'s boolean primitive type',
  stateSchema: StateSchema.asValue<boolean, boolean>( 'boolean', { valueType: 'boolean' } ),
  toStateObject: _.identity
} );

tandemNamespace.register( 'BooleanIO', BooleanIO );
export default BooleanIO;