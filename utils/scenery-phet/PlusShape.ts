// Copyright 2021-2022, University of Colorado Boulder

/**
 * PlusShape is the Shape for a mathematical plus symbol.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '@/utils/dot/Dimension2';
import { Shape } from '@/utils/kite/imports';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';

export default class PlusShape extends Shape {

  public constructor(size: Dimension2) {

    super();

    // starting from top left and moving clockwise
    const c1 = (size.width / 2) - (size.height / 2);
    const c2 = (size.width / 2) + (size.height / 2);
    this.moveTo(c1, 0)
      .lineTo(c2, 0)
      .lineTo(c2, c1)
      .lineTo(size.width, c1)
      .lineTo(size.width, c2)
      .lineTo(c2, c2)
      .lineTo(c2, size.width)/* yes, use width for y param */
      .lineTo(c1, size.width)/* yes, use width for y param */
      .lineTo(c1, c2)
      .lineTo(0, c2)
      .lineTo(0, c1)
      .lineTo(c1, c1)
      .close();
  }
}

sceneryPhet.register('PlusShape', PlusShape);