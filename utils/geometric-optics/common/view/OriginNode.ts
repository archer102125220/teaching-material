// Copyright 2021-2022, University of Colorado Boulder

/**
 * OriginNode is a debugging Node used to show where the origin is of something in the view, by drawing a small red dot.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Circle } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';

export default class OriginNode extends Circle {
  public constructor() {
    super(3, {
      fill: 'red'
    });
  }
}

geometricOptics.register('OriginNode', OriginNode);