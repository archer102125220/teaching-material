// Copyright 2014-2023, University of Colorado Boulder

/**
 * Button with an eraser icon.
 *
 * @author John Blanco
 */

import InstanceRegistry from '@/utils/phet-core/documentation/InstanceRegistry';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import optionize from '@/utils/phet-core/optionize';
import { Image } from '@/utils/scenery/imports';
import RectangularPushButton, { type RectangularPushButtonOptions } from '@/utils/sun/buttons/RectangularPushButton';
import eraser_png from '@/assets/images/scenery-phet/eraser_png';
import PhetColorScheme from '@/utils/scenery-phet/PhetColorScheme';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import erase_mp3 from '@/assets/sounds/scenery-phet/erase_mp3';

type SelfOptions = {
  iconWidth?: number; // width of eraser icon, used for scaling, the aspect ratio will determine height
};

export type EraserButtonOptions = SelfOptions & StrictOmit<RectangularPushButtonOptions, 'content'>;

export default class EraserButton extends RectangularPushButton {

  public constructor(providedOptions?: EraserButtonOptions) {

    const options = optionize<EraserButtonOptions, SelfOptions, RectangularPushButtonOptions>()({

      // SelfOptions
      iconWidth: 20,

      // RectangularPushButtonOptions
      baseColor: PhetColorScheme.BUTTON_YELLOW,

      soundPlayer: new SoundClipPlayer(erase_mp3, {
        soundClipOptions: { initialOutputLevel: 0.22 }
      })
    }, providedOptions);

    // eraser icon
    options.content = new Image(eraser_png);
    options.content.scale(options.iconWidth / options.content.width);

    super(options);

    // support for binder documentation, stripped out in builds and only runs when ?binder is specified
    window.assert && window.phet.chipper.queryParameters.binder && InstanceRegistry.registerDataURL('scenery-phet', 'EraserButton', this);
  }
}

sceneryPhet.register('EraserButton', EraserButton);