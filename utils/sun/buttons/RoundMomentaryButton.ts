// Copyright 2015-2022, University of Colorado Boulder

/**
 * RoundMomentaryButton is a round momentary button that toggles a Property between 2 values.
 * The 'off value' is the value when the button is not pressed.
 * The 'on value' is the value when the button is pressed.
 *
 * TODO: Not supported with alternative input, see https://github.com/phetsims/scenery/issues/1117
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type TProperty from '@/utils/axon/TProperty.js';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize.js';
import Tandem from '@/utils/tandem/Tandem.js';
import sun from '@/utils/sun/sun.js';
import MomentaryButtonInteractionStateProperty from '@/utils/sun/buttons/MomentaryButtonInteractionStateProperty.js';
import MomentaryButtonModel from '@/utils/sun/buttons/MomentaryButtonModel.js';
import RoundButton, { type RoundButtonOptions } from '@/utils/sun/buttons/RoundButton.js';

type SelfOptions = EmptySelfOptions;

export type RoundMomentaryButtonOptions = SelfOptions & RoundButtonOptions;

export default class RoundMomentaryButton<T> extends RoundButton {

  private readonly disposeRoundMomentaryButton: () => void;

  /**
   * @param property
   * @param valueOff - value when the button is in the off state
   * @param valueOn - value when the button is in the on state
   * @param providedOptions?
   */
  public constructor(property: TProperty<T>, valueOff: T, valueOn: T, providedOptions?: RoundMomentaryButtonOptions) {

    const options = optionize<RoundMomentaryButtonOptions, SelfOptions, RoundButtonOptions>()({
      tandem: Tandem.REQUIRED,
      tandemNameSuffix: 'Button'
    }, providedOptions);

    // Note it shares a tandem with this, so the emitter will be instrumented as a child of the button
    const buttonModel = new MomentaryButtonModel(valueOff, valueOn, property, options);

    super(buttonModel, new MomentaryButtonInteractionStateProperty(buttonModel), options);

    this.disposeRoundMomentaryButton = () => {
      buttonModel.dispose();
    };
  }

  public override dispose(): void {
    this.disposeRoundMomentaryButton();
    super.dispose();
  }
}

sun.register('RoundMomentaryButton', RoundMomentaryButton);