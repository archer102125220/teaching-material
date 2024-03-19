// Copyright 2021-2023, University of Colorado Boulder

/**
 * FramedImageNode renders the optical image (real or virtual) associated with a framed object.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import Vector2 from '@/utils/dot/Vector2';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import { Image, Node } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import Optic from '@/utils/geometric-optics/common/model/Optic';
import FramedImage from '@/utils/geometric-optics/common/model/FramedImage';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import OpticalImageNode, { type OpticalImageNodeOptions } from '@/utils/geometric-optics/common/view/OpticalImageNode';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import FramedImageMaskNode from '@/utils/geometric-optics/common/view/FramedImageMaskNode';

type FramedImageNodeOptions = PickRequired<OpticalImageNodeOptions, 'tandem'>;

export default class FramedImageNode extends OpticalImageNode {

  /**
   * @param framedImage - model element
   * @param optic - associated optic
   * @param virtualImageVisibleProperty - should a virtual image be visible?
   * @param lightPropagationEnabledProperty - is light propagation enabled?
   * @param objectVisibleProperty - is the optical object visible?
   * @param modelViewTransform
   * @param providedOptions
   */
  public constructor(framedImage: FramedImage,
    optic: Optic,
    virtualImageVisibleProperty: TReadOnlyProperty<boolean>,
    lightPropagationEnabledProperty: TReadOnlyProperty<boolean>,
    objectVisibleProperty: TReadOnlyProperty<boolean>,
    modelViewTransform: ModelViewTransform2,
    providedOptions: FramedImageNodeOptions) {

    super(framedImage, virtualImageVisibleProperty, lightPropagationEnabledProperty, objectVisibleProperty, providedOptions);

    const imageNode = new Image(framedImage.htmlImageElementProperty.value);

    // A mask is used to reduce the opacity of the optical image where it occludes the optical axis and rays.
    // See https://github.com/phetsims/geometric-optics/issues/283.
    const maskNode = new FramedImageMaskNode(imageNode.width, imageNode.height);

    const parentNode = new Node({
      children: [maskNode, imageNode]
    });
    this.addChild(parentNode);

    const updateScaleAndPosition = (): void => {

      const viewBounds = modelViewTransform.modelToViewBounds(framedImage.boundsProperty.value);

      let scaleX = (viewBounds.width / parentNode.width);
      if (scaleX === 0 || !isFinite(scaleX)) {
        scaleX = GOConstants.MIN_SCALE;
      }

      let scaleY = (viewBounds.height / parentNode.height);
      if (scaleY === 0 || !isFinite(scaleY)) {
        scaleY = GOConstants.MIN_SCALE;
      }

      parentNode.scale(scaleX, scaleY);
      parentNode.translation = new Vector2(viewBounds.minX, viewBounds.minY);
    };

    framedImage.boundsProperty.link(() => updateScaleAndPosition());

    // Update the opacity of the image, but not the mask.
    framedImage.opacityProperty.link(opacity => {
      imageNode.opacity = opacity;
    });

    // Update the image and mask.
    framedImage.htmlImageElementProperty.link(htmlImageElement => {

      // Update the HTMLImageElement (PNG file).
      imageNode.image = htmlImageElement;

      // Update the mask to face towards the optic.
      maskNode.setIsRightFacing(framedImage.positionProperty.value.x < optic.positionProperty.value.x);

      updateScaleAndPosition();
    });
  }
}

geometricOptics.register('FramedImageNode', FramedImageNode);