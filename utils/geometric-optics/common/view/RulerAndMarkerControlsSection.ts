// Copyright 2023, University of Colorado Boulder

/**
 * RulerAndMarkerControlsSection is the keyboard-help section that describes the hotkeys related to the tools.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import KeyboardHelpSection from '@/utils/scenery-phet/keyboard/help/KeyboardHelpSection';
import TextKeyNode from '@/utils/scenery-phet/keyboard/TextKeyNode';
import KeyboardHelpIconFactory from '@/utils/scenery-phet/keyboard/help/KeyboardHelpIconFactory';
import KeyboardHelpSectionRow from '@/utils/scenery-phet/keyboard/help/KeyboardHelpSectionRow';
import GeometricOpticsStrings from '@/utils/geometric-optics/GeometricOpticsStrings';;

export class RulerAndMarkerControlsSection extends KeyboardHelpSection {

  public constructor() {

    // Keys used in this KeyboardHelpSection. They need to be disposed.
    const spaceKeyNode = TextKeyNode.space();
    const enterKeyNode = TextKeyNode.enter();
    const escapeKeyNode = TextKeyNode.esc();
    const spaceOrEnterKeyNode = KeyboardHelpIconFactory.iconOrIcon(spaceKeyNode, enterKeyNode);

    // Rows that make up this KeyboardHelpSection. They need to be disposed.
    const rows = [

      // Space or Enter
      KeyboardHelpSectionRow.labelWithIcon(GeometricOpticsStrings.keyboardHelpDialog.removeFromToolboxStringProperty,
        spaceOrEnterKeyNode),

      // Esc
      KeyboardHelpSectionRow.labelWithIcon(GeometricOpticsStrings.keyboardHelpDialog.returnToToolboxStringProperty, escapeKeyNode),

      // J, for 'Jump'
      KeyboardHelpSectionRow.createKeysRowFromStrings(['J'], GeometricOpticsStrings.keyboardHelpDialog.jumpToPointStringProperty)
    ];

    super(GeometricOpticsStrings.keyboardHelpDialog.rulerAndMarkerControlsStringProperty, rows, {
      textMaxWidth: 300,
      isDisposable: false // See https://github.com/phetsims/geometric-optics/issues/483
    });
  }
}