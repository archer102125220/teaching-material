// Copyright 2021-2023, University of Colorado Boulder

/**
 * CueingArrowsNode is the cueing arrows used to indicate that something can be dragged in some direction.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import { type NodeTranslationOptions, Path, type PathOptions } from '@/utils/scenery/imports';
import ArrowShape from '@/utils/scenery-phet/ArrowShape';
import { Shape } from '@/utils/kite/imports';
import optionize from '@/utils/phet-core/optionize';
import type PickOptional from '@/utils/phet-core/types/PickOptional';
import GOPreferences from '@/utils/geometric-optics/common/model/GOPreferences';
import DerivedProperty from '@/utils/axon/DerivedProperty';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';

type CueingArrowsDirection = 'horizontal' | 'vertical' | 'both';

type SelfOptions = {
  direction?: CueingArrowsDirection;
  length?: number;
};

type CueingArrowsNodeOptions = SelfOptions &
  PickOptional<PathOptions, 'fill' | 'stroke' | 'scale' | 'visibleProperty'> &
  NodeTranslationOptions;

export default class CueingArrowsNode extends Path {

  // length of the arrows, from tip to tip
  private readonly length: number;

  public constructor(providedOptions?: CueingArrowsNodeOptions) {

    const options = optionize<CueingArrowsNodeOptions, SelfOptions, PathOptions>()({

      // CueingArrowsNodeOptions
      direction: 'both',
      length: 35,

      // PathOptions
      fill: 'rgb( 0, 200, 0 )',
      stroke: 'black',
      isDisposable: false

    }, providedOptions);

    super(createArrowsShape(options.direction, options.length), options);

    this.length = options.length;

    this.boundsProperty.link(() => {
      this.touchArea = this.localBounds.dilated(5);
      this.mouseArea = this.localBounds.dilated(3);
    });
  }

  public setDirection(direction: CueingArrowsDirection): void {
    this.shape = createArrowsShape(direction, this.length);
  }

  /**
   * Common method of creating the visibleProperty for cueing arrows when they are associated with a draggable Node.
   * @param inputEnabledProperty - is input enabled for the associated Node?
   * @param wasDraggedProperty - has the associated Node been dragged?
   */
  public static createVisibleProperty(inputEnabledProperty: TReadOnlyProperty<boolean>,
    wasDraggedProperty: TReadOnlyProperty<boolean>): TReadOnlyProperty<boolean> {
    return new DerivedProperty(
      [GOPreferences.cueingArrowsEnabledProperty, inputEnabledProperty, wasDraggedProperty],
      (cueingArrowsEnabled, inputEnabled, wasDragged) =>
        (cueingArrowsEnabled && inputEnabled && !wasDragged));
  }
}

const ARROW_SHAPE_OPTIONS = {
  doubleHead: true,
  headWidth: 12,
  headHeight: 8,
  tailWidth: 3
};

function createArrowsShape(direction: CueingArrowsDirection, length: number): Shape {
  let shape;
  if (direction === 'horizontal') {
    shape = new ArrowShape(-length / 2, 0, length / 2, 0, ARROW_SHAPE_OPTIONS);
  }
  else if (direction === 'vertical') {
    shape = new ArrowShape(0, -length / 2, 0, length / 2, ARROW_SHAPE_OPTIONS);
  }
  else {
    const leftRightArrowShape = new ArrowShape(-length / 2, 0, length / 2, 0, ARROW_SHAPE_OPTIONS);
    const upDownArrowShape = new ArrowShape(0, -length / 2, 0, length / 2, ARROW_SHAPE_OPTIONS);
    shape = Shape.union([leftRightArrowShape, upDownArrowShape]);
  }
  return shape;
}

geometricOptics.register('CueingArrowsNode', CueingArrowsNode);