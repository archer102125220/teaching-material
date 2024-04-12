// Copyright 2022-2023, University of Colorado Boulder

/**
 * GOToolKeyboardDragListener is the KeyboardDragListener for use with Geometric Optics tools.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '@/utils/dot/Bounds2';
import ModelViewTransform2 from '@/utils/phetcommon/view/ModelViewTransform2';
import { KeyboardDragListener, type KeyboardDragListenerOptions, KeyboardUtils } from '@/utils/scenery/imports';
import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import GOConstants from '@/utils/geometric-optics/common/GOConstants';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import { type EmptySelfOptions, optionize4 } from '@/utils/phet-core/optionize';
import GOToolNode from '@/utils/geometric-optics/common/view/tools/GOToolNode';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import GOTool from '@/utils/geometric-optics/common/model/tools/GOTool';

type SelfOptions = EmptySelfOptions;

type GOToolKeyboardDragListenerOptions = SelfOptions & PickRequired<KeyboardDragListenerOptions, 'tandem'>;

export default class GOToolKeyboardDragListener extends KeyboardDragListener {

  /**
   * @param tool - model element
   * @param toolNode - view element
   * @param zoomTransformProperty - model-view transform that the user controls by zooming in/out
   * @param dragBoundsProperty - dragging is constrained to these bounds
   * @param shouldReturnToToolbox - determine whether the tool should be returned to the toolbox
   * @param providedOptions
   */
  public constructor(tool: GOTool,
    toolNode: GOToolNode,
    zoomTransformProperty: TReadOnlyProperty<ModelViewTransform2>,
    dragBoundsProperty: TReadOnlyProperty<Bounds2>,
    shouldReturnToToolbox: () => boolean,
    providedOptions: GOToolKeyboardDragListenerOptions) {

    // Return the tool to the toolbox, and move focus to its icon in the toolbox.
    const returnToToolbox = () => {
      tool.isInToolboxProperty.value = true;
      toolNode.icon.focus();
    };

    const options = optionize4<GOToolKeyboardDragListenerOptions, SelfOptions, KeyboardDragListenerOptions>()(
      {}, GOConstants.KEYBOARD_DRAG_LISTENER_OPTIONS, {

      // KeyboardDragListenerOptions
      positionProperty: tool.positionProperty,
      dragBoundsProperty,
      transform: zoomTransformProperty,
      start: () => toolNode.moveToFront(),
      end: () => {
        if (shouldReturnToToolbox()) {
          returnToToolbox();
        }
      }
    }, providedOptions);

    super(options);

    // Escape returns the tool to the toolbox.
    this.addHotkey({
      keys: [KeyboardUtils.KEY_ESCAPE],
      callback: () => {
        window.phet.log && window.phet.log('hotkey ESCAPE');
        returnToToolbox();
      }
    });
    this.addHotkey({
      keys: [KeyboardUtils.KEY_J],
      callback: () => {
        window.phet.log && window.phet.log('hotkey J');
        toolNode.jumpToPoint();
      }
    });
  }
}

geometricOptics.register('GOToolKeyboardDragListener', GOToolKeyboardDragListener);