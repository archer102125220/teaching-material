// Copyright 2022-2023, University of Colorado Boulder

/**
 * ArrowObjectNode is the visual representation of an arrow object.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type TReadOnlyProperty from '../../../axon/TReadOnlyProperty';
import Bounds2 from '../../../dot/Bounds2';
import ModelViewTransform2 from '../../../phetcommon/view/ModelViewTransform2';
import { DragListener, HighlightFromNode, KeyboardDragListener, type KeyboardDragListenerOptions } from '../../../scenery/imports';
import geometricOptics from '../../geometricOptics';
import ArrowObject from '../model/ArrowObject';
import Optic from '../model/Optic';
import GOConstants from '../GOConstants';
import ArrowNode, { type ArrowNodeOptions } from '../../../scenery-phet/ArrowNode';
import DerivedProperty from '../../../axon/DerivedProperty';
import Vector2 from '../../../dot/Vector2';
import { combineOptions } from '../../../phet-core/optionize';
import { type ObjectDragMode } from './ObjectDragMode';
import OpticalObjectNode, { type OpticalObjectNodeOptions } from './OpticalObjectNode';
import type TProperty from '../../../axon/TProperty';
import Multilink from '../../../axon/Multilink';
import isSettingPhetioStateProperty from '../../../tandem/isSettingPhetioStateProperty';

const SNAP_TO_MIN_MAGNITUDE = 20; // cm

type ArrowObjectNodeOptions = OpticalObjectNodeOptions;

export default class ArrowObjectNode extends OpticalObjectNode {

  /**
   * @param arrowObject - model element
   * @param optic - the associated optic
   * @param sceneBoundsProperty - bounds for the scene, in model coordinates
   * @param modelViewTransform
   * @param objectDragModeProperty - constrains how the object can be dragged
   * @param wasDraggedProperty - was any ArrowObjectNode dragged?
   * @param providedOptions
   */
  public constructor(arrowObject: ArrowObject,
    optic: Optic,
    sceneBoundsProperty: TReadOnlyProperty<Bounds2>,
    modelViewTransform: ModelViewTransform2,
    objectDragModeProperty: TReadOnlyProperty<ObjectDragMode>,
    wasDraggedProperty: TProperty<boolean>,
    providedOptions: ArrowObjectNodeOptions) {

    super(arrowObject, objectDragModeProperty, wasDraggedProperty, providedOptions);

    const arrowNode = new ArrowNode(0, 0, 0, 1,
      combineOptions<ArrowNodeOptions>({}, GOConstants.ARROW_NODE_OPTIONS, {
        fill: arrowObject.fill,
        stroke: null
      }));
    this.addChild(arrowNode);
    this.setFocusHighlight(new HighlightFromNode(arrowNode));

    Multilink.multilink([arrowObject.positionProperty, optic.positionProperty],
      (arrowObjectPosition, opticPosition) => {
        const tipPosition = modelViewTransform.modelToViewPosition(arrowObjectPosition);
        let tailY = modelViewTransform.modelToViewY(opticPosition.y);
        if (tailY === tipPosition.y) {
          tailY += GOConstants.MIN_MAGNITUDE; // see https://github.com/phetsims/geometric-optics/issues/306
        }
        arrowNode.setTailAndTip(tipPosition.x, tailY, tipPosition.x, tipPosition.y);
        arrowNode.mouseArea = arrowNode.localBounds.dilated(3);
        arrowNode.touchArea = arrowNode.localBounds.dilated(10);
      });

    const dragBoundsProperty = new DerivedProperty(
      [sceneBoundsProperty, objectDragModeProperty, optic.positionProperty, arrowObject.positionProperty],
      (sceneBounds, objectDragMode, opticPosition, arrowObjectPosition) => {

        const minX = sceneBounds.minX + modelViewTransform.viewToModelDeltaX(arrowNode.width) / 2;
        const maxX = opticPosition.x - GOConstants.MIN_DISTANCE_FROM_OBJECT_TO_OPTIC;
        let minY: number;
        let maxY: number;

        if (objectDragMode === 'freeDragging') {

          // Constrain to the smaller of sceneBounds or MAX_MAGNITUDE. See https://github.com/phetsims/geometric-optics/issues/429
          minY = Math.max(sceneBounds.minY, opticPosition.x - ArrowObject.MAX_MAGNITUDE);
          maxY = Math.min(sceneBounds.maxY, opticPosition.x + ArrowObject.MAX_MAGNITUDE);
        }
        else {

          // horizontal dragging, locked to the object's current y position
          minY = arrowObjectPosition.y;
          maxY = arrowObjectPosition.y;
        }
        return new Bounds2(minX, minY, maxX, maxY);
      }, {

      // Reentrant because dragBounds depends on positionProperty, and its listener modifies positionProperty to
      // keep objects inside dragBounds. See https://github.com/phetsims/geometric-optics/issues/487
      reentrant: true
    });

    // Keep the arrow inside the drag bounds.
    dragBoundsProperty.link(dragBounds => {

      // Do not disturb positionProperty when restoring PhET-iO state.
      if (!isSettingPhetioStateProperty.value) {
        arrowObject.positionProperty.value = dragBounds.closestPointTo(arrowObject.positionProperty.value);
      }
    });

    // When mouse/touch dragging is completed, check the magnitude of the arrow. If it is less than the minimum
    // magnitude, snap it to the minimum length. Optionally invert the sign, to facilitate keyboard dragging.
    const end = (sign: 1 | -1) => {
      const arrowLength = arrowObject.positionProperty.value.y - optic.positionProperty.value.y;
      if (Math.abs(arrowLength) < SNAP_TO_MIN_MAGNITUDE) {
        const arrowSign = (arrowLength >= 0) ? 1 : -1; // do not use Math.sign, because Math.sign(0) = 0
        const x = arrowObject.positionProperty.value.x;
        const y = sign * arrowSign * SNAP_TO_MIN_MAGNITUDE;
        arrowObject.positionProperty.value = new Vector2(x, y);
      }
    };

    const dragListener = new DragListener({
      positionProperty: arrowObject.positionProperty,
      dragBoundsProperty,
      transform: modelViewTransform,
      useParentOffset: true,
      drag: () => this.drag(),
      end: () => end(1),
      tandem: providedOptions.tandem.createTandem('dragListener')
    });
    this.addInputListener(dragListener);

    const keyboardDragListener = new KeyboardDragListener(
      combineOptions<KeyboardDragListenerOptions>({}, GOConstants.KEYBOARD_DRAG_LISTENER_OPTIONS, {
        positionProperty: arrowObject.positionProperty,
        dragBoundsProperty,
        transform: modelViewTransform,
        drag: () => this.drag(),
        end: () => end(-1),
        tandem: providedOptions.tandem.createTandem('keyboardDragListener')
      }));
    this.addInputListener(keyboardDragListener);

    // Keep cueing arrows next to the arrow.
    Multilink.multilink([arrowNode.boundsProperty, this.cueingArrowsNode.boundsProperty],
      (arrowNodeBounds: Bounds2, cueingArrowsNodeBounds: Bounds2) => {
        this.cueingArrowsNode.right = arrowNodeBounds.left - 5;
        this.cueingArrowsNode.centerY = arrowNodeBounds.centerY;
      });
  }
}

geometricOptics.register('ArrowObjectNode', ArrowObjectNode);