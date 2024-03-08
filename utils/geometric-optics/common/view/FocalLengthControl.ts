// Copyright 2022-2023, University of Colorado Boulder

/**
 * FocalLengthControl is the control for changing the optic's focal length. It actually changes the focal-length
 * magnitude, and indicates the sign by an annotation in the control's label, e.g. 'Focal Length (-)'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberControl, { type NumberControlOptions } from '../../../scenery-phet/NumberControl';
import geometricOptics from '../../geometricOptics';
import GeometricOpticsStrings from '../../GeometricOpticsStrings';
import GOConstants from '../GOConstants';
import Utils from '../../../dot/Utils';
import NumberProperty from '../../../axon/NumberProperty';
import type TReadOnlyProperty from '../../../axon/TReadOnlyProperty';
import type PickRequired from '../../../phet-core/types/PickRequired';
import { type EmptySelfOptions, optionize4 } from '../../../phet-core/optionize';
import DerivedStringProperty from '../../../axon/DerivedStringProperty';

type SelfOptions = EmptySelfOptions;

type FocalLengthControlOptions = SelfOptions & PickRequired<NumberControlOptions, 'tandem'>;

export default class FocalLengthControl extends NumberControl {

  /**
   * @param focalLengthMagnitudeProperty - unsigned
   * @param focalLengthProperty - signed
   * @param providedOptions
   */
  public constructor(focalLengthMagnitudeProperty: NumberProperty,
    focalLengthProperty: TReadOnlyProperty<number>,
    providedOptions: FocalLengthControlOptions) {

    const range = focalLengthMagnitudeProperty.range;

    const titleStringProperty = new DerivedStringProperty([
      focalLengthProperty,
      GeometricOpticsStrings.focalLengthPositiveStringProperty,
      GeometricOpticsStrings.focalLengthNegativeStringProperty
    ], (focalLength: number, focalLengthPositiveString: string, focalLengthNegativeString: string) =>
      (focalLength >= 0) ? focalLengthPositiveString : focalLengthNegativeString, {
      tandem: providedOptions.tandem.createTandem('titleStringProperty')
    });

    const options = optionize4<FocalLengthControlOptions, SelfOptions, NumberControlOptions>()(
      {}, GOConstants.NUMBER_CONTROL_OPTIONS, {

      // NumberControlOptions
      delta: GOConstants.FOCAL_LENGTH_SPINNER_STEP,
      numberDisplayOptions: {
        decimalPlaces: GOConstants.FOCAL_LENGTH_DECIMAL_PLACES,
        valuePattern: GeometricOpticsStrings.valueCentimetersPatternStringProperty
      },
      sliderOptions: {
        constrainValue: (value: number) => Utils.roundToInterval(value, GOConstants.FOCAL_LENGTH_SLIDER_STEP),
        keyboardStep: GOConstants.FOCAL_LENGTH_KEYBOARD_STEP, // used by all alternative-input devices
        shiftKeyboardStep: GOConstants.FOCAL_LENGTH_SHIFT_KEYBOARD_STEP, // finer grain, used by keyboard only
        pageKeyboardStep: GOConstants.FOCAL_LENGTH_PAGE_KEYBOARD_STEP
      },
      isDisposable: false
    }, providedOptions);

    super(titleStringProperty, focalLengthMagnitudeProperty, range, options);

    this.addLinkedElement(focalLengthMagnitudeProperty);
  }
}

geometricOptics.register('FocalLengthControl', FocalLengthControl);