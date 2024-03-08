// Copyright 2020-2023, University of Colorado Boulder

/**
 * ScreenSelectionSoundGenerator generates sounds when the user switches between screens.  It does *not* handle the
 * sounds associated with the home screen - there is a separate sound generator for that.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import ReadOnlyProperty from '../axon/ReadOnlyProperty';
import SoundClip, { type SoundClipOptions } from '../tambo/sound-generators/SoundClip';
import screenSelection_mp3 from '@/assets/sounds/joist/screenSelection_mp3';
import joist from './joist';
import { type AnyScreen } from './Screen';
import HomeScreen from './HomeScreen';

class ScreenSelectionSoundGenerator extends SoundClip {

  public constructor(screenProperty: ReadOnlyProperty<AnyScreen>, homeScreen: HomeScreen | null, options?: SoundClipOptions) {

    super(screenSelection_mp3, options);

    // play sounds when the user navigates between screens and to/from the home screen
    screenProperty.lazyLink(currentScreen => {
      if (currentScreen !== homeScreen) {
        this.play();
      }
    });
  }
}

joist.register('ScreenSelectionSoundGenerator', ScreenSelectionSoundGenerator);
export default ScreenSelectionSoundGenerator;