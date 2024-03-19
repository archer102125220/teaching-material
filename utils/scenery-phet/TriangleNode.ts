// Copyright 2022, University of Colorado Boulder

/**
 * Draws an equilateral or isosceles triangle pointing up by default.
 * triangleWidth sets the base, while triangleHeight sets the altitude.
 * The point of the triangle is drawn to be perpendicular from the halfway point of the base.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import { Shape } from '@/utils/kite/imports';
import { Path, type PathOptions } from '@/utils/scenery/imports';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import optionize from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';

type SelfOptions = {
  pointDirection?: 'up' | 'down' | 'right' | 'left';
  triangleWidth?: number;
  triangleHeight?: number;
};

export type TriangleNodeOptions = SelfOptions & StrictOmit<PathOptions, 'rotation'>;

export default class TriangleNode extends Path {

  public constructor(providedOptions?: TriangleNodeOptions) {

    const options = optionize<TriangleNodeOptions, SelfOptions, PathOptions>()({
      pointDirection: 'up',
      triangleWidth: 15,
      triangleHeight: 13,
      stroke: 'black',
      lineWidth: 1,
      cursor: 'pointer'
    }, providedOptions);

    // Draws an equilateral or isosceles triangle
    const triangleShape = new Shape()
      .moveTo(options.triangleWidth / 2, 0)
      .lineTo(options.triangleWidth, options.triangleHeight)
      .lineTo(0, options.triangleHeight)
      .close();

    super(triangleShape, options);

    // rotate triangle according to provided options
    this.rotation = options.pointDirection === 'up' ? 0 :
      options.pointDirection === 'right' ? Math.PI / 2 :
        options.pointDirection === 'down' ? Math.PI :
          -Math.PI / 2;
  }
}

sceneryPhet.register('TriangleNode', TriangleNode);
