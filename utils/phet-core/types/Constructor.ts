// Copyright 2022, University of Colorado Boulder

/**
 * Simple generic Type for a Constructor.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

// @ts-expect-error
import IntentionalAny from './IntentionalAny';

type Constructor<T=object, K extends IntentionalAny[] = IntentionalAny[]> = new ( ...args: K ) => T;

// @ts-expect-error
export default Constructor;
