// Copyright 2016-2023, University of Colorado Boulder

/**
 * The button that pops up the Keyboard Help Dialog, which appears in the right side of the navbar and
 * to the left of the PhetButton.
 *
 * @author Jesse Greenberg
 */

import Property from '../axon/Property';
import optionize, { type EmptySelfOptions } from '../phet-core/optionize';
import { Color, Image } from '../scenery/imports';
import Dialog from '../sun/Dialog';
import PhetioCapsule from '../tandem/PhetioCapsule';
import keyboardIconOnWhite_png from '@/assets/images/joist/keyboardIconOnWhite_png'; // on a white navbar
import keyboardIcon_png from '@/assets/images/joist/keyboardIcon_png'; // on a black navbar
import joist from './joist';
import JoistButton, { type JoistButtonOptions } from './JoistButton';
import JoistStrings from './JoistStrings';
import KeyboardHelpDialog from './KeyboardHelpDialog';
import { type AnyScreen } from './Screen';
import type PickRequired from '../phet-core/types/PickRequired';
import type TReadOnlyProperty from '../axon/TReadOnlyProperty';

// constants
const keyboardShortcutsStringProperty = JoistStrings.a11y.keyboardHelp.keyboardShortcutsStringProperty;
const ICON_DESIRED_HEIGHT = 17.085; // empirically determined

type SelfOptions = EmptySelfOptions;
export type KeyboardHelpButtonOptions = SelfOptions & PickRequired<JoistButtonOptions, 'tandem'> & Pick<JoistButtonOptions, 'pointerAreaDilationX' | 'pointerAreaDilationY'>;

class KeyboardHelpButton extends JoistButton {

  public constructor(screens: AnyScreen[], screenProperty: Property<AnyScreen>,
    backgroundColorProperty: TReadOnlyProperty<Color>,
    providedOptions: KeyboardHelpButtonOptions) {

    const options = optionize<KeyboardHelpButtonOptions, SelfOptions, JoistButtonOptions>()({
      highlightExtensionWidth: 5 + 3.6,
      highlightExtensionHeight: 10,

      // The keyboard button is not vertically symmetric, due to the cable on the top.
      // This offset adjusts the body of the keyboard to be in the center, so it
      // will align with the speaker button and the PhET logo
      highlightCenterOffsetY: 2,

      // phet-io
      visiblePropertyOptions: { phetioFeatured: true },

      // pdom
      innerContent: keyboardShortcutsStringProperty,

      // voicing
      voicingNameResponse: keyboardShortcutsStringProperty
    }, providedOptions);

    let keyboardHelpDialogCapsule: PhetioCapsule<KeyboardHelpDialog> | null = null; // set after calling super
    options.listener = () => {
      assert && assert(keyboardHelpDialogCapsule);

      const keyboardHelpDialog = keyboardHelpDialogCapsule!.getElement();

      keyboardHelpDialog.show();
    };

    const icon = new Image(keyboardIcon_png, {
      scale: ICON_DESIRED_HEIGHT / keyboardIcon_png.height,
      pickable: false
    });

    super(icon, backgroundColorProperty, options);

    keyboardHelpDialogCapsule = new PhetioCapsule<KeyboardHelpDialog>(tandem => {
      return new KeyboardHelpDialog(screens, screenProperty, {
        tandem: tandem,
        focusOnHideNode: this
      });
    }, [], {
      tandem: options.tandem.createTandem('keyboardHelpDialogCapsule'),
      phetioType: PhetioCapsule.PhetioCapsuleIO(Dialog.DialogIO),
      disposeOnClear: false
    });

    // change the icon so that it is visible when the background changes from dark to light
    backgroundColorProperty.link(backgroundColor => {
      icon.image = backgroundColor.equals(Color.BLACK) ? keyboardIcon_png : keyboardIconOnWhite_png;
    });
  }
}

joist.register('KeyboardHelpButton', KeyboardHelpButton);
export default KeyboardHelpButton;