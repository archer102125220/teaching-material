// Copyright 2019-2022, University of Colorado Boulder

/**
 * shared sound generator for checking a checkbox that uses the singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import checkboxChecked_mp3 from '@/assets/sounds/tambo/checkboxChecked_mp3';
import SoundClipPlayer from '../sound-generators/SoundClipPlayer';
import tambo from '../tambo';

// create the shared sound instance
const checkboxCheckedSoundPlayer = new SoundClipPlayer(checkboxChecked_mp3, {
  soundClipOptions: { initialOutputLevel: 0.7 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('checkboxCheckedSoundPlayer', checkboxCheckedSoundPlayer);
export default checkboxCheckedSoundPlayer;