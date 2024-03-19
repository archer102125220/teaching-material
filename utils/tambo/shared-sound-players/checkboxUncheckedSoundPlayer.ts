// Copyright 2019-2022, University of Colorado Boulder

/**
 * shared sound generator for un-checking a checkbox, uses the singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import checkboxUnchecked_mp3 from '@/assets/sounds/tambo/checkboxUnchecked_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const checkboxUncheckedSoundPlayer = new SoundClipPlayer(checkboxUnchecked_mp3, {
  soundClipOptions: { initialOutputLevel: 0.7 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('checkboxUncheckedSoundPlayer', checkboxUncheckedSoundPlayer);
export default checkboxUncheckedSoundPlayer;