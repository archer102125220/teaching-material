// Copyright 2021-2023, University of Colorado Boulder

/**
 * ObjectDragModeToggleButton is the control used to change how the optical object can be dragged. It toggles between
 * 'freeDragging' and 'horizontalDragging', and turns red when dragging is constrained to horizontal.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import geometricOptics from '@/utils/geometric-optics/geometricOptics';
import lockSolidShape from '@/utils/sherpa/fontawesome-5/lockSolidShape';
import unlockSolidShape from '@/utils/sherpa/fontawesome-5/unlockSolidShape';
import { AlignBox, AlignGroup, HBox, type HBoxOptions, type NodeTranslationOptions, Path } from '@/utils/scenery/imports';
import CueingArrowsNode from '@/utils/geometric-optics/common/view/CueingArrowsNode';
import ButtonNode from '@/utils/sun/buttons/ButtonNode';
import PhetColorScheme from '@/utils/scenery-phet/PhetColorScheme';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import optionize, { combineOptions, type EmptySelfOptions } from '@/utils/phet-core/optionize';
import { type ObjectDragMode } from '@/utils/geometric-optics/common/view/ObjectDragMode';
import ToggleNode from '@/utils/sun/ToggleNode';
import RectangularToggleButton, { type RectangularToggleButtonOptions } from '@/utils/sun/buttons/RectangularToggleButton';
import Property from '@/utils/axon/Property';

const ARROWS_SCALE = 0.65;
const LOCK_SCALE = 0.045;
const UNLOCKED_FILL = 'black';
const LOCKED_FILL = PhetColorScheme.RED_COLORBLIND;

type SelfOptions = EmptySelfOptions;

type DragLockedButtonOptions = SelfOptions &
  PickRequired<RectangularToggleButtonOptions, 'tandem'> &
  NodeTranslationOptions;

export default class ObjectDragModeToggleButton extends RectangularToggleButton<ObjectDragMode> {

  /**
   * @param objectDragModeProperty - constrains how an optical object can be dragged
   * @param providedOptions
   */
  public constructor(objectDragModeProperty: Property<ObjectDragMode>, providedOptions?: DragLockedButtonOptions) {

    // To make both icons have the same effective size
    const alignBoxOptions = {
      group: new AlignGroup()
    };

    const hBoxOptions = {
      spacing: 6
    };

    // 4-way arrow to indicate free dragging
    const freeDraggingNode = new AlignBox(new HBox(combineOptions<HBoxOptions>({}, hBoxOptions, {
      children: [
        new CueingArrowsNode({
          direction: 'both',
          fill: UNLOCKED_FILL,
          stroke: null,
          scale: ARROWS_SCALE
        }),
        new Path(unlockSolidShape, {
          fill: UNLOCKED_FILL,
          scale: LOCK_SCALE
        })
      ]
    })), alignBoxOptions);

    // horizontal 2-way arrow to indicate horizontal dragging
    const horizontalDragNode = new AlignBox(new HBox(combineOptions<HBoxOptions>({}, hBoxOptions, {
      children: [
        new CueingArrowsNode({
          direction: 'horizontal',
          fill: LOCKED_FILL,
          stroke: null,
          scale: ARROWS_SCALE
        }),
        new Path(lockSolidShape, {
          fill: LOCKED_FILL,
          scale: LOCK_SCALE
        })
      ]
    })), alignBoxOptions);

    const options = optionize<DragLockedButtonOptions, SelfOptions, RectangularToggleButtonOptions>()({

      // RectangularToggleButtonOptions
      content: new ToggleNode<ObjectDragMode>(objectDragModeProperty, [
        { value: 'freeDragging', createNode: () => freeDraggingNode },
        { value: 'horizontalDragging', createNode: () => horizontalDragNode }
      ]),
      baseColor: 'transparent',
      disabledColor: 'transparent',
      buttonAppearanceStrategy: ButtonNode.FlatAppearanceStrategy,
      cursor: 'pointer',
      touchAreaXDilation: 5,
      touchAreaYDilation: 5,
      mouseAreaXDilation: 5,
      mouseAreaYDilation: 5,
      isDisposable: false,
      phetioEnabledPropertyInstrumented: false
    }, providedOptions);

    super(objectDragModeProperty, 'freeDragging', 'horizontalDragging', options);

    objectDragModeProperty.link(objectDragMode => {
      freeDraggingNode.visible = (objectDragMode === 'freeDragging');
      horizontalDragNode.visible = (objectDragMode === 'horizontalDragging');
    });
  }
}

geometricOptics.register('ObjectDragModeToggleButton', ObjectDragModeToggleButton);