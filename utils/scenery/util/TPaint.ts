// Copyright 2021-2022, University of Colorado Boulder

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import { Color, Paint } from '@/utils/scenery/imports';

/**
 * Type representing a PaintDef
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

type TPaint = Paint | TReadOnlyProperty<Color | string | null> | TReadOnlyProperty<Color | string> | TReadOnlyProperty<Color> | Color | string | null;


// @ts-expect-error
export default TPaint;