// Copyright 2023, University of Colorado Boulder

/**
 * MoveDraggableItemsKeyboardHelpSection is the keyboard-help section that describes 2-d draggable items.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import KeyboardHelpSection from '@/utils/scenery-phet/keyboard/help/KeyboardHelpSection';
import KeyboardHelpSectionRow from '@/utils/scenery-phet/keyboard/help/KeyboardHelpSectionRow';
import SceneryPhetStrings from '@/utils/scenery-phet/SceneryPhetStrings';
import KeyboardHelpIconFactory from '@/utils/scenery-phet/keyboard/help/KeyboardHelpIconFactory';

/**
 * MoveDraggableItemsKeyboardHelpSection is the keyboard-help section that describes 2-d draggable items.
 *
 */
class MoveDraggableItemsKeyboardHelpSection extends KeyboardHelpSection {

  public constructor() {

    // arrows or WASD
    const wasdOrArrowsIcon = KeyboardHelpIconFactory.arrowOrWasdKeysRowIcon();
    const normalRow = KeyboardHelpSectionRow.labelWithIcon(SceneryPhetStrings.keyboardHelpDialog.moveStringProperty,
      wasdOrArrowsIcon, {
      labelInnerContent: SceneryPhetStrings.a11y.keyboardHelpDialog.draggableItems.moveDescriptionStringProperty
    });

    // Shift+arrows or Shift+WASD
    const arrowKeysIcon = KeyboardHelpIconFactory.arrowKeysRowIcon();
    const wasdKeysIcon = KeyboardHelpIconFactory.wasdRowIcon();
    const shiftPlusWasdKeysIcon = KeyboardHelpIconFactory.shiftPlusIcon(wasdKeysIcon);
    const shiftPluArrowKeysIcon = KeyboardHelpIconFactory.shiftPlusIcon(arrowKeysIcon);
    const slowerRow = KeyboardHelpSectionRow.labelWithIconList(SceneryPhetStrings.keyboardHelpDialog.moveSlowerStringProperty, [
      shiftPluArrowKeysIcon,
      shiftPlusWasdKeysIcon
    ], {
      labelInnerContent: SceneryPhetStrings.a11y.keyboardHelpDialog.draggableItems.moveSlowerDescriptionStringProperty
    });

    super(SceneryPhetStrings.keyboardHelpDialog.moveDraggableItemsStringProperty, [normalRow, slowerRow]);
  }
}

sceneryPhet.register('MoveDraggableItemsKeyboardHelpSection', MoveDraggableItemsKeyboardHelpSection);
export default MoveDraggableItemsKeyboardHelpSection;