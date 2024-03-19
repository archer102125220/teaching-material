// Copyright 2022, University of Colorado Boulder

/**
 * CameraButton is a push button with a camera icon.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import { Path, type TColor } from '@/utils/scenery/imports';
import RectangularPushButton, { type RectangularPushButtonOptions } from '@/utils/sun/buttons/RectangularPushButton';
import cameraSolidShape from '@/utils/sherpa/fontawesome-5/cameraSolidShape';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import PhetColorScheme from '@/utils/scenery-phet/PhetColorScheme';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

type SelfOptions = {
  iconFill?: TColor;
  iconScale?: number;
};

type CameraButtonOptions = SelfOptions &
  StrictOmit<RectangularPushButtonOptions, 'content'> &
  PickRequired<RectangularPushButtonOptions, 'tandem'>;

export default class CameraButton extends RectangularPushButton {

  public constructor(providedOptions: CameraButtonOptions) {

    const options = optionize<CameraButtonOptions, SelfOptions, RectangularPushButtonOptions>()({

      // SelfOptions
      iconFill: 'black',
      iconScale: 0.037,

      // RectangularPushButtonOptions
      baseColor: PhetColorScheme.BUTTON_YELLOW,
      xMargin: 8,
      yMargin: 4
    }, providedOptions);

    options.content = new Path(cameraSolidShape, {
      scale: options.iconScale,
      fill: options.iconFill
    });

    super(options);
  }
}

sceneryPhet.register('CameraButton', CameraButton);