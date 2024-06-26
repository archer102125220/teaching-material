// Copyright 2022, University of Colorado Boulder

/**
 * ArrowSceneNode is the view of 'Arrow' scene, the scene that has arrow objects.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import VisibleProperties from '@/utils/geometric-optics/common/view/VisibleProperties';
import Bounds2 from '@/utils/dot/Bounds2';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import { type RaysType } from '@/utils/geometric-optics/common/model/RaysType';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import RealLightRaysNode from '@/utils/geometric-optics/common/view/RealLightRaysNode';
import BooleanProperty from '@/utils/axon/BooleanProperty';
import VirtualLightRaysNode from '@/utils/geometric-optics/common/view/VirtualLightRaysNode';
import DerivedProperty from '@/utils/axon/DerivedProperty';
import ArrowScene from '@/utils/geometric-optics/common/model/ArrowScene';
import ArrowObjectNode from '@/utils/geometric-optics/common/view/ArrowObjectNode';
import ArrowImageNode from '@/utils/geometric-optics/common/view/ArrowImageNode';
import GOSceneNode, { type GOSceneNodeOptions } from '@/utils/geometric-optics/common/view/GOSceneNode';
import ToolJumpPoint from '@/utils/geometric-optics/common/model/tools/ToolJumpPoint';
import { type ObjectDragMode } from '@/utils/geometric-optics/common/view/ObjectDragMode';

type SelfOptions = {

  // how the optical object can be dragged, 'freeDragging' or 'horizontalDragging'
  objectDragModeProperty: TReadOnlyProperty<ObjectDragMode>;
};

type ArrowObjectSceneNodeOptions = SelfOptions & GOSceneNodeOptions;

export default class ArrowSceneNode extends GOSceneNode {

  // See GOSceneNode
  public readonly toolJumpPoints: ToolJumpPoint[];

  public readonly scene: ArrowScene;

  // Visibility of things that have labels, intended to be used to control the visibility of associated labels.
  public readonly arrowObject1NodeVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly arrowObject2NodeVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly arrowImage1NodeVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly arrowImage2NodeVisibleProperty: TReadOnlyProperty<boolean>;

  // Resets things that are specific to this class.
  private readonly resetFrameObjectSceneNode: () => void;

  /**
   * @param scene - model element
   * @param visibleProperties
   * @param modelViewTransform
   * @param modelVisibleBoundsProperty - ScreenView's visibleBounds in the model coordinate frame, with the zoom transform applied
   * @param sceneBoundsProperty - bounds for the scene, in model coordinates
   * @param raysTypeProperty - representation used for rays
   * @param lightPropagationEnabledProperty - is light propagation enabled?
   * @param providedOptions
   */
  public constructor(scene: ArrowScene,
    visibleProperties: VisibleProperties,
    modelViewTransform: ModelViewTransform2,
    modelVisibleBoundsProperty: TReadOnlyProperty<Bounds2>,
    sceneBoundsProperty: TReadOnlyProperty<Bounds2>,
    raysTypeProperty: TReadOnlyProperty<RaysType>,
    lightPropagationEnabledProperty: TReadOnlyProperty<boolean>,
    providedOptions: ArrowObjectSceneNodeOptions) {

    super(scene, visibleProperties, modelViewTransform, modelVisibleBoundsProperty, sceneBoundsProperty, raysTypeProperty, providedOptions);

    this.scene = scene;

    const arrowWasDraggedProperty = new BooleanProperty(false, {
      tandem: providedOptions.tandem.createTandem('arrowWasDraggedProperty'),
      phetioReadOnly: true,
      phetioDocumentation: 'Was either arrow dragged? Dragging either arrow hides the cueing arrows for both arrows.'
    });

    // First arrow object
    const arrowObject1Node = new ArrowObjectNode(scene.arrowObject1, scene.optic, sceneBoundsProperty,
      modelViewTransform, providedOptions.objectDragModeProperty, arrowWasDraggedProperty, {
      tandem: providedOptions.tandem.createTandem('arrowObject1Node')
    });
    this.opticalObjectsLayer.addChild(arrowObject1Node);

    // Second arrow object
    const arrowObject2Node = new ArrowObjectNode(scene.arrowObject2, scene.optic, sceneBoundsProperty,
      modelViewTransform, providedOptions.objectDragModeProperty, arrowWasDraggedProperty, {
      visibleProperty: visibleProperties.secondPointVisibleProperty,
      tandem: providedOptions.tandem.createTandem('arrowObject2Node')
    });
    this.opticalObjectsLayer.addChild(arrowObject2Node);

    // Image associated with the first arrow
    const arrowImage1Node = new ArrowImageNode(scene.arrowImage1,
      visibleProperties.virtualImageVisibleProperty, lightPropagationEnabledProperty,
      arrowObject1Node.visibleProperty, modelViewTransform, {
      tandem: providedOptions.tandem.createTandem('arrowImage1Node')
    });
    this.opticalImagesLayer.addChild(arrowImage1Node);

    // Image associated with the second arrow
    const arrowImage2Node = new ArrowImageNode(scene.arrowImage2,
      visibleProperties.virtualImageVisibleProperty, lightPropagationEnabledProperty,
      arrowObject2Node.visibleProperty, modelViewTransform, {
      tandem: providedOptions.tandem.createTandem('arrowImage2Node')
    });
    this.opticalImagesLayer.addChild(arrowImage2Node);

    // Real light rays associated with the first point-of-interest (the framed object's position).
    const realLightRays1Node = new RealLightRaysNode(scene.lightRays1, modelViewTransform, {
      stroke: GOColors.rays1StrokeProperty,
      visibleProperty: lightPropagationEnabledProperty
    });
    this.raysForegroundLayer.addChild(realLightRays1Node);

    // Virtual light rays associated with the first point-of-interest (the framed object's position).
    const virtualLightRays1Node = new VirtualLightRaysNode(scene.lightRays1, modelViewTransform, {
      stroke: GOColors.rays1StrokeProperty,
      visibleProperty: DerivedProperty.and([lightPropagationEnabledProperty, visibleProperties.virtualImageVisibleProperty])
    });
    this.raysForegroundLayer.addChild(virtualLightRays1Node);

    // Real light rays associated with the second point-of-interest (also on the framed object).
    const realLightRays2Node = new RealLightRaysNode(scene.lightRays2, modelViewTransform, {
      stroke: GOColors.rays2StrokeProperty,
      visibleProperty: DerivedProperty.and([
        visibleProperties.secondPointVisibleProperty,
        lightPropagationEnabledProperty
      ])
    });
    this.raysForegroundLayer.addChild(realLightRays2Node);

    // Virtual light rays associated with the second point-of-interest (also on the framed object).
    const virtualLightRays2Node = new VirtualLightRaysNode(scene.lightRays2, modelViewTransform, {
      stroke: GOColors.rays2StrokeProperty,
      visibleProperty: DerivedProperty.and([
        lightPropagationEnabledProperty,
        visibleProperties.virtualImageVisibleProperty,
        visibleProperties.secondPointVisibleProperty
      ])
    });
    this.raysForegroundLayer.addChild(virtualLightRays2Node);

    // Add things that are interactive in this scene to the focus traversal order.
    this.pdomOrder = [
      arrowObject1Node,
      arrowObject2Node
    ];

    // 'J' hotkey will cycle tools through these points, dynamically looking at left-to-right x coordinate.
    this.toolJumpPoints = [

      // from base class
      ...this.opticJumpPoints,

      // optical objects
      new ToolJumpPoint(scene.arrowObject1.positionProperty, arrowObject1Node.visibleProperty),
      new ToolJumpPoint(scene.arrowObject2.positionProperty, arrowObject2Node.visibleProperty),

      // optical images
      new ToolJumpPoint(scene.arrowImage1.positionProperty, arrowImage1Node.visibleProperty),
      new ToolJumpPoint(scene.arrowImage2.positionProperty, arrowImage2Node.visibleProperty)
    ];

    // Visibility for associates labels
    this.arrowObject1NodeVisibleProperty = arrowObject1Node.visibleProperty;
    this.arrowObject2NodeVisibleProperty = arrowObject2Node.visibleProperty;
    this.arrowImage1NodeVisibleProperty = arrowImage1Node.visibleProperty;
    this.arrowImage2NodeVisibleProperty = arrowImage2Node.visibleProperty;

    this.resetFrameObjectSceneNode = () => {
      arrowWasDraggedProperty.reset();
    };
  }

  public reset(): void {
    this.resetFrameObjectSceneNode();
  }
}

geometricOptics.register('ArrowSceneNode', ArrowSceneNode);