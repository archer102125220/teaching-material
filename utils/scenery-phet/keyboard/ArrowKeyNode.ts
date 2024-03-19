// Copyright 2017-2022, University of Colorado Boulder

/**
 * Node that looks like an arrow key on the keyboard.  Default is a rounded triangle centered in a square key.
 *
 * @author Jesse Greenberg
 */

import { type LineJoin, Shape } from '@/utils/kite/imports';
import optionize from '@/utils/phet-core/optionize';
import { type TColor, Path } from '@/utils/scenery/imports';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import KeyNode, { type KeyNodeOptions } from '@/utils/scenery-phet/keyboard/KeyNode';

// constants
const DEFAULT_ARROW_HEIGHT = 10;
const DEFAULT_ARROW_WIDTH = 0.6 * Math.sqrt(3) * DEFAULT_ARROW_HEIGHT; // for an isosceles triangle

type Direction = 'up' | 'down' | 'left' | 'right';

// possible directions for the arrows in the key
const DIRECTION_ANGLES = {
  up: 0,
  down: Math.PI,
  left: -Math.PI / 2,
  right: Math.PI / 2
};

type SelfOptions = {
  arrowFill?: TColor;
  arrowStroke?: TColor;
  arrowLineJoin?: LineJoin;
  arrowLineWidth?: number;
  arrowHeight?: number;
  arrowWidth?: number;
};

export type ArrowKeyNodeOptions = SelfOptions & KeyNodeOptions;

export default class ArrowKeyNode extends KeyNode {

  public constructor(direction: Direction, providedOptions?: ArrowKeyNodeOptions) {

    window.assert && window.assert(DIRECTION_ANGLES[direction] !== undefined, 'Arrow direction must be one of DIRECTION_ANGLES');

    const options = optionize<ArrowKeyNodeOptions, SelfOptions, KeyNodeOptions>()({

      // SelfOptions
      arrowFill: 'black',
      arrowStroke: 'black',
      arrowLineJoin: 'round',
      arrowLineWidth: 3,
      arrowHeight: DEFAULT_ARROW_HEIGHT,
      arrowWidth: DEFAULT_ARROW_WIDTH,

      // KeyNodeOptions
      yPadding: 13, // this way the arrows will be scaled down and given proper margin in the key
      forceSquareKey: true // arrow keys are typically square
    }, providedOptions);

    const arrowHeight = options.arrowHeight;
    const arrowWidth = options.arrowWidth;
    const arrowLineJoin = options.arrowLineJoin;
    const arrowLineWidth = options.arrowLineWidth;
    const arrowFill = options.arrowFill;
    const arrowStroke = options.arrowStroke;

    // draw the arrow shape - default shape pointing up
    const arrowShape = new Shape();
    arrowShape.moveTo(arrowHeight / 2, 0).lineTo(arrowHeight, arrowWidth + 0).lineTo(0, arrowWidth + 0).close();

    const arrowPath = new Path(arrowShape, {
      fill: arrowFill,
      stroke: arrowStroke,
      lineJoin: arrowLineJoin,
      lineWidth: arrowLineWidth,
      rotation: DIRECTION_ANGLES[direction]
    });

    // place the arrow in the key
    super(arrowPath, options);
  }
}

sceneryPhet.register('ArrowKeyNode', ArrowKeyNode);