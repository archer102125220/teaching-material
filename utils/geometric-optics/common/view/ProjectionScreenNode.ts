// Copyright 2021-2023, University of Colorado Boulder

/**
 * ProjectionScreenNode is the view of the projection screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import DerivedProperty from '@/utils/axon/DerivedProperty';
import Bounds2 from '@/utils/dot/Bounds2';
import Vector2 from '@/utils/dot/Vector2';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import { Circle, Color, DragListener, HighlightFromNode, Image, InteractiveHighlighting, KeyboardDragListener, type KeyboardDragListenerOptions, Line, Node, type NodeOptions, Path } from '@/utils/scenery/imports';
import projectionScreenBottom_png from '@/assets/images/geometric-optics/projectionScreenBottom_png';
import projectionScreenTop_png from '@/assets/images/geometric-optics/projectionScreenTop_png';
import GOColors from '@/utils/geometric-optics/common/GOColors';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import ProjectionScreen from '@/utils/geometric-optics/common/model/ProjectionScreen';
import CueingArrowsNode from '@/utils/geometric-optics/common/view/CueingArrowsNode';
import GOQueryParameters from '@/utils/geometric-optics/common/GOQueryParameters';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import OriginNode from '@/utils/geometric-optics/common/view/OriginNode';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import BooleanProperty from '@/utils/axon/BooleanProperty';
import optionize, { combineOptions, type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import isSettingPhetioStateProperty from '@/utils/tandem/isSettingPhetioStateProperty';

type SelfOptions = EmptySelfOptions;

type ProjectionScreenNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class ProjectionScreenNode extends InteractiveHighlighting(Node) {

  // Resets things that are specific to this class.
  private readonly resetProjectionScreenNode: () => void;

  /**
   * @param projectionScreen
   * @param opticPositionProperty
   * @param sceneBoundsProperty - bounds for the scene, in model coordinates
   * @param modelViewTransform
   * @param providedOptions
   */
  public constructor(projectionScreen: ProjectionScreen,
    opticPositionProperty: TReadOnlyProperty<Vector2>,
    sceneBoundsProperty: TReadOnlyProperty<Bounds2>,
    modelViewTransform: ModelViewTransform2,
    providedOptions: ProjectionScreenNodeOptions) {

    const options = optionize<ProjectionScreenNodeOptions, SelfOptions, NodeOptions>()({

      // NodeOptions
      tagName: 'div',
      focusable: true,
      isDisposable: false,
      phetioInputEnabledPropertyInstrumented: true
    }, providedOptions);

    super(options);

    // The screen part of the projection screen, drawn in perspective.
    const screenNode = new Path(modelViewTransform.modelToViewShape(projectionScreen.screenShape), {
      fill: GOColors.projectionScreenFillProperty,
      stroke: window.phet.chipper.queryParameters.dev ? 'red' : GOColors.projectionScreenStrokeProperty,
      lineWidth: 2,

      // projectionScreen.positionProperty is at the center of screenNode
      centerX: 0,
      centerY: 0
    });

    // Bar across the top edge of the screen. Aka the 'screen case', because the screen retracts into this part.
    const topBarNode = new Image(projectionScreenTop_png, {
      scale: 0.5,
      // offsets were adjusted empirically to align Image with screenNode
      left: screenNode.left - 14,
      bottom: screenNode.top + 25
    });

    // Bar across the bottom edge of the screen
    const bottomBarNode = new Image(projectionScreenBottom_png, {
      scale: 0.5,
      // offsets were adjusted empirically to align Image with screenNode
      right: screenNode.right + 9,
      bottom: screenNode.bottom + 18
    });

    // The pull string, attached to the bottom bar
    const pullStringNode = new Line(0, 0, 0, 50, {
      stroke: GOColors.projectionScreenStrokeProperty,
      lineWidth: 3,
      centerX: screenNode.centerX,
      top: bottomBarNode.top
    });

    // The knob attached to the pull string
    const knobNode = new Circle(5, {
      stroke: GOColors.projectionScreenStrokeProperty,
      fill: Color.grayColor(180),
      center: pullStringNode.centerBottom
    });

    const parentNode = new Node({
      children: [pullStringNode, knobNode, topBarNode, bottomBarNode, screenNode]
    });
    this.addChild(parentNode);
    this.setFocusHighlight(new HighlightFromNode(parentNode));

    const wasDraggedProperty = new BooleanProperty(false, {
      tandem: options.tandem.createTandem('wasDraggedProperty'),
      phetioReadOnly: true
    });

    const cueingArrowsNode = new CueingArrowsNode({
      left: parentNode.right,
      centerY: parentNode.centerY,
      visibleProperty: CueingArrowsNode.createVisibleProperty(this.inputEnabledProperty, wasDraggedProperty)
    });
    this.addChild(cueingArrowsNode);

    // Red dot at the origin
    if (GOQueryParameters.debugOrigins) {
      this.addChild(new OriginNode());
    }

    projectionScreen.positionProperty.link(position => {
      this.translation = modelViewTransform.modelToViewPosition(position);
    });

    const modelScreenWidth = modelViewTransform.viewToModelDeltaX(screenNode.width);
    const modelScreenHeight = Math.abs(modelViewTransform.viewToModelDeltaY(screenNode.height));

    // Drag bounds, in model coordinates - within model bounds, and right of the optic.
    const dragBoundsProperty = new DerivedProperty(
      [sceneBoundsProperty, opticPositionProperty],
      (sceneBounds, opticPosition) =>
        new Bounds2(
          opticPosition.x + GOConstants.MIN_DISTANCE_FROM_OPTIC_TO_PROJECTION_SCREEN,
          sceneBounds.minY + modelScreenHeight / 2,
          sceneBounds.maxX - modelScreenWidth / 2,
          sceneBounds.maxY - modelScreenHeight / 2
        ), {

      // Reentrant because dragBounds depends on positionProperty, and its listener modifies positionProperty to
      // keep objects inside dragBounds. See https://github.com/phetsims/geometric-optics/issues/487
      reentrant: true
    });

    // Keep the projection screen within drag bounds.
    dragBoundsProperty.link(dragBounds => {

      // Do not disturb positionProperty when restoring PhET-iO state.
      if (!isSettingPhetioStateProperty.value) {
        projectionScreen.positionProperty.value = dragBounds.closestPointTo(projectionScreen.positionProperty.value);
      }
    });

    // Drag action that is common to DragListener and KeyboardDragListener
    const drag = () => {
      wasDraggedProperty.value = true;
    };

    this.addInputListener(new DragListener({
      pressCursor: 'pointer',
      useInputListenerCursor: true,
      positionProperty: projectionScreen.positionProperty,
      dragBoundsProperty,
      transform: modelViewTransform,
      drag,
      tandem: options.tandem.createTandem('dragListener')
    }));

    const keyboardDragListener = new KeyboardDragListener(
      combineOptions<KeyboardDragListenerOptions>({}, GOConstants.KEYBOARD_DRAG_LISTENER_OPTIONS, {
        positionProperty: projectionScreen.positionProperty,
        dragBoundsProperty,
        drag,
        transform: modelViewTransform,
        tandem: options.tandem.createTandem('keyboardDragListener')
      }));
    this.addInputListener(keyboardDragListener);

    this.addLinkedElement(projectionScreen);

    this.resetProjectionScreenNode = () => {
      wasDraggedProperty.reset();
    };
  }

  public reset(): void {
    this.resetProjectionScreenNode();
  }
}

geometricOptics.register('ProjectionScreenNode', ProjectionScreenNode);