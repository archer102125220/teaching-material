// Copyright 2022, University of Colorado Boulder

/**
 * Interface specifically for SelfDrawables for a Circle Node.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { type TPathDrawable } from '../../imports';

type TCircleDrawable = {
  markDirtyRadius(): void;
} & TPathDrawable;
export default TCircleDrawable;
