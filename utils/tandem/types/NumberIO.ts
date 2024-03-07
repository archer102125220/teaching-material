// Copyright 2018-2024, University of Colorado Boulder

/**
 * PhET-iO Type for JS's built-in number type.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import _ from 'lodash';

import tandemNamespace from '../tandemNamespace';
import IOType from './IOType';
import StateSchema from './StateSchema';

const NumberIO = new IOType<number, number>( 'NumberIO', {
  valueType: 'number',
  documentation: 'PhET-iO Type for Javascript\'s number primitive type',
  toStateObject: _.identity,
  fromStateObject: stateObject => stateObject,
  stateSchema: StateSchema.asValue<number, number>( 'number', {
    isValidValue: ( value: number ) => ( typeof value === 'number' && !isNaN( value ) && value !== Number.POSITIVE_INFINITY && value !== Number.NEGATIVE_INFINITY )
  } )
} );

tandemNamespace.register( 'NumberIO', NumberIO );
export default NumberIO;