// Copyright 2023, University of Colorado Boulder

/**
 * The PhetioStateEngine is defined in the phet-io/ repo, so is not available to developers that cannot clone that repo.
 * Describe the interface explicitly here.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import PhetioObject from './PhetioObject';
import type TEmitter from '../axon/TEmitter';
import { type FullPhetioState } from './TandemConstants';
import type TReadOnlyProperty from '../axon/TReadOnlyProperty';

export type TPhetioStateEngine = {
  onBeforeApplyStateEmitter: TEmitter<[PhetioObject]>;
  undeferEmitter: TEmitter<[FullPhetioState]>;
  isSettingStateProperty: TReadOnlyProperty<boolean>;
};