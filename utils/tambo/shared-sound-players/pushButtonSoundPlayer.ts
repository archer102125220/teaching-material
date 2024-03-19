// Copyright 2019-2022, University of Colorado Boulder

/**
 * shared sound generator for pushing a button that uses the singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import generalButton_mp3 from '@/assets/sounds/tambo/generalButton_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const pushButtonSoundPlayer = new SoundClipPlayer(generalButton_mp3, {
  soundClipOptions: { initialOutputLevel: 0.5 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('pushButtonSoundPlayer', pushButtonSoundPlayer);
export default pushButtonSoundPlayer;