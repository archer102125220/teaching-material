// Copyright 2014-2023, University of Colorado Boulder

/**
 * RectangularToggleButton is a rectangular toggle button that toggles the value of a Property between 2 values.
 * It has the same look for both values.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import optionize from '@/utils/phet-core/optionize';
import toggleOffSoundPlayer from '@/utils/tambo/shared-sound-players/toggleOffSoundPlayer';
import toggleOnSoundPlayer from '@/utils/tambo/shared-sound-players/toggleOnSoundPlayer';
import type TSoundPlayer from '@/utils/tambo/TSoundPlayer';
import Tandem from '@/utils/tandem/Tandem';
import sun from '@/utils/sun/sun';
import RectangularButton, { type RectangularButtonOptions } from '@/utils/sun/buttons/RectangularButton';
import ToggleButtonInteractionStateProperty from '@/utils/sun/buttons/ToggleButtonInteractionStateProperty';
import ToggleButtonModel from '@/utils/sun/buttons/ToggleButtonModel';
import Property from '@/utils/axon/Property';

type SelfOptions = {

  // sounds to be played on toggle transitions
  valueOffSoundPlayer?: TSoundPlayer;
  valueOnSoundPlayer?: TSoundPlayer;
};

export type RectangularToggleButtonOptions = SelfOptions & RectangularButtonOptions;

export default class RectangularToggleButton<T> extends RectangularButton {

  private readonly disposeRectangularToggleButton: () => void;

  /**
   * @param property - axon Property that can be either valueOff or valueOn
   * @param valueOff - value when the button is in the off state
   * @param valueOn - value when the button is in the on state
   * @param providedOptions?
   */
  public constructor(property: Property<T>, valueOff: T, valueOn: T, providedOptions?: RectangularButtonOptions) {

    const options = optionize<RectangularToggleButtonOptions, SelfOptions, RectangularButtonOptions>()({

      // {TSoundPlayer} - sounds to be played on toggle transitions
      valueOffSoundPlayer: toggleOffSoundPlayer,
      valueOnSoundPlayer: toggleOnSoundPlayer,

      // phet-io support
      tandem: Tandem.REQUIRED,
      phetioFeatured: true,
      tandemNameSuffix: 'Button'
    }, providedOptions);

    // Note it shares a tandem with this, so the emitter will be instrumented as a child of the button
    const toggleButtonModel = new ToggleButtonModel(valueOff, valueOn, property, options);
    const toggleButtonInteractionStateProperty = new ToggleButtonInteractionStateProperty(toggleButtonModel);

    super(toggleButtonModel, toggleButtonInteractionStateProperty, options);

    this.addLinkedElement(property, {
      tandemName: 'property'
    });

    // sound generation
    const playSounds = () => {
      if (property.value === valueOff) {
        options.valueOffSoundPlayer.play();
      }
      else if (property.value === valueOn) {
        options.valueOnSoundPlayer.play();
      }
    };
    this.buttonModel.produceSoundEmitter.addListener(playSounds);

    this.disposeRectangularToggleButton = () => {
      this.buttonModel.produceSoundEmitter.removeListener(playSounds);
      toggleButtonModel.dispose();
    };
  }

  public override dispose(): void {
    this.disposeRectangularToggleButton();
    super.dispose();
  }
}

sun.register('RectangularToggleButton', RectangularToggleButton);
