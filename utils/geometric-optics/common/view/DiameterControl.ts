// Copyright 2021-2023, University of Colorado Boulder

/**
 * DiameterControl is the control for changing the optic's diameter.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberControl, { type NumberControlOptions } from '../../../scenery-phet/NumberControl';
import geometricOptics from '../../geometricOptics';
import GeometricOpticsStrings from '../../GeometricOpticsStrings';
import GOConstants from '../GOConstants';
import Utils from '../../../dot/Utils';
import NumberProperty from '../../../axon/NumberProperty';
import type PickRequired from '../../../phet-core/types/PickRequired';
import { type EmptySelfOptions, optionize4 } from '../../../phet-core/optionize';

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