// Copyright 2021-2023, University of Colorado Boulder

/**
 * DiameterControl is the control for changing the optic's diameter.
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
import { type EmptySelfOptions, optionize4 } from '@/utils/phet-core/optionize';

type SelfOptions = EmptySelfOptions;

type DiameterControlOptions = SelfOptions & PickRequired<NumberControlOptions, 'tandem'>;

export default class DiameterControl extends NumberControl {

  public constructor(diameterProperty: NumberProperty, providedOptions: DiameterControlOptions) {

    const range = diameterProperty.range;

    const options = optionize4<DiameterControlOptions, SelfOptions, NumberControlOptions>()(
      {}, GOConstants.NUMBER_CONTROL_OPTIONS, {

      // NumberControlOptions
      delta: GOConstants.DIAMETER_SPINNER_STEP,
      sliderOptions: {
        constrainValue: (value: number) => Utils.roundToInterval(value, GOConstants.DIAMETER_SLIDER_STEP),
        keyboardStep: GOConstants.DIAMETER_KEYBOARD_STEP, // used by all alternative-input devices
        shiftKeyboardStep: GOConstants.DIAMETER_SHIFT_KEYBOARD_STEP, // finer grain, used by keyboard only
        pageKeyboardStep: GOConstants.DIAMETER_PAGE_KEYBOARD_STEP // coarser grain, used by keyboard only
      },
      numberDisplayOptions: {
        decimalPlaces: GOConstants.DIAMETER_DECIMAL_PLACES,
        valuePattern: GeometricOpticsStrings.valueCentimetersPatternStringProperty
      }
    }, providedOptions);

    super(GeometricOpticsStrings.diameterStringProperty, diameterProperty, range, options);

    this.addLinkedElement(diameterProperty);
  }
}

geometricOptics.register('DiameterControl', DiameterControl);