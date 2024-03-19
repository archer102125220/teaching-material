// Copyright 2020-2022, University of Colorado Boulder

/**
 * Shared sound generator, primarily for the AB switch, but potentially useful elsewhere.  Uses the singleton pattern.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import switchToLeft_mp3 from '@/assets/sounds/tambo/switchToLeft_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const switchToLeftSoundPlayer = new SoundClipPlayer(switchToLeft_mp3, {
  soundClipOptions: { initialOutputLevel: 0.2 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('switchToLeftSoundPlayer', switchToLeftSoundPlayer);
export default switchToLeftSoundPlayer;