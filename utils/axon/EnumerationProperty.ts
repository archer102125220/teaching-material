// Copyright 2021-2022, University of Colorado Boulder

/**
 * Property support for rich enumeration types.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property, { type PropertyOptions } from './Property';
import EnumerationIO from '../tandem/types/EnumerationIO';
import EnumerationValue from '../phet-core/EnumerationValue';
import optionize, { type EmptySelfOptions } from '../phet-core/optionize';
import Enumeration from '../phet-core/Enumeration';
import type StrictOmit from '../phet-core/types/StrictOmit';
import axon from './axon';

type SelfOptions<T extends EnumerationValue> = {

  // By default, this will be taken from the initial value, but if subtyping enumerations, you must provide this
  // manually to make sure it is set to the correct, subtype value, see https://github.com/phetsims/phet-core/issues/102
  enumeration?: Enumeration<T>;
};

export type EnumerationPropertyOptions<T extends EnumerationValue> = SelfOptions<T> & StrictOmit<PropertyOptions<T>, 'phetioValueType'>;

export default class EnumerationProperty<T extends EnumerationValue> extends Property<T> {

  public constructor(value: T, providedOptions?: EnumerationPropertyOptions<T>) {

    const firstOptions = optionize<EnumerationPropertyOptions<T>, SelfOptions<T>, PropertyOptions<T>>()({
      enumeration: value.enumeration
    }, providedOptions);

    const options = optionize<EnumerationPropertyOptions<T>, EmptySelfOptions, PropertyOptions<T>>()({
      validValues: firstOptions.enumeration.values,
      phetioValueType: EnumerationIO<T>({
        enumeration: firstOptions.enumeration
      })
    }, firstOptions);

    super(value, options);
  }
}

axon.register('EnumerationProperty', EnumerationProperty);
