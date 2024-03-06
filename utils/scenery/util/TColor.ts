// Copyright 2021-2022, University of Colorado Boulder

// @ts-expect-error
import TReadOnlyProperty from '../../axon/TReadOnlyProperty';
import { Color } from '../imports.js';

/**
 * Type representing a ColorDef
 * Please see Color.toColor() for a way to transform these colors.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type TColor = TReadOnlyProperty<Color | string | null> | TReadOnlyProperty<Color | string> | TReadOnlyProperty<Color> | TReadOnlyProperty<string> | Color | string | null;

// @ts-expect-error
export default TColor;