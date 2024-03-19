// Copyright 2019-2022, University of Colorado Boulder

/**
 * shared sound generator for the "pause" state of the play/pause button, uses singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import pause_mp3 from '@/assets/sounds/tambo/pause_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const pauseSoundPlayer = new SoundClipPlayer(pause_mp3, {
  soundClipOptions: { initialOutputLevel: 0.7 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('pauseSoundPlayer', pauseSoundPlayer);
export default pauseSoundPlayer;