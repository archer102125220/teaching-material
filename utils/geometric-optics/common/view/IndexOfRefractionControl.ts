// Copyright 2021-2023, University of Colorado Boulder

/**
 * IndexOfRefractionControl is the control for changing the lens' index of refraction (IOR).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberControl, { type NumberControlOptions } from '@/utils/scenery-phet/NumberControl';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import Utils from '@/utils/dot/Utils';
import NumberProperty from '@/utils/axon/NumberProperty';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import optionize, { combineOptions, type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';

type SelfOptions = EmptySelfOptions;

type IndexOfRefractionControlOptions = SelfOptions & PickRequired<NumberControlOptions, 'tandem'>;

export default class IndexOfRefractionControl extends NumberControl {

  public constructor(indexOfRefractionProperty: NumberProperty, providedOptions: IndexOfRefractionControlOptions) {

    const range = indexOfRefractionProperty.range;

    // Assemble the defaults for NumberControl, because optionize doesn't support defaults in multiple objects.
    const numberControlDefaults = combineOptions<StrictOmit<NumberControlOptions, 'tandem'>>({}, GOConstants.NUMBER_CONTROL_OPTIONS, {
      delta: GOConstants.INDEX_OF_REFRACTION_SPINNER_STEP,
      sliderOptions: {
        constrainValue: (value: number) =>
          Utils.roundToInterval(value, GOConstants.INDEX_OF_REFRACTION_SLIDER_STEP),
        keyboardStep: GOConstants.INDEX_OF_REFRACTION_KEYBOARD_STEP, // used by all alternative-input devices
        shiftKeyboardStep: GOConstants.INDEX_OF_REFRACTION_SHIFT_KEYBOARD_STEP, // finer grain, used by keyboard only
        pageKeyboardStep: GOConstants.INDEX_OF_REFRACTION_PAGE_KEYBOARD_STEP
      },
      numberDisplayOptions: {
        decimalPlaces: GOConstants.INDEX_OF_REFRACTION_DECIMAL_PLACES
      }
    });

    // Now add providedOptions to the defaults.
    const options = optionize<IndexOfRefractionControlOptions, SelfOptions, NumberControlOptions>()(
      numberControlDefaults, providedOptions);

    super(GeometricOpticsStrings.indexOfRefractionStringProperty, indexOfRefractionProperty, range, options);

    this.addLinkedElement(indexOfRefractionProperty);
  }
}

geometricOptics.register('IndexOfRefractionControl', IndexOfRefractionControl);