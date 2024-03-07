// Copyright 2016-2022, University of Colorado Boulder

/**
 * Property whose value must be true or false. Truthy/falsy values are invalid.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { type EmptySelfOptions } from '../phet-core/optionize';
import type StrictOmit from '../phet-core/types/StrictOmit';
import BooleanIO from '../tandem/types/BooleanIO';
import axon from './axon';
import Property, { type PropertyOptions } from './Property';

type SelfOptions = EmptySelfOptions;

// client cannot specify superclass options that are controlled by BooleanProperty
export type BooleanPropertyOptions = SelfOptions & StrictOmit<PropertyOptions<boolean>, 'isValidValue' | 'valueType' | 'phetioValueType'>;

export default class BooleanProperty extends Property<boolean> {

  public constructor(value: boolean, providedOptions?: BooleanPropertyOptions) {

    // Fill in superclass options that are controlled by BooleanProperty.
    const options = optionize<BooleanPropertyOptions, SelfOptions, PropertyOptions<boolean>>()({
      valueType: 'boolean',
      phetioValueType: BooleanIO
    }, providedOptions);

    super(value, options);
  }

  public toggle(): void {
    this.value = !this.value;
  }
}

axon.register('BooleanProperty', BooleanProperty);