// Copyright 2019-2022, University of Colorado Boulder

/**
 * shared sound generator for when a toggle button transition to the "on" state, uses singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import stepForward_mp3 from '@/assets/sounds/tambo/stepForward_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const toggleOnSoundPlayer = new SoundClipPlayer(stepForward_mp3, {
  soundClipOptions: { initialOutputLevel: 0.7 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('toggleOnSoundPlayer', toggleOnSoundPlayer);
export default toggleOnSoundPlayer;