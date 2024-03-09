// Copyright 2021-2022, University of Colorado Boulder

/**
 * Button for starting/stopping some behavior. Unlike the PlayPauseButton, this indicates that play will re-start
 * from the beginning after switch from play to stop.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import Property from '../../axon/Property';
import InstanceRegistry from '../../phet-core/documentation/InstanceRegistry';
import optionize, { type EmptySelfOptions } from '../../phet-core/optionize';
import { Path } from '../../scenery/imports';
import sceneryPhet from '../sceneryPhet';
import SceneryPhetConstants from '../SceneryPhetConstants';
import SceneryPhetStrings from '../SceneryPhetStrings';
import StopIconShape from '../StopIconShape';
import PlayControlButton, { type PlayControlButtonOptions } from './PlayControlButton';

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
    assert && phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery-phet', 'PlayStopButton', this);
  }
}

sceneryPhet.register('PlayStopButton', PlayStopButton);