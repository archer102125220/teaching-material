// Copyright 2016-2022, University of Colorado Boulder

/**
 * StringProperty is a Property whose value is a string.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import StringIO from '@/utils/tandem/types/StringIO';
import axon from '@/utils/axon/axon';
import Property, { type PropertyOptions } from '@/utils/axon/Property';

type SelfOptions = EmptySelfOptions;

export type StringPropertyOptions = SelfOptions & StrictOmit<PropertyOptions<string>, 'valueType' | 'phetioValueType'>;

export default class StringProperty extends Property<string> {

  public constructor(value: string, providedOptions?: StringPropertyOptions) {

    // client cannot specify superclass options that are controlled by StringProperty
    if (providedOptions) {
      // eslint-disable-next-line no-prototype-builtins
      window.assert && window.assert(!providedOptions.hasOwnProperty('valueType'), 'StringProperty sets valueType');
      // eslint-disable-next-line no-prototype-builtins
      window.assert && window.assert(!providedOptions.hasOwnProperty('phetioType'), 'StringProperty sets phetioType');
    }

    // Fill in superclass options that are controlled by StringProperty.
    const options = optionize<StringPropertyOptions, SelfOptions, PropertyOptions<string>>()({
      valueType: 'string',
      phetioValueType: StringIO
    }, providedOptions);

    super(value, options);
  }
}

axon.register('StringProperty', StringProperty);