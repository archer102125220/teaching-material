// Copyright 2021-2022, University of Colorado Boulder

// @ts-expect-error
import TReadOnlyProperty from '../../axon/TReadOnlyProperty';
import { Color, Paint } from '../imports.js';

/**
 * Type representing a PaintDef
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type TPaint = Paint | TReadOnlyProperty<Color | string | null> | TReadOnlyProperty<Color | string> | TReadOnlyProperty<Color> | Color | string | null;

// @ts-expect-error
export default TPaint;