// Copyright 2021-2022, University of Colorado Boulder

/**
 * Button for starting/stopping some behavior. Unlike the PlayPauseButton, this indicates that play will re-start
 * from the beginning after switch from play to stop.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '@/utils/axon/Property';
import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import { Path } from '@/utils/scenery/imports';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import SceneryPhetConstants from '@/utils/scenery-phet/SceneryPhetConstants';
import SceneryPhetStrings from '@/utils/scenery-phet/SceneryPhetStrings';
import StopIconShape from '@/utils/scenery-phet/StopIconShape';
import PlayControlButton, { type PlayControlButtonOptions } from '@/utils/scenery-phet/buttons/PlayControlButton';

type SelfOptions = EmptySelfOptions;

export type PlayStopButtonOptions = SelfOptions & PlayControlButtonOptions;

export default class PlayStopButton extends PlayControlButton {

  public constructor(isPlayingProperty: Property<boolean>, providedOptions?: PlayStopButtonOptions) {

    const options = optionize<PlayStopButtonOptions, SelfOptions, PlayControlButtonOptions>()({

      // PlayStopButtonOptions
      radius: SceneryPhetConstants.PLAY_CONTROL_BUTTON_RADIUS,
      endPlayingLabel: SceneryPhetStrings.a11y.playControlButton.stopStringProperty
    }, providedOptions);

    // icon is sized relative to radius
    const stopWidth = options.radius * 0.75;
    const stopPath = new Path(new StopIconShape(stopWidth), { fill: 'black' });

    super(isPlayingProperty, stopPath, options);

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    window.assert && window.phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery-phet', 'PlayStopButton', this);
  }
}

sceneryPhet.register('PlayStopButton', PlayStopButton);