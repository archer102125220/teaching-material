// Copyright 2015-2024, University of Colorado Boulder

/**
 * RectangularMomentaryButton is a rectangular momentary button that toggles a Property between 2 values.
 * The 'off value' is the value when the button is not pressed.
 * The 'on value' is the value when the button is pressed.
 *
 * TODO: Not supported with alternative input, see https://github.com/phetsims/scenery/issues/1117
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type TProperty from '@/utils/axon/TProperty.js';
import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry.js';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize.js';
import Tandem from '@/utils/tandem/Tandem.js';
import sun from '@/utils/sun/sun.js';
import MomentaryButtonInteractionStateProperty from '@/utils/sun/buttons/MomentaryButtonInteractionStateProperty.js';
import MomentaryButtonModel from '@/utils/sun/buttons/MomentaryButtonModel.js';
import RectangularButton, { type RectangularButtonOptions } from '@/utils/sun/buttons/RectangularButton.js';

type SelfOptions = EmptySelfOptions;

export type RectangularMomentaryButtonOptions = SelfOptions & RectangularButtonOptions;

export default class RectangularMomentaryButton<T> extends RectangularButton {

  private readonly disposeRectangularMomentaryButton: () => void;

  /**
   * @param property
   * @param valueOff - value when the button is in the off state
   * @param valueOn - value when the button is in the on state
   * @param [providedOptions?]
   */
  public constructor(property: TProperty<T>, valueOff: T, valueOn: T, providedOptions?: RectangularMomentaryButtonOptions) {

    const options = optionize<RectangularMomentaryButtonOptions, SelfOptions, RectangularButtonOptions>()({
      tandem: Tandem.REQUIRED,
      tandemNameSuffix: 'Button'
    }, providedOptions);

    // Note it shares a tandem with this, so the emitter will be instrumented as a child of the button
    const buttonModel = new MomentaryButtonModel(valueOff, valueOn, property, options);

    super(buttonModel, new MomentaryButtonInteractionStateProperty(buttonModel), options);

    this.disposeRectangularMomentaryButton = () => {
      buttonModel.dispose();
    };

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    window.assert && window.phet?.chipper?.queryParameters?.binder && InstanceRegistry.registerDataURL('sun', 'RectangularMomentaryButton', this);
  }

  public override dispose(): void {
    this.disposeRectangularMomentaryButton();
    super.dispose();
  }
}

sun.register('RectangularMomentaryButton', RectangularMomentaryButton);