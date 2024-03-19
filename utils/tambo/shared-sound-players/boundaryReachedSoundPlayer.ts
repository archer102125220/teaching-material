// Copyright 2020-2022, University of Colorado Boulder

/**
 * shared sound generator for when something encounters a boundary
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import boundaryReached_mp3 from '@/assets/sounds/tambo/boundaryReached_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const boundaryReachedSoundPlayer = new SoundClipPlayer(boundaryReached_mp3, {
  soundClipOptions: { initialOutputLevel: 0.8 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('boundaryReachedSoundPlayer', boundaryReachedSoundPlayer);
export default boundaryReachedSoundPlayer;