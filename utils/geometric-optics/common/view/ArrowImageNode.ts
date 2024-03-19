// Copyright 2022, University of Colorado Boulder

/**
 * ArrowImageNode renders the optical image (real or virtual) associated with an arrow object.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import ArrowImage from '@/utils/geometric-optics/common/model/ArrowImage';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import ArrowNode, { type ArrowNodeOptions } from '@/utils/scenery-phet/ArrowNode';
import { combineOptions } from '@/utils/phet-core/optionize';
import OpticalImageNode, { type OpticalImageNodeOptions } from '@/utils/geometric-optics/common/view/OpticalImageNode';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import Multilink from '@/utils/axon/Multilink';

type ArrowImageNodeOptions = PickRequired<OpticalImageNodeOptions, 'tandem'>;

export default class ArrowImageNode extends OpticalImageNode {

  /**
   * @param arrowImage - model element
   * @param virtualImageVisibleProperty - should a virtual image be visible?
   * @param lightPropagationEnabledProperty - is light propagation enabled?
   * @param objectVisibleProperty - is the optical object visible?
   * @param modelViewTransform
   * @param providedOptions
   */
  public constructor(arrowImage: ArrowImage,
    virtualImageVisibleProperty: TReadOnlyProperty<boolean>,
    lightPropagationEnabledProperty: TReadOnlyProperty<boolean>,
    objectVisibleProperty: TReadOnlyProperty<boolean>,
    modelViewTransform: ModelViewTransform2,
    providedOptions: ArrowImageNodeOptions) {

    super(arrowImage, virtualImageVisibleProperty, lightPropagationEnabledProperty, objectVisibleProperty, providedOptions);

    const arrowNode = new ArrowNode(0, 0, 0, 1,
      combineOptions<ArrowNodeOptions>({}, GOConstants.ARROW_NODE_OPTIONS, {
        fill: arrowImage.fill,
        stroke: null,
        opacity: 0.5 // fixed opacity, see https://github.com/phetsims/geometric-optics/issues/350#issuecomment-1062438996
      }));
    this.addChild(arrowNode);

    // Don't scale the head and tail, just the magnitude.
    // See https://github.com/phetsims/geometric-optics/issues/228#issuecomment-1039672404
    Multilink.multilink([arrowImage.positionProperty, arrowImage.magnificationProperty],
      (arrowImagePosition, magnification) => {

        const opticViewPosition = modelViewTransform.modelToViewPosition(arrowImage.optic.positionProperty.value);
        const objectViewPosition = modelViewTransform.modelToViewPosition(arrowImage.opticalObject.positionProperty.value);
        const imageViewPosition = modelViewTransform.modelToViewPosition(arrowImagePosition);

        let magnitude = magnification * (objectViewPosition.y - opticViewPosition.y);
        if (magnitude === 0) {
          magnitude = GOConstants.MIN_MAGNITUDE; // see https://github.com/phetsims/geometric-optics/issues/306
        }

        arrowNode.setTailAndTip(imageViewPosition.x, opticViewPosition.y, imageViewPosition.x, opticViewPosition.y + magnitude);
      });
  }
}

geometricOptics.register('ArrowImageNode', ArrowImageNode);