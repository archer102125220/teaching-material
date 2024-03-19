// Copyright 2019-2022, University of Colorado Boulder

/**
 * shared sound generator that produces a soft click, often used to produce discrete sounds for some continuous
 * quantity, uses the singleton pattern
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import click_mp3 from '@/assets/sounds/tambo/click_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const softClickSoundPlayer = new SoundClipPlayer(click_mp3, {
  soundClipOptions: { initialOutputLevel: 0.7 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('softClickSoundPlayer', softClickSoundPlayer);
export default softClickSoundPlayer;