// Copyright 2014-2023, University of Colorado Boulder

/**
 * RoundToggleButton is a round toggle button that toggles the value of a Property between 2 values.
 * It has the same look for both values.
 *
 * @author John Blanco (PhET Interactive Simulations)
 * @author Sam Reid (PhET Interactive Simulations)
 */

import Property from '../../axon/Property';
import optionize from '../../phet-core/optionize';
import type TSoundPlayer from '../../tambo/TSoundPlayer';
import toggleOffSoundPlayer from '../../tambo/shared-sound-players/toggleOffSoundPlayer';
import toggleOnSoundPlayer from '../../tambo/shared-sound-players/toggleOnSoundPlayer';
import Tandem from '../../tandem/Tandem';
import sun from '../sun';
import RoundButton, { type RoundButtonOptions } from './RoundButton';
import ToggleButtonInteractionStateProperty from './ToggleButtonInteractionStateProperty';
import ToggleButtonModel from './ToggleButtonModel';

type SelfOptions = {

  // sounds to be played on toggle transitions
  valueOffSoundPlayer?: TSoundPlayer;
  valueOnSoundPlayer?: TSoundPlayer;
};

export type RoundToggleButtonOptions = SelfOptions & RoundButtonOptions;

export default class RoundToggleButton<T> extends RoundButton {

  private readonly disposeRoundToggleButton: () => void;

  /**
   * @param property - axon Property that can be either valueOff or valueOn
   * @param valueOff - value when the button is in the off state
   * @param valueOn - value when the button is in the on state
   * @param providedOptions?
   */
  public constructor(property: Property<T>, valueOff: T, valueOn: T, providedOptions?: RoundToggleButtonOptions) {

    const options = optionize<RoundToggleButtonOptions, SelfOptions, RoundButtonOptions>()({

      // SelfOptions
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

    this.disposeRoundToggleButton = () => {
      this.buttonModel.produceSoundEmitter.removeListener(playSounds);
      toggleButtonModel.dispose();
    };
  }

  public override dispose(): void {
    this.disposeRoundToggleButton();
    super.dispose();
  }
}

sun.register('RoundToggleButton', RoundToggleButton);
