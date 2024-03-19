// Copyright 2023, University of Colorado Boulder

/**
 * The PhetioStateEngine is defined in the phet-io/ repo, so is not available to developers that cannot clone that repo.
 * Describe the interface explicitly here.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import PhetioObject from '@/utils/tandem/PhetioObject';
import type TEmitter from '@/utils/axon/TEmitter';
import { type FullPhetioState } from '@/utils/tandem/TandemConstants';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';

export type TPhetioStateEngine = {
  onBeforeApplyStateEmitter: TEmitter<[PhetioObject]>;
  undeferEmitter: TEmitter<[FullPhetioState]>;
  isSettingStateProperty: TReadOnlyProperty<boolean>;
};