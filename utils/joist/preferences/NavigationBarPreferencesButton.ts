// Copyright 2021-2023, University of Colorado Boulder

/**
 * Button in the NavigationBar that opens the PreferencesDialog.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import { Color, Image } from '@/utils/scenery/imports';
import preferencesIconOnWhite_png from '@/assets/images/joist/preferencesIconOnWhite_png'; // on a white navbar
import preferencesIcon_png from '@/assets/images/joist/preferencesIcon_png'; // on a black navbar
import Dialog from '@/utils/sun/Dialog';
import PhetioCapsule from '@/utils/tandem/PhetioCapsule';
import joist from '@/utils/joist/joist';
import JoistButton, { type JoistButtonOptions } from '@/utils/joist/JoistButton';
import JoistStrings from '@/utils/joist/JoistStrings';
import PreferencesDialog from '@/utils/joist/preferences/PreferencesDialog';
import PreferencesModel from '@/utils/joist/preferences/PreferencesModel';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';

type SelfOptions = EmptySelfOptions;
export type NavigationBarPreferencesButtonOptions = SelfOptions & PickRequired<JoistButtonOptions, 'tandem'> & Pick<JoistButtonOptions, 'pointerAreaDilationX' | 'pointerAreaDilationY'>;

// // empirically determined to similarly match the height of the P in PhET button, see https://github.com/phetsims/joist/issues/919
const DESIRED_ICON_HEIGHT = 18.85;

class NavigationBarPreferencesButton extends JoistButton {

  public constructor(preferencesModel: PreferencesModel, backgroundColorProperty: TReadOnlyProperty<Color>,
    providedOptions: NavigationBarPreferencesButtonOptions) {

    const options = optionize<NavigationBarPreferencesButtonOptions, SelfOptions, JoistButtonOptions>()({

      listener: () => {
        const preferencesDialog = preferencesDialogCapsule.getElement();
        preferencesDialog.show();
        preferencesDialog.focusSelectedTab();
      },
      highlightExtensionWidth: 5 + 3.6,
      highlightExtensionHeight: 10,

      // pdom
      innerContent: JoistStrings.preferences.titleStringProperty,
      positionInPDOM: true,

      // voicing
      voicingNameResponse: JoistStrings.preferences.titleStringProperty,

      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions);

    const icon = new Image(preferencesIcon_png, {
      scale: DESIRED_ICON_HEIGHT / preferencesIcon_png.height,
      pickable: false
    });

    super(icon, backgroundColorProperty, options);

    const preferencesDialogCapsule = new PhetioCapsule<PreferencesDialog>(tandem => {
      return new PreferencesDialog(preferencesModel, {
        tandem,
        focusOnHideNode: this
      });
    }, [], {
      tandem: options.tandem.createTandem('preferencesDialogCapsule'),
      phetioType: PhetioCapsule.PhetioCapsuleIO(Dialog.DialogIO),
      disposeOnClear: false
    });

    // change the icon so that it is visible when the background changes from dark to light
    backgroundColorProperty.link(backgroundColor => {
      icon.image = backgroundColor.equals(Color.BLACK) ? preferencesIcon_png : preferencesIconOnWhite_png;
    });

    // pdom - Signal to screen readers that the button will open a dialog. For some reason, this also seems to
    // prevent a bug in iOS Safari where two events are dispatched to the screen on activation instead of one.
    // The result was that one press would open the dialog and the second buggy press would immediately close it.
    // Make sure that the dialog can be opened on iOS Safari before removing this.
    this.setPDOMAttribute('aria-haspopup', true);
  }
}

joist.register('NavigationBarPreferencesButton', NavigationBarPreferencesButton);
export default NavigationBarPreferencesButton;
