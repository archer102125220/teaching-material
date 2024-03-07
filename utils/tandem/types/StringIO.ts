// Copyright 2018-2024, University of Colorado Boulder

/**
 * PhET-iO Type for JS's built-in string type.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import tandemNamespace from '../tandemNamespace';
import IOType from './IOType';
import StateSchema from './StateSchema';
import ValueIO from './ValueIO';

const StringIO = new IOType<string, string>( 'StringIO', {
  supertype: ValueIO,
  valueType: 'string',
  documentation: 'PhET-iO Type for Javascript\'s string primitive type',
  stateSchema: StateSchema.asValue<string, string>( 'string', { valueType: 'string' } ),
  toStateObject: _.identity
} );

tandemNamespace.register( 'StringIO', StringIO );
export default StringIO;