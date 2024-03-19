// Copyright 2016-2022, University of Colorado Boulder

/**
 * Step forward button.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import StepButton, { type StepButtonOptions } from '@/utils/scenery-phet/buttons/StepButton';

type SelfOptions = EmptySelfOptions;

export type StepForwardButtonOptions = SelfOptions & StrictOmit<StepButtonOptions, 'direction'>;

export default class StepForwardButton extends StepButton {

  public constructor(providedOptions?: StepForwardButtonOptions) {

    const options = optionize<StepForwardButtonOptions, SelfOptions, StepButtonOptions>()({

      // StepButtonOptions
      direction: 'forward'
    }, providedOptions);

    super(options);
  }
}

sceneryPhet.register('StepForwardButton', StepForwardButton);