// Copyright 2016-2022, University of Colorado Boulder

/**
 * Button for toggling 'recording' state on/off.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import { Circle, Rectangle } from '@/utils/scenery/imports';
import BooleanRoundToggleButton, { type BooleanRoundToggleButtonOptions } from '@/utils/sun/buttons/BooleanRoundToggleButton';
import PhetColorScheme from '@/utils/scenery-phet/PhetColorScheme';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import optionize from '@/utils/phet-core/optionize';
import Property from '@/utils/axon/Property';

type SelfOptions = {
  radius?: number;
};

export type RecordStopButtonOptions = SelfOptions & BooleanRoundToggleButtonOptions;

export default class RecordStopButton extends BooleanRoundToggleButton {

  public constructor(recordingProperty: Property<boolean>, providedOptions?: RecordStopButtonOptions) {

    const options = optionize<RecordStopButtonOptions, SelfOptions, BooleanRoundToggleButtonOptions>()({

      // RecordStopButtonOptions
      radius: 30,

      // BooleanRoundToggleButtonOptions
      xMargin: 16.5,
      yMargin: 16.5
    }, providedOptions);

    const squareLength = 0.75 * options.radius;

    // stop icon, a black square
    const stopIcon = new Rectangle(0, 0, 0.75 * options.radius, 0.75 * options.radius, { fill: 'black' });

    // record icon, a red circle
    const recordIcon = new Circle(0.6 * squareLength, {
      fill: PhetColorScheme.RED_COLORBLIND,
      center: stopIcon.center
    });

    super(recordingProperty, stopIcon, recordIcon, options);

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    window.assert && window.phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery-phet', 'RecordStopButton', this);
  }
}

sceneryPhet.register('RecordStopButton', RecordStopButton);