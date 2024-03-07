// Copyright 2018-2024, University of Colorado Boulder

/**
 * PhET-iO Type for JS's built-in Array type.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import _ from 'lodash';

import Validation from '../../axon/Validation';
import tandemNamespace from '../tandemNamespace';
import IOType from './IOType';
import StateSchema from './StateSchema';
import IOTypeCache from '../IOTypeCache';

// Cache each parameterized IOType so that it is only created once.
const cache = new IOTypeCache();

/**
 * Parametric IOType constructor.  Given an element type, this function returns an appropriate array IOType.
 * This caching implementation should be kept in sync with the other parametric IOType caching implementations.
 */
const ArrayIO = <ParameterType, ParameterStateType>( parameterType: IOType<ParameterType, ParameterStateType> ): IOType<ParameterType[], ParameterStateType[]> => {
  assert && assert( !!parameterType, 'parameterType should be defined' );
  if ( !cache.has( parameterType ) ) {
    cache.set( parameterType, new IOType<ParameterType[], ParameterStateType[]>( `ArrayIO<${parameterType.typeName}>`, {
      valueType: Array,
      isValidValue: array => {
        return _.every( array, element => Validation.isValueValid( element, parameterType.validator ) );
      },
      parameterTypes: [ parameterType ],
      toStateObject: array => array.map( parameterType.toStateObject ),
      fromStateObject: stateObject => stateObject.map( parameterType.fromStateObject ),
      documentation: 'PhET-iO Type for the built-in JS array type, with the element type specified.',
      stateSchema: StateSchema.asValue( `Array<${parameterType.typeName}>`, {
        isValidValue: array => _.every( array, element => parameterType.isStateObjectValid( element ) )
      } )
    } ) );
  }

  return cache.get( parameterType )!;
};

tandemNamespace.register( 'ArrayIO', ArrayIO );
export default ArrayIO;