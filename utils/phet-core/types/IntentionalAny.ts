// Copyright 2022, University of Colorado Boulder

/**
 * to specify when `any` is actually the best type for the case (albeit slightly unfortunate). This is not a to-do
 * to be removed.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

console.log('phet-core/IntentionalAny.ts');

type IntentionalAny = any; // eslint-disable-line @typescript-eslint/no-explicit-any

// @ts-expect-error
export default IntentionalAny;
