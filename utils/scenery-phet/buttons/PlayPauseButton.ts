// Copyright 2014-2022, University of Colorado Boulder

/**
 * Play pause button for starting/stopping the sim.  Often appears at the bottom center of the screen.
 * Generated programmatically using RoundPushButton (as opposed to using raster images).
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '@/utils/axon/Property';
import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import { Path } from '@/utils/scenery/imports';
import PauseIconShape from '@/utils/scenery-phet/PauseIconShape';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import SceneryPhetConstants from '@/utils/scenery-phet/SceneryPhetConstants';
import SceneryPhetStrings from '@/utils/scenery-phet/SceneryPhetStrings';
import PlayControlButton, { type PlayControlButtonOptions } from '@/utils/scenery-phet/buttons/PlayControlButton';

type SelfOptions = EmptySelfOptions;

export type PlayPauseButtonOptions = SelfOptions & PlayControlButtonOptions;

export default class PlayPauseButton extends PlayControlButton {

  public constructor(isPlayingProperty: Property<boolean>, providedOptions?: PlayPauseButtonOptions) {

    const options = optionize<PlayPauseButtonOptions, SelfOptions, PlayControlButtonOptions>()({

      // PlayPauseButtonOptions
      radius: SceneryPhetConstants.PLAY_CONTROL_BUTTON_RADIUS,

      // PlayControlButtonOptions
      includeGlobalHotkey: true,
      endPlayingLabel: SceneryPhetStrings.a11y.playControlButton.pauseStringProperty
    }, providedOptions);

    // icon sized relative to the radius
    const pauseHeight = options.radius;
    const pauseWidth = options.radius * 0.6;
    const pausePath = new Path(new PauseIconShape(pauseWidth, pauseHeight), { fill: 'black' });

    super(isPlayingProperty, pausePath, options);

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    window.assert && window.phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery-phet', 'PlayPauseButton', this);
  }
}

sceneryPhet.register('PlayPauseButton', PlayPauseButton);