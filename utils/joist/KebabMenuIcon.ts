// Copyright 2018-2022, University of Colorado Boulder

/**
 * The "kebab" menu icon, 3 dots stacked vertically that look like a shish kebab.
 * See https://github.com/phetsims/joist/issues/544
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '@/utils/kite/imports';
import { Path, type PathOptions } from '@/utils/scenery/imports';
import joist from '@/utils/joist/joist';

// constants
const CIRCLE_RADIUS = 2.5;

class KebabMenuIcon extends Path {

  public constructor(options?: PathOptions) {

    const shape = new Shape(undefined, undefined, 'KebabMenuIcon constructor shape');
    for (let i = 0; i < 3; i++) {
      shape.circle(0, i * 3.543 * CIRCLE_RADIUS, CIRCLE_RADIUS); // args are: x, y, radius
    }

    super(shape, options);
  }
}

joist.register('KebabMenuIcon', KebabMenuIcon);
export default KebabMenuIcon;