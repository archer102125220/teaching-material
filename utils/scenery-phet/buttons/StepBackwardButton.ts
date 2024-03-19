// Copyright 2014-2022, University of Colorado Boulder

/**
 * Step backward button.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import stepBackwardSoundPlayer from '@/utils/tambo/shared-sound-players/stepBackwardSoundPlayer';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import StepButton, { type StepButtonOptions } from '@/utils/scenery-phet/buttons/StepButton';

type SelfOptions = EmptySelfOptions;

export type StepBackwardButtonOptions = SelfOptions & StrictOmit<StepButtonOptions, 'direction'>;

export default class StepBackwardButton extends StepButton {

  public constructor(providedOptions?: StepBackwardButtonOptions) {

    const options = optionize<StepBackwardButtonOptions, SelfOptions, StepButtonOptions>()({

      // StepButtonOptions
      direction: 'backward',
      soundPlayer: stepBackwardSoundPlayer
    }, providedOptions);

    super(options);
  }
}

sceneryPhet.register('StepBackwardButton', StepBackwardButton);