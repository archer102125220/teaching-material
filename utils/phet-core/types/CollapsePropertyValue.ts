// Copyright 2022, University of Colorado Boulder

/**
 * Provides the value type of either a direct type OR the value of a Property (if it's a Property)
 *
 * e.g. CollapsePropertyValue<number> is number
 * e.g. CollapsePropertyValue<Property<number>> is number
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';

type CollapsePropertyValue<T> = T extends TReadOnlyProperty<infer Value> ? Value : T;
export default CollapsePropertyValue;