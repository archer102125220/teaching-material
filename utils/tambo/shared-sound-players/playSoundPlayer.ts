// Copyright 2019-2022, University of Colorado Boulder

/**
 * shared sound generator for the "play" state of the play/pause button, uses singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import playPause_mp3 from '@/assets/sounds/tambo/playPause_mp3';
import SoundClipPlayer from '../sound-generators/SoundClipPlayer';
import tambo from '../tambo';

// create the shared sound instance
const playSoundPlayer = new SoundClipPlayer(playPause_mp3, {
  soundClipOptions: { initialOutputLevel: 0.7 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('playSoundPlayer', playSoundPlayer);
export default playSoundPlayer;