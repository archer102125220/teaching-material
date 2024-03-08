// Copyright 2022, University of Colorado Boulder

/**
 * FramedSceneNode is the view of the 'Framed' scene, which has a framed object and image.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import ModelViewTransform2 from '../../../phetcommon/view/ModelViewTransform2';
import geometricOptics from '../../geometricOptics';
import FramedScene from '../model/FramedScene';
import FramedImageNode from './FramedImageNode';
import VisibleProperties from './VisibleProperties';
import FramedObjectNode from './FramedObjectNode';
import Bounds2 from '../../../dot/Bounds2';
import type TReadOnlyProperty from '../../../axon/TReadOnlyProperty';
import SecondPointNode from './SecondPointNode';
import { type RaysType } from '../model/RaysType';
import GOColors from '../GOColors';
import RealLightRaysNode from './RealLightRaysNode';
import RealLightRaysForegroundNode from './RealLightRaysForegroundNode';
import OpticalAxisForegroundNode from './OpticalAxisForegroundNode';
import VirtualLightRaysNode from './VirtualLightRaysNode';
import DerivedProperty from '../../../axon/DerivedProperty';
import GOSceneNode, { type GOSceneNodeOptions } from './GOSceneNode';
import BooleanProperty from '../../../axon/BooleanProperty';
import ToolJumpPoint from '../model/tools/ToolJumpPoint';
import { type ObjectDragMode } from './ObjectDragMode';

type SelfOptions = {
  objectDragModeProperty: TReadOnlyProperty<ObjectDragMode>;
};

type FramedObjectSceneNodeOptions = SelfOptions & GOSceneNodeOptions;

export default class FramedSceneNode extends GOSceneNode {

  // See GOSceneNode
  public readonly toolJumpPoints: ToolJumpPoint[];

  public readonly scene: FramedScene;

  // Visibility of things that have labels, intended to be used to control the visibility of associated labels.
  public readonly framedObjectNodeVisibleProperty: TReadOnlyProperty<boolean>;
  public readonly framedImageNodeVisibleProperty: TReadOnlyProperty<boolean>;

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
  public constructor(scene: FramedScene,
    visibleProperties: VisibleProperties,
    modelViewTransform: ModelViewTransform2,
    modelVisibleBoundsProperty: TReadOnlyProperty<Bounds2>,
    sceneBoundsProperty: TReadOnlyProperty<Bounds2>,
    raysTypeProperty: TReadOnlyProperty<RaysType>,
    lightPropagationEnabledProperty: TReadOnlyProperty<boolean>,
    providedOptions: FramedObjectSceneNodeOptions) {

    super(scene, visibleProperties, modelViewTransform, modelVisibleBoundsProperty, sceneBoundsProperty, raysTypeProperty, providedOptions);

    this.scene = scene;

    const framedObjectWasDraggedProperty = new BooleanProperty(false, {
      tandem: providedOptions.tandem.createTandem('framedObjectWasDraggedProperty'),
      phetioReadOnly: true,
      phetioDocumentation: 'Was the framed object dragged?'
    });

    // Framed object
    const framedObjectNode = new FramedObjectNode(scene.framedObject, sceneBoundsProperty, scene.optic.positionProperty,
      modelViewTransform, providedOptions.objectDragModeProperty, framedObjectWasDraggedProperty, {
      tandem: providedOptions.tandem.createTandem('framedObjectNode')
    });
    this.opticalObjectsLayer.addChild(framedObjectNode);

    const secondPointWasDraggedProperty = new BooleanProperty(false, {
      tandem: providedOptions.tandem.createTandem('secondPointWasDraggedProperty'),
      phetioReadOnly: true,
      phetioDocumentation: 'Was the second point on the framed object dragged?'
    });

    // Second point-of-interest on the framed object
    const secondPointNode = new SecondPointNode(scene.secondPoint, modelViewTransform, secondPointWasDraggedProperty, {
      visibleProperty: visibleProperties.secondPointVisibleProperty,
      tandem: providedOptions.tandem.createTandem('secondPointNode'),
      phetioDocumentation: 'second point-of-interest on the framed object'
    });
    this.opticalObjectsLayer.addChild(secondPointNode);

    // Both points of interest are on the same Object, so we only render one Image. If we rendered 2 Images,
    // their opacities would combine.
    const framedImageNode = new FramedImageNode(scene.framedImage1, scene.optic,
      visibleProperties.virtualImageVisibleProperty, lightPropagationEnabledProperty,
      framedObjectNode.visibleProperty, modelViewTransform, {
      tandem: providedOptions.tandem.createTandem('framedImageNode')
    });
    this.opticalImagesLayer.addChild(framedImageNode);

    // The parts of the optical axis that appear to be in front of framed objects and images.
    const opticalAxisForegroundNode = new OpticalAxisForegroundNode(
      scene.optic.positionProperty,
      modelVisibleBoundsProperty,
      modelViewTransform,
      scene.framedObject.positionProperty,
      framedObjectNode,
      scene.framedImage1.positionProperty,
      framedImageNode,
      scene.lightRays1.raysProcessedEmitter, {
      visibleProperty: visibleProperties.opticalAxisVisibleProperty
    });
    this.opticalAxisForegroundLayer.addChild(opticalAxisForegroundNode);

    // Real light rays associated with the first point-of-interest (the framed object's position).
    // There are foreground and background components to these rays, to handle occlusion of the rays by the
    // 3D perspective of the framed object and image.
    const realLightRays1Options = {
      stroke: GOColors.rays1StrokeProperty,
      visibleProperty: lightPropagationEnabledProperty
    };
    const realLightRays1Node = new RealLightRaysNode(scene.lightRays1, modelViewTransform, realLightRays1Options);
    this.raysBackgroundLayer.addChild(realLightRays1Node);
    const realLightRays1ForegroundNode = new RealLightRaysForegroundNode(scene.lightRays1, modelViewTransform,
      modelVisibleBoundsProperty, scene.optic.positionProperty, scene.framedImage1.positionProperty,
      scene.framedImage1.opticalImageTypeProperty, realLightRays1Options);
    this.raysForegroundLayer.addChild(realLightRays1ForegroundNode);

    // Virtual light rays associated with the first point-of-interest (the framed object's position).
    const virtualLightRays1Node = new VirtualLightRaysNode(scene.lightRays1, modelViewTransform, {
      stroke: GOColors.rays1StrokeProperty,
      visibleProperty: DerivedProperty.and([lightPropagationEnabledProperty, visibleProperties.virtualImageVisibleProperty])
    });
    this.raysForegroundLayer.addChild(virtualLightRays1Node);

    // Real light rays associated with the second point-of-interest (also on the framed object).
    // There are foreground and background components to these rays, to handle occlusion of the rays by the
    // 3D perspective of the framed object and image.
    const realLightRays2Options = {
      stroke: GOColors.rays2StrokeProperty,
      visibleProperty: DerivedProperty.and([lightPropagationEnabledProperty, visibleProperties.secondPointVisibleProperty])
    };
    const realLightRays2Node = new RealLightRaysNode(scene.lightRays2, modelViewTransform, realLightRays2Options);
    this.raysBackgroundLayer.addChild(realLightRays2Node);
    const realLightRays2ForegroundNode = new RealLightRaysForegroundNode(scene.lightRays2, modelViewTransform,
      modelVisibleBoundsProperty, scene.optic.positionProperty, scene.framedImage2.positionProperty,
      scene.framedImage2.opticalImageTypeProperty, realLightRays2Options);
    this.raysForegroundLayer.addChild(realLightRays2ForegroundNode);

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
      framedObjectNode,
      secondPointNode
    ];

    // 'J' hotkey will cycle tools through these points, dynamically looking at left-to-right x coordinate.
    this.toolJumpPoints = [

      // from base class
      ...this.opticJumpPoints,

      // optical objects
      new ToolJumpPoint(scene.framedObject.positionProperty, framedObjectNode.visibleProperty),
      new ToolJumpPoint(scene.secondPoint.positionProperty, secondPointNode.visibleProperty),

      // optical images
      new ToolJumpPoint(scene.framedImage1.positionProperty, framedImageNode.visibleProperty),
      new ToolJumpPoint(scene.framedImage2.positionProperty,
        DerivedProperty.and([framedImageNode.visibleProperty, secondPointNode.visibleProperty]))
    ];

    // Visibility for associates labels
    this.framedObjectNodeVisibleProperty = framedObjectNode.visibleProperty;
    this.framedImageNodeVisibleProperty = framedImageNode.visibleProperty;

    this.resetFrameObjectSceneNode = () => {
      framedObjectWasDraggedProperty.reset();
      secondPointWasDraggedProperty.reset();
    };
  }

  public reset(): void {
    this.resetFrameObjectSceneNode();
  }
}

geometricOptics.register('FramedSceneNode', FramedSceneNode);