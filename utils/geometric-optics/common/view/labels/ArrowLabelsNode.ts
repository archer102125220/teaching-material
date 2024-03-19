// Copyright 2021-2023, University of Colorado Boulder

/**
 * ArrowLabelsNode labels things in the 'Arrow' scene.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '@/utils/axon/DerivedProperty';
import Vector2 from '@/utils/dot/Vector2';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import Bounds2 from '@/utils/dot/Bounds2';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import GOLabelsNode, { type GOSceneLabelsNodeOptions } from '@/utils/geometric-optics/common/view/labels/GOLabelsNode';
import ArrowImage from '@/utils/geometric-optics/common/model/ArrowImage';
import ArrowObject from '@/utils/geometric-optics/common/model/ArrowObject';
import OpticalObjectLabelNode, { type OpticalObjectLabelNodeOptions } from '@/utils/geometric-optics/common/view/labels/OpticalObjectLabelNode';
import OpticalImageLabelNode, { type OpticalImageLabelNodeOptions } from '@/utils/geometric-optics/common/view/labels/OpticalImageLabelNode';
import ArrowSceneNode from '@/utils/geometric-optics/common/view/ArrowSceneNode';
import { type GOSimOptions } from '@/utils/geometric-optics/GOSim';
import type PickRequired from '@/utils/phet-core/types/PickRequired';

type SelfOptions = PickRequired<GOSimOptions, 'isBasicsVersion'>;

type ArrowObjectSceneLabelsNodeOptions = SelfOptions & GOSceneLabelsNodeOptions;

export default class ArrowLabelsNode extends GOLabelsNode {

  /**
   * @param sceneNode - the scene whose arrows we are labeling
   * @param zoomTransformProperty - model-view transform that the user controls by zooming in/out
   * @param modelVisibleBoundsProperty - ScreenView's visibleBounds in the model coordinate frame, with the zoom transform applied
   * @param providedOptions
   */
  public constructor(sceneNode: ArrowSceneNode,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    modelVisibleBoundsProperty: TReadOnlyProperty<Bounds2>,
    providedOptions: ArrowObjectSceneLabelsNodeOptions) {

    super(sceneNode, zoomTransformProperty, modelVisibleBoundsProperty, providedOptions);

    const scene = sceneNode.scene;

    // Use numbering in the full version of the sim, or in the Basics version if Object 2 is made visible.
    const isNumberedProperty = new DerivedProperty([sceneNode.arrowObject2NodeVisibleProperty],
      arrowObject2NodeVisible => (!providedOptions.isBasicsVersion || arrowObject2NodeVisible));

    // Object labels ------------------------------------------------------------------------------------

    const object1Label = new ArrowObjectLabelNode(scene.arrowObject1, scene.optic.positionProperty, zoomTransformProperty, {
      visibleProperty: sceneNode.arrowObject1NodeVisibleProperty,
      isNumberedProperty,
      tandem: providedOptions.tandem.createTandem('object1Label')
    });
    this.addChild(object1Label);

    const object2Label = new ArrowObjectLabelNode(scene.arrowObject2, scene.optic.positionProperty, zoomTransformProperty, {
      visibleProperty: sceneNode.arrowObject2NodeVisibleProperty,
      // 2nd object is always numbered, so isNumberedProperty is unnecessary,
      tandem: providedOptions.tandem.createTandem('object2Label')
    });
    this.addChild(object2Label);

    // Image labels ------------------------------------------------------------------------------------

    const image1Label = new ArrowImageLabelNode(scene.arrowImage1, scene.optic.positionProperty, zoomTransformProperty, {
      visibleProperty: sceneNode.arrowImage1NodeVisibleProperty,
      isNumberedProperty,
      tandem: providedOptions.tandem.createTandem('image1Label')
    });
    this.addChild(image1Label);

    const image2Label = new ArrowImageLabelNode(scene.arrowImage2, scene.optic.positionProperty, zoomTransformProperty, {
      visibleProperty: sceneNode.arrowImage2NodeVisibleProperty,
      // 2nd image is always numbered, so isNumberedProperty is unnecessary
      tandem: providedOptions.tandem.createTandem('image2Label')
    });
    this.addChild(image2Label);
  }
}

// Label for an arrow object.
class ArrowObjectLabelNode extends OpticalObjectLabelNode {

  public constructor(arrowObject: ArrowObject,
    opticPositionProperty: TReadOnlyProperty<Vector2>,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    providedOptions: OpticalObjectLabelNodeOptions) {

    // If the arrow points up, position the label below the optical axis.
    // Otherwise, position the label below the arrow's tip.
    const labelPositionProperty = new DerivedProperty(
      [arrowObject.positionProperty, opticPositionProperty],
      (arrowPosition, opticPosition) =>
        (arrowPosition.y > opticPosition.y) ? new Vector2(arrowPosition.x, opticPosition.y) : arrowPosition
    );

    super(arrowObject.opticalObjectNumber, labelPositionProperty, zoomTransformProperty, providedOptions);
  }
}

// Label for an arrow image.
class ArrowImageLabelNode extends OpticalImageLabelNode {

  public constructor(arrowImage: ArrowImage,
    opticPositionProperty: TReadOnlyProperty<Vector2>,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    providedOptions: OpticalImageLabelNodeOptions) {

    const labelPositionProperty = new DerivedProperty(
      [arrowImage.positionProperty, opticPositionProperty],
      (arrowPosition, opticPosition) => {
        if (arrowPosition.y > opticPosition.y) {
          return new Vector2(arrowPosition.x, opticPosition.y);
        }
        else {
          return arrowPosition;
        }
      }
    );

    super(arrowImage, labelPositionProperty, zoomTransformProperty, providedOptions);
  }
}

geometricOptics.register('ArrowLabelsNode', ArrowLabelsNode);