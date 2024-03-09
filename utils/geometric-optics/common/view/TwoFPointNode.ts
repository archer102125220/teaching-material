// Copyright 2021-2023, University of Colorado Boulder

/**
 * TwoFPointNode is the 2F point, whose distance from the optical is twice the focal length (f).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../dot/Vector2';
import optionize, { type EmptySelfOptions } from '../../../phet-core/optionize';
import ModelViewTransform2 from '../../../phetcommon/view/ModelViewTransform2';
import { Circle, Node, type NodeOptions } from '../../../scenery/imports';
import geometricOptics from '../../geometricOptics';
import GOColors from '../GOColors';
import type PickRequired from '../../../phet-core/types/PickRequired';
import ReadOnlyProperty from '../../../axon/ReadOnlyProperty';

type SelfOptions = EmptySelfOptions;

type TwoFPointNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

export default class TwoFPointNode extends Node {

  public constructor(pointProperty: ReadOnlyProperty<Vector2>, modelViewTransform: ModelViewTransform2,
    provideOptions: TwoFPointNodeOptions) {

    const options = optionize<TwoFPointNodeOptions, SelfOptions, NodeOptions>()({

      // NodeOptions
      children: [TwoFPointNode.createIcon()],
      isDisposable: false,
      phetioVisiblePropertyInstrumented: false
    }, provideOptions);

    super(options);

    pointProperty.link(twoFPoint => {
      this.center = modelViewTransform.modelToViewPosition(twoFPoint);
    });

    this.addLinkedElement(pointProperty);
  }

  /**
   * Returns an icon for the 2F point
   */
  public static createIcon(radius = 5): Node {
    return new Circle(radius, {
      fill: GOColors.twoFPointFillProperty,
      stroke: GOColors.twoFPointStrokeProperty
    });
  }
}

geometricOptics.register('TwoFPointNode', TwoFPointNode);