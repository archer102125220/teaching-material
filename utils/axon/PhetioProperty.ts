// Copyright 2023-2024, University of Colorado Boulder
// @author Michael Kauzmann (PhET Interactive Simulations)

import PhetioObject from '@/utils/tandem/PhetioObject';
import type TProperty from '@/utils/axon/TProperty';

// When calling PhetioObject.addLinkedElement, the parameter must be a PhetioObject, so this type alias covers that ground
// and helps with cases like LocalizedStringProperty (and DynamicProperty in general) which satisfies the TProperty
// interface and is a PhetioObject. It is best to try to use the ReadOnlyProperty class hierarchy first, and this Type
// Alias can help cover cases where that doesn't work, see https://github.com/phetsims/tandem/issues/299
type PhetioProperty<T> = TProperty<T> & PhetioObject;

export default PhetioProperty;