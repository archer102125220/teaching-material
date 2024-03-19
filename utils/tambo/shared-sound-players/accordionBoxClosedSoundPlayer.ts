// Copyright 2020-2022, University of Colorado Boulder

/**
 * shared sound generator for the accordion box open sound, uses the singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import accordionBoxClose_mp3 from '@/assets/sounds/tambo/accordionBoxClose_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const accordionBoxClosedSoundPlayer = new SoundClipPlayer(accordionBoxClose_mp3, {
  soundClipOptions: { initialOutputLevel: 0.5 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('accordionBoxClosedSoundPlayer', accordionBoxClosedSoundPlayer);
export default accordionBoxClosedSoundPlayer;