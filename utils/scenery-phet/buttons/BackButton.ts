// Copyright 2014-2022, University of Colorado Boulder

/**
 * Button that is intended to indicate going backwards, much like the back button on a web browser.  It was originally
 * created for returning to the level selection screen when playing a game.  It looks like a button with an arrow
 * pointing to the left.
 *
 * @author John Blanco
 * @author Sam Reid (PhET Interactive Simulations)
 */

import goBack_mp3 from '@/assets/sounds/scenery-phet/goBack_mp3';
import optionize from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import { Path } from '@/utils/scenery/imports';
import RectangularPushButton, { type RectangularPushButtonOptions } from '@/utils/sun/buttons/RectangularPushButton';
import type TSoundPlayer from '@/utils/tambo/TSoundPlayer';
import SoundClip from '@/utils/tambo/sound-generators/SoundClip';
import soundManager from '@/utils/tambo/soundManager';
import ArrowShape from '@/utils/scenery-phet/ArrowShape';
import PhetColorScheme from '@/utils/scenery-phet/PhetColorScheme';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

type SelfOptions = {
  soundPlayer?: TSoundPlayer;
};

export type BackButtonOptions = SelfOptions & StrictOmit<RectangularPushButtonOptions, 'content'>;

export default class BackButton extends RectangularPushButton {

  public constructor(providedOptions?: BackButtonOptions) {

    const options = optionize<BackButtonOptions, StrictOmit<SelfOptions, 'soundPlayer'>, RectangularPushButtonOptions>()({

      // Default margin values were set up to make this button match the size of the refresh button, since these
      // buttons often appear together.  See see https://github.com/phetsims/scenery-phet/issues/44.
      xMargin: 8,
      yMargin: 10.9,

      baseColor: PhetColorScheme.BUTTON_YELLOW

    }, providedOptions);

    // Create and add the default sound generator if none was provided.
    if (!options.soundPlayer) {
      const goBackSoundClip = new SoundClip(goBack_mp3, { initialOutputLevel: 0.35 });
      soundManager.addSoundGenerator(goBackSoundClip, { categoryName: 'user-interface' });
      options.soundPlayer = goBackSoundClip;
    }

    const arrowShape = new ArrowShape(0, 0, -28.5, 0, {
      tailWidth: 8,
      headWidth: 18,
      headHeight: 15
    });
    options.content = new Path(arrowShape, { fill: 'black' });

    super(options);
  }
}

sceneryPhet.register('BackButton', BackButton);