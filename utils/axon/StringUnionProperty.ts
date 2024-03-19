// Copyright 2022, University of Colorado Boulder

/**
 * In TypeScript, it is common to use a string literal union as an enumeration.  This type automatically specifies
 * validValues and the phetioType for convenience.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property, { type PropertyOptions } from '@/utils/axon/Property';
import StringUnionIO from '@/utils/tandem/types/StringUnionIO';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import axon from '@/utils/axon/axon';

type StringEnumerationPropertyOptions<T> = StrictOmit<PropertyOptions<T>, 'phetioValueType'> &
  PickRequired<PropertyOptions<T>, 'validValues'>;

export default class StringUnionProperty<T extends string> extends Property<T> {
  public constructor(value: T, providedOptions: StringEnumerationPropertyOptions<T>) {

    const options = optionize<StringEnumerationPropertyOptions<T>, EmptySelfOptions, PropertyOptions<T>>()({
      phetioValueType: StringUnionIO(providedOptions.validValues)
    }, providedOptions);

    super(value, options);
  }
}

axon.register('StringUnionProperty', StringUnionProperty);