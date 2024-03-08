// Copyright 2022-2023, University of Colorado Boulder

/**
 * GOToolDragListener is the DragListener for use with Geometric Optics tools.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/Bounds2';
import ModelViewTransform2 from '../../../../phetcommon/view/ModelViewTransform2';
import { DragListener, type DragListenerOptions, type PressedDragListener } from '../../../../scenery/imports';
import geometricOptics from '../../../geometricOptics';
import type TReadOnlyProperty from '../../../../axon/TReadOnlyProperty';
import optionize, { type EmptySelfOptions } from '../../../../phet-core/optionize';
import GOToolNode from './GOToolNode';
import Vector2 from '../../../../dot/Vector2';
import type PickRequired from '../../../../phet-core/types/PickRequired';
import type PickOptional from '../../../../phet-core/types/PickOptional';
import GOTool from '../../model/tools/GOTool';

type SelfOptions = EmptySelfOptions;

type GOToolDragListenerOptions = SelfOptions &
  PickRequired<DragListenerOptions<PressedDragListener>, 'tandem'> &
  PickOptional<DragListenerOptions<PressedDragListener>, 'offsetPosition'>;

export default class GOToolDragListener extends DragListener {

  /**
   * @param tool - model element
   * @param toolNode - view element
   * @param zoomTransformProperty - model-view transform that the user controls by zooming in/out
   * @param dragBoundsProperty - dragging is constrained to these bounds
   * @param shouldReturnToToolbox - given the pointer's position, determine whether tool should be returned to toolbox
   * @param providedOptions
   */
  public constructor(tool: GOTool,
    toolNode: GOToolNode,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    dragBoundsProperty: TReadOnlyProperty<Bounds2>,
    shouldReturnToToolbox: (pointerPoint: Vector2) => boolean,
    providedOptions: GOToolDragListenerOptions) {

    // options.end will get a null event if the drag is interrupted, which can definitely happen with multitouch.
    // So keep track of where the pointer is.
    let previousPointerPoint: Vector2 = Vector2.ZERO;

    const options = optionize<GOToolDragListenerOptions, SelfOptions, DragListenerOptions<PressedDragListener>>()({
      pressCursor: 'pointer',
      useInputListenerCursor: true,
      positionProperty: tool.positionProperty,
      dragBoundsProperty,
      transform: zoomTransformProperty,
      start: () => toolNode.moveToFront(),
      drag: event => {
        previousPointerPoint = event.pointer.point;
      },
      end: event => {
        const point = event ? event.pointer.point : previousPointerPoint;
        if (shouldReturnToToolbox(point)) {
          tool.isInToolboxProperty.value = true;
        }
      }
    }, providedOptions);

    super(options);
  }
}

geometricOptics.register('GOToolDragListener', GOToolDragListener);