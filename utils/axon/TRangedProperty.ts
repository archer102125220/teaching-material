// Copyright 2023-2024, University of Colorado Boulder
// @author Michael Kauzmann (PhET Interactive Simulations)

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import Range from '@/utils/dot/Range';
import type IntentionalAny from '@/utils/phet-core/types/IntentionalAny';
import ReadOnlyProperty from '@/utils/axon/ReadOnlyProperty';
import TinyProperty from '@/utils/axon/TinyProperty';
import type PhetioProperty from '@/utils/axon/PhetioProperty';

// Minimal types for Properties that support a rangeProperty.
export type TRangedProperty = PhetioProperty<number> & { range: Range; readonly rangeProperty: TReadOnlyProperty<Range> };

export function isTRangedProperty(something: IntentionalAny): something is TRangedProperty {
  return (something instanceof ReadOnlyProperty || something instanceof TinyProperty) && something.isSettable() &&

    // @ts-expect-error we are checking on the pressence, but can't use hasOwnProperty in case it is implemented wil es5 getters and setters
    !!something.range && !!something.rangeProperty;
}

export default TRangedProperty;