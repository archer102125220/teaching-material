// Copyright 2019-2024, University of Colorado Boulder

/**
 * shared sound generator for picking something up, uses the singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import grab_mp3 from '@/assets/sounds/tambo/grab_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const grabSoundPlayer = new SoundClipPlayer(grab_mp3, {
  soundClipOptions: { initialOutputLevel: 0.7 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('grabSoundPlayer', grabSoundPlayer);
export default grabSoundPlayer;