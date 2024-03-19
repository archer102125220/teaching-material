// Copyright 2021-2023, University of Colorado Boulder

/**
 * FocalPointNode displays a focal point. Its position updates to match the model.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '@/utils/dot/Vector2';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import { Circle, Node, type NodeOptions } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import ReadOnlyProperty from '@/utils/axon/ReadOnlyProperty';

type SelfOptions = EmptySelfOptions;

type FocalPointNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

export default class FocalPointNode extends Node {

  public constructor(pointProperty: ReadOnlyProperty<Vector2>,
    modelViewTransform: ModelViewTransform2,
    providedOptions: FocalPointNodeOptions) {

    const options = optionize<FocalPointNodeOptions, SelfOptions, NodeOptions>()({

      // NodeOptions
      children: [FocalPointNode.createIcon()],
      phetioVisiblePropertyInstrumented: false,
      isDisposable: false
    }, providedOptions);

    super(options);

    pointProperty.link(focalPoint => {
      this.center = modelViewTransform.modelToViewPosition(focalPoint);
    });

    this.addLinkedElement(pointProperty);
  }

  /**
   * Returns an icon for the focal point
   */
  public static createIcon(radius = 7): Node {
    const circleNode = new Circle(radius, {
      fill: GOColors.focalPointFillProperty,
      stroke: GOColors.focalPointStrokeProperty
    });
    const centerPointNode = new Circle(2, {
      fill: GOColors.focalPointStrokeProperty
    });
    return new Node({
      children: [circleNode, centerPointNode]
    });
  }
}

geometricOptics.register('FocalPointNode', FocalPointNode);