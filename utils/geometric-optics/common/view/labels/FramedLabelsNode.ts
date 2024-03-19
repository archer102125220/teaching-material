// Copyright 2021-2022, University of Colorado Boulder

/**
 * FramedLabelsNode labels things in the 'Framed' scene, which has a framed object and image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '@/utils/axon/DerivedProperty';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import Bounds2 from '@/utils/dot/Bounds2';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import GOLabelsNode, { type GOSceneLabelsNodeOptions } from '@/utils/geometric-optics/common/view/labels/GOLabelsNode';
import OpticalObjectLabelNode from '@/utils/geometric-optics/common/view/labels/OpticalObjectLabelNode';
import BooleanProperty from '@/utils/axon/BooleanProperty';
import OpticalImageLabelNode from '@/utils/geometric-optics/common/view/labels/OpticalImageLabelNode';
import FramedSceneNode from '@/utils/geometric-optics/common/view/FramedSceneNode';

export default class FramedLabelsNode extends GOLabelsNode {

  /**
   * @param sceneNode - the scene whose optical objects we are labeling
   * @param zoomTransformProperty - model-view transform that the user controls by zooming in/out
   * @param modelVisibleBoundsProperty - ScreenView's visibleBounds in the model coordinate frame, with the zoom transform applied
   * @param providedOptions
   */
  public constructor(sceneNode: FramedSceneNode,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    modelVisibleBoundsProperty: TReadOnlyProperty<Bounds2>,
    providedOptions: GOSceneLabelsNodeOptions) {

    super(sceneNode, zoomTransformProperty, modelVisibleBoundsProperty, providedOptions);

    const scene = sceneNode.scene;

    const isNumberedProperty = new BooleanProperty(false, {
      validValues: [false]
    });

    // Object label ------------------------------------------------------------------------------------

    const objectLabelPositionProperty = new DerivedProperty(
      [scene.framedObject.boundsProperty],
      bounds => bounds.centerTop
    );

    const objectLabel = new OpticalObjectLabelNode(scene.framedObject.opticalObjectNumber,
      objectLabelPositionProperty, zoomTransformProperty, {
      isNumberedProperty,
      visibleProperty: sceneNode.framedObjectNodeVisibleProperty,
      tandem: providedOptions.tandem.createTandem('objectLabel')
    });
    this.addChild(objectLabel);

    // Image label ------------------------------------------------------------------------------------

    const imageLabelPositionProperty = new DerivedProperty(
      [scene.framedImage1.boundsProperty],
      bounds => bounds.centerTop
    );

    const imageLabel = new OpticalImageLabelNode(scene.framedImage1, imageLabelPositionProperty, zoomTransformProperty, {
      isNumberedProperty,
      visibleProperty: sceneNode.framedImageNodeVisibleProperty,
      tandem: providedOptions.tandem.createTandem('imageLabel')
    });
    this.addChild(imageLabel);
  }
}

geometricOptics.register('FramedLabelsNode', FramedLabelsNode);