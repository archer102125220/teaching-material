// Copyright 2021-2022, University of Colorado Boulder

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import { Color } from '@/utils/scenery/imports';

/**
 * Type representing a ColorDef
 * Please see Color.toColor() for a way to transform these colors.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type TColor = TReadOnlyProperty<Color | string | null> | TReadOnlyProperty<Color | string> | TReadOnlyProperty<Color> | TReadOnlyProperty<string> | Color | string | null;


// @ts-expect-error
export default TColor;