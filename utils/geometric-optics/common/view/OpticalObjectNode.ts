// Copyright 2022-2023, University of Colorado Boulder

/**
 * OpticalObjectNode is the view base class for all optical objects.  It's primary responsibility is for cueing arrows,
 * which are common to all optical objects.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import { InteractiveHighlighting, Node, type NodeOptions } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import CueingArrowsNode from '@/utils/geometric-optics/common/view/CueingArrowsNode';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import type PickOptional from '@/utils/phet-core/types/PickOptional';
import { type ObjectDragMode } from '@/utils/geometric-optics/common/view/ObjectDragMode';
import OpticalObject from '@/utils/geometric-optics/common/model/OpticalObject';
import type TProperty from '@/utils/axon/TProperty';

type SelfOptions = EmptySelfOptions;

export type OpticalObjectNodeOptions = SelfOptions &
  PickRequired<NodeOptions, 'tandem'> &
  PickOptional<NodeOptions, 'visibleProperty'>;

export default class OpticalObjectNode extends InteractiveHighlighting(Node) {

  private readonly wasDraggedProperty: TProperty<boolean>;
  protected readonly cueingArrowsNode: CueingArrowsNode;

  /**
   * @param opticalObject - model element
   * @param objectDragModeProperty - constrains how an optical object can be dragged
   * @param wasDraggedProperty - was this optical object dragged?
   * @param providedOptions
   */
  protected constructor(opticalObject: OpticalObject,
    objectDragModeProperty: TReadOnlyProperty<ObjectDragMode>,
    wasDraggedProperty: TProperty<boolean>,
    providedOptions: OpticalObjectNodeOptions) {

    const options = optionize<OpticalObjectNodeOptions, SelfOptions, NodeOptions>()({

      // NodeOptions
      tagName: 'div',
      focusable: true,
      isDisposable: false,
      phetioVisiblePropertyInstrumented: false,
      phetioInputEnabledPropertyInstrumented: true
    }, providedOptions);

    super(options);

    this.wasDraggedProperty = wasDraggedProperty;

    this.cueingArrowsNode = new CueingArrowsNode({
      visibleProperty: CueingArrowsNode.createVisibleProperty(this.inputEnabledProperty, wasDraggedProperty)
    });
    this.addChild(this.cueingArrowsNode);

    // Update cursor and cueing arrows to reflect how this Node is draggable.
    objectDragModeProperty.link(objectDragMode => {
      if (objectDragMode === 'freeDragging') {
        this.cursor = 'pointer';
        this.cueingArrowsNode.setDirection('both');
      }
      else {

        // horizontal dragging
        this.cursor = 'ew-resize';
        this.cueingArrowsNode.setDirection('horizontal');
      }
    });

    this.addLinkedElement(opticalObject);
  }

  /**
   * Called by drag listeners when this Node is dragged.
   */
  protected drag(): void {
    this.wasDraggedProperty.value = true;
  }
}

geometricOptics.register('OpticalObjectNode', OpticalObjectNode);