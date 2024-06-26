// Copyright 2022, University of Colorado Boulder

import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import type PickRequired from '@/utils/phet-core/types/PickRequired';

/**
 * Creates a type like the input type T, but with all certain properties required.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 * @author Sam Reid (PhET Interactive Simulations)
 */

type WithRequired<T, list extends keyof T> = StrictOmit<T, list> & PickRequired<T, list>;
export default WithRequired;