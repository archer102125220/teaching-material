// Copyright 2020-2022, University of Colorado Boulder

import Property, { type PropertyOptions } from '@/utils/axon/Property';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import { Color, scenery } from '@/utils/scenery/imports';

/**
 * Convenience type for creating Property.<Color>
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
export default class ColorProperty extends Property<Color> {
  public constructor(color: Color, providedOptions?: PropertyOptions<Color>) {

    // client cannot specify superclass options that are controlled by this type
    if (providedOptions) {
      window.assert && window.assert(!providedOptions.hasOwnProperty('valueType'), 'ColorProperty sets valueType');
      window.assert && window.assert(!providedOptions.hasOwnProperty('phetioType'), 'ColorProperty sets phetioType');
    }

    const options = optionize<PropertyOptions<Color>, EmptySelfOptions, PropertyOptions<Color>>()({
      valueType: Color,
      phetioValueType: Color.ColorIO
    }, providedOptions);
    super(color, options);
  }
}

scenery.register('ColorProperty', ColorProperty);
