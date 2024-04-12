// Copyright 2020-2024, University of Colorado Boulder
// @author Sam Reid (PhET Interactive Simulations)

import axon from '@/utils/axon/axon';
import Timer from '@/utils/axon/Timer';

console.log('axon/animationFrameTimer.ts');

// Like stepTimer but runs every frame whether the sim is active or not.
const animationFrameTimer = new Timer();

axon.register( 'animationFrameTimer', animationFrameTimer );
export default animationFrameTimer;