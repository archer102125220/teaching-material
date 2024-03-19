// Copyright 2019-2022, University of Colorado Boulder

/**
 * shared sound generator for releasing something, uses the singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import release_mp3 from '@/assets/sounds/tambo/release_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const releaseSoundPlayer = new SoundClipPlayer(release_mp3, {
  soundClipOptions: { initialOutputLevel: 0.7 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('releaseSoundPlayer', releaseSoundPlayer);
export default releaseSoundPlayer;