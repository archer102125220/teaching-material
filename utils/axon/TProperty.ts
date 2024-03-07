// Copyright 2021-2022, University of Colorado Boulder


import type StrictOmit from '../phet-core/types/StrictOmit';
import type TReadOnlyProperty from './TReadOnlyProperty';
import ReadOnlyProperty from './ReadOnlyProperty';
import type IntentionalAny from '../phet-core/types/IntentionalAny';
import TinyProperty from './TinyProperty';

/**
 * A simple Property/TinyProperty like interface
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

// See comments in Property.ts / TinyProperty.ts
type TProperty<T> = StrictOmit<TReadOnlyProperty<T>, 'value'> & {
  set(value: T): void;
  set value(value: T);
  get value(): T;
};

export function isTProperty(something: IntentionalAny): something is TProperty<unknown> {
  return (something instanceof ReadOnlyProperty || something instanceof TinyProperty) && something.isSettable();
}


// @ts-expect-error
export default TProperty;