// Copyright 2020-2022, University of Colorado Boulder

/**
 * shared sound generator for when something is closed, uses singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import generalClose_mp3 from '@/assets/sounds/tambo/generalClose_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const generalCloseSoundPlayer = new SoundClipPlayer(generalClose_mp3, {
  soundClipOptions: { initialOutputLevel: 0.4 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('generalCloseSoundPlayer', generalCloseSoundPlayer);
export default generalCloseSoundPlayer;