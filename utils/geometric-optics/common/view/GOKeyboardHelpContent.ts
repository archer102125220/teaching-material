// Copyright 2021-2023, University of Colorado Boulder

/**
 * GOKeyboardHelpContent is the content for the keyboard-help dialog in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BasicActionsKeyboardHelpSection from '../../../scenery-phet/keyboard/help/BasicActionsKeyboardHelpSection';
import ComboBoxKeyboardHelpSection from '../../../scenery-phet/keyboard/help/ComboBoxKeyboardHelpSection';
import SliderControlsKeyboardHelpSection from '../../../scenery-phet/keyboard/help/SliderControlsKeyboardHelpSection';
import TwoColumnKeyboardHelpContent from '../../../scenery-phet/keyboard/help/TwoColumnKeyboardHelpContent';
import geometricOptics from '../../geometricOptics';
import GeometricOpticsStrings from '../../GeometricOpticsStrings';
import MoveDraggableItemsKeyboardHelpSection from '../../../scenery-phet/keyboard/help/MoveDraggableItemsKeyboardHelpSection';
import { RulerAndMarkerControlsSection } from './RulerAndMarkerControlsSection';

export default class GOKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Sections in the left column.
    const leftSections = [

      // Move Draggable Items
      new MoveDraggableItemsKeyboardHelpSection(),

      // Ruler and Marker Controls
      new RulerAndMarkerControlsSection(),

      // Choose an Object
      new ComboBoxKeyboardHelpSection({
        headingString: GeometricOpticsStrings.keyboardHelpDialog.chooseAnObjectStringProperty,
        thingAsLowerCaseSingular: GeometricOpticsStrings.keyboardHelpDialog.objectStringProperty,
        thingAsLowerCasePlural: GeometricOpticsStrings.keyboardHelpDialog.objectsStringProperty
      })
    ];

    // Sections in the right column.
    const rightSections = [

      // Slider Controls
      new SliderControlsKeyboardHelpSection(),

      // Basic Actions
      new BasicActionsKeyboardHelpSection({
        withCheckboxContent: true
      })
    ];

    super(leftSections, rightSections, {
      isDisposable: false // See https://github.com/phetsims/geometric-optics/issues/483
    });
  }
}

geometricOptics.register('GOKeyboardHelpContent', GOKeyboardHelpContent);