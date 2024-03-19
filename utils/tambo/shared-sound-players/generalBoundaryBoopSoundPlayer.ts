// Copyright 2020-2022, University of Colorado Boulder

/**
 * A shared sound generator for UI-related boundary sounds, like when at the min or max of a component range.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import generalBoundaryBoop_mp3 from '@/assets/sounds/tambo/generalBoundaryBoop_mp3';
import SoundClipPlayer from '@/utils/tambo/sound-generators/SoundClipPlayer';
import tambo from '@/utils/tambo/tambo';

// create the shared sound instance
const generalBoundaryBoopSoundPlayer = new SoundClipPlayer(generalBoundaryBoop_mp3, {
  soundClipOptions: { initialOutputLevel: 0.2 },
  soundManagerOptions: { categoryName: 'user-interface' }
});

tambo.register('generalBoundaryBoopSoundPlayer', generalBoundaryBoopSoundPlayer);
export default generalBoundaryBoopSoundPlayer;