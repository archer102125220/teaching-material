// Copyright 2019-2022, University of Colorado Boulder

/**
 * shared sound generator for reset all, uses the singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import resetAll_mp3 from '@/assets/sounds/tambo/resetAll_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const resetAllSoundPlayer = new SoundClipPlayer(resetAll_mp3, {
  soundClipOptions: {
    initialOutputLevel: 0.39,
    enabledDuringPhetioStateSetting: true
  },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('resetAllSoundPlayer', resetAllSoundPlayer);
export default resetAllSoundPlayer;