// Copyright 2021-2024, University of Colorado Boulder

/**
 * HTMLImageElementObjectNode is the view of an object that uses an HTMLImageElement for its visual representation.
 * Framed objects and light objects are subclasses of this object type.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Martin Veillette
 */

import DerivedProperty from '@/utils/axon/DerivedProperty';
import Bounds2 from '@/utils/dot/Bounds2';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import { DragListener, HighlightFromNode, Image, KeyboardDragListener, type KeyboardDragListenerOptions, Node } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import Vector2 from '@/utils/dot/Vector2';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import { combineOptions } from '@/utils/phet-core/optionize';
import HTMLImageElementObject from '@/utils/geometric-optics/common/model/HTMLImageElementObject';
import type TProperty from '@/utils/axon/TProperty';
import stepTimer from '@/utils/axon/stepTimer';
import { type ObjectDragMode } from '@/utils/geometric-optics/common/view/ObjectDragMode';
import OpticalObjectNode, { type OpticalObjectNodeOptions } from '@/utils/geometric-optics/common/view/OpticalObjectNode';
import Multilink from '@/utils/axon/Multilink';
import isSettingPhetioStateProperty from '@/utils/tandem/isSettingPhetioStateProperty';

export type HTMLImageElementObjectNodeOptions = OpticalObjectNodeOptions;

export default class HTMLImageElementObjectNode extends OpticalObjectNode {

  /**
   * @param htmlImageElementObject - model element
   * @param sceneBoundsProperty - bounds for the scene, in model coordinates
   * @param opticPositionProperty - position of the optic
   * @param modelViewTransform
   * @param objectDragModeProperty - constrains how the optical object can be dragged
   * @param wasDraggedProperty - was this optical object dragged?
   * @param providedOptions
   */
  public constructor(htmlImageElementObject: HTMLImageElementObject,
    sceneBoundsProperty: TReadOnlyProperty<Bounds2>,
    opticPositionProperty: TReadOnlyProperty<Vector2>,
    modelViewTransform: ModelViewTransform2,
    objectDragModeProperty: TReadOnlyProperty<ObjectDragMode>,
    wasDraggedProperty: TProperty<boolean>,
    providedOptions: HTMLImageElementObjectNodeOptions) {

    super(htmlImageElementObject, objectDragModeProperty, wasDraggedProperty, providedOptions);

    const imageNode = new Image(htmlImageElementObject.htmlImageElementProperty.value);

    // Wrap imageNode in a Node. We need to scale imageNode, but do not want its focus highlight to scale.
    const wrappedImageNode = new Node({
      children: [imageNode]
    });
    this.addChild(wrappedImageNode);
    this.setFocusHighlight(new HighlightFromNode(wrappedImageNode));

    const updateScale = () => {
      const sceneBounds = htmlImageElementObject.boundsProperty.value;
      const viewBounds = modelViewTransform.modelToViewBounds(sceneBounds);
      const scaleX = (viewBounds.width / imageNode.width) || GOConstants.MIN_SCALE; // prevent zero scale
      const scaleY = (viewBounds.height / imageNode.height) || GOConstants.MIN_SCALE; // prevent zero scale
      imageNode.scale(scaleX, scaleY);
    };

    // Change the PNG image.
    htmlImageElementObject.htmlImageElementProperty.link(htmlImageElement => {
      imageNode.image = htmlImageElement;
      updateScale();
    });

    // Translate and scale
    htmlImageElementObject.boundsProperty.link(bounds => {
      this.translation = modelViewTransform.modelToViewBounds(bounds).leftTop;
      updateScale();
    });

    // Drag bounds, in model coordinates. Keep the full object within the model bounds and to the left of the optic.
    // Use Math.floor herein to avoid floating-point rounding errors that result in unwanted changes and additional
    // reentrant Properties, see https://github.com/phetsims/geometric-optics/issues/317.
    const dragBoundsProperty = new DerivedProperty(
      [htmlImageElementObject.boundsProperty, sceneBoundsProperty, objectDragModeProperty, htmlImageElementObject.positionProperty, opticPositionProperty],
      (htmlImageElementObjectBounds, sceneBounds, objectDragMode, htmlImageElementObjectPosition, opticPosition) => {

        const maxX = Math.floor(opticPosition.x - GOConstants.MIN_DISTANCE_FROM_OBJECT_TO_OPTIC);

        // Added Math.min to resolve https://github.com/phetsims/geometric-optics/issues/491. When running with
        // ?listenerOrderRange, we pass through an intermediate state where minX is invalid, and actually > maxX.
        const minX = Math.min(maxX - 1, Math.floor(sceneBounds.minX + (htmlImageElementObjectPosition.x - htmlImageElementObjectBounds.minX)));

        let minY: number;
        let maxY: number;
        if (objectDragMode === 'freeDragging') {

          // free dragging
          minY = Math.floor(sceneBounds.minY + (htmlImageElementObjectPosition.y - htmlImageElementObjectBounds.minY));
          maxY = Math.floor(sceneBounds.maxY - (htmlImageElementObjectBounds.maxY - htmlImageElementObjectPosition.y));
        }
        else {

          // horizontal dragging, locked to the object's current y position
          minY = htmlImageElementObjectPosition.y;
          maxY = minY;
        }
        return new Bounds2(minX, minY, maxX, maxY);
      }, {

      // Reentrant because dragBounds depends on positionProperty, and its listener modifies positionProperty to
      // keep objects inside dragBounds. See https://github.com/phetsims/geometric-optics/issues/487
      reentrant: true
    });

    // Keep the object inside the drag bounds. This is done in the next animation frame to prevent problems with
    // reentrant Properties, as in https://github.com/phetsims/geometric-optics/issues/325.  dragBoundsProperty is
    // derived from htmlImageElementObject.boundsProperty, and will change htmlImageElementObject.boundsProperty by
    // setting htmlImageElementObject.positionProperty.
    dragBoundsProperty.link(dragBounds => {

      // Do not disturb positionProperty when restoring PhET-iO state.
      // See https://github.com/phetsims/geometric-optics/issues/469
      if (!isSettingPhetioStateProperty.value) {
        const closestPoint = dragBounds.closestPointTo(htmlImageElementObject.positionProperty.value);
        if (!closestPoint.equals(htmlImageElementObject.positionProperty.value)) {
          stepTimer.setTimeout(() => {
            htmlImageElementObject.positionProperty.value = closestPoint;
          }, 0);
        }
      }
    });

    const dragListener = new DragListener({
      positionProperty: htmlImageElementObject.positionProperty,
      dragBoundsProperty,
      transform: modelViewTransform,
      useParentOffset: true,
      drag: () => this.drag(),
      tandem: providedOptions.tandem.createTandem('dragListener')
    });
    this.addInputListener(dragListener);

    const keyboardDragListener = new KeyboardDragListener(
      combineOptions<KeyboardDragListenerOptions>({}, GOConstants.KEYBOARD_DRAG_LISTENER_OPTIONS, {
        positionProperty: htmlImageElementObject.positionProperty,
        dragBoundsProperty,
        transform: modelViewTransform,
        drag: () => this.drag(),
        tandem: providedOptions.tandem.createTandem('keyboardDragListener')
      }));
    this.addInputListener(keyboardDragListener);

    // Keep cueing arrows next to the framed object.
    Multilink.multilink([wrappedImageNode.boundsProperty, this.cueingArrowsNode.boundsProperty],
      (wrappedImageNodeBounds: Bounds2, cueingArrowsNodeBounds: Bounds2) => {
        this.cueingArrowsNode.right = wrappedImageNode.left - 5;
        this.cueingArrowsNode.centerY = wrappedImageNode.centerY;
      });
  }
}

geometricOptics.register('HTMLImageElementObjectNode', HTMLImageElementObjectNode);