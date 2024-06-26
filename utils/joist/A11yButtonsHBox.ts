// Copyright 2018-2023, University of Colorado Boulder

/**
 * Creates an HBox that can have the sound toggle button, a11y button, or be empty
 *
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import _ from 'lodash';

import platform from '@/utils/phet-core/platform';
import { Color, HBox, type HBoxOptions } from '@/utils/scenery/imports';
import Tandem from '@/utils/tandem/Tandem';
import audioManager from '@/utils/joist/audioManager';
import joist from '@/utils/joist/joist';
import KeyboardHelpButton from '@/utils/joist/KeyboardHelpButton';
import NavigationBarAudioToggleButton from '@/utils/joist/NavigationBarAudioToggleButton';
import NavigationBarPreferencesButton from '@/utils/joist/preferences/NavigationBarPreferencesButton';
import Sim from '@/utils/joist/Sim';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';

type SelfOptions = EmptySelfOptions;
export type A11yButtonsHBoxOptions = SelfOptions & StrictOmit<HBoxOptions, 'children'>;

class A11yButtonsHBox extends HBox {

  public constructor(sim: Sim, backgroundColorProperty: TReadOnlyProperty<Color>, providedOptions?: A11yButtonsHBoxOptions) {

    const options = optionize<A11yButtonsHBoxOptions, SelfOptions, HBoxOptions>()({
      align: 'center',
      spacing: 2,

      // This Node is not instrumented! This tandem is instead just used to instrument child elements.
      tandem: Tandem.REQUIRED
    }, providedOptions);

    // list of optional buttons added for a11y
    const a11yButtons = [];

    if (sim.preferencesModel.shouldShowDialog()) {

      const preferencesButton = new NavigationBarPreferencesButton(sim.preferencesModel, backgroundColorProperty, {
        tandem: options.tandem.createTandem('preferencesButton'),
        pointerAreaDilationX: 1,
        pointerAreaDilationY: 1
      });

      a11yButtons.push(preferencesButton);
    }

    const supportsAudioPreferences = sim.preferencesModel.supportsAudioPreferences();

    // only put the audio on/off button on the nav bar if audio features are enabled
    if (supportsAudioPreferences) {
      a11yButtons.push(new NavigationBarAudioToggleButton(audioManager.audioEnabledProperty, backgroundColorProperty, {
        tandem: options.tandem.createTandem('audioToggleButton'),
        pointerAreaDilationX: 1,
        pointerAreaDilationY: 0.15,
        supportsAudioPreferences
      }));
    }

    // Create a keyboard help button/dialog if there is keyboard help content.
    if (sim.hasKeyboardHelpContent) {

      // Create the KeyboardHelpButton (pops open a dialog with information about keyboard navigation) if there is content
      // and the sim has supports Interactive Description. Eagerly create this to support a consistent PhET-iO API, but
      // only conditionally add it to the nav bar if in the proper runtime.
      const keyboardHelpButton = new KeyboardHelpButton(sim.screens, sim.selectedScreenProperty, backgroundColorProperty, {
        tandem: options.tandem.createTandem('keyboardHelpButton'),
        pointerAreaDilationX: 1,
        pointerAreaDilationY: 1
      });

      // only show the keyboard help button if the sim supports interactive description and we are not in mobile safari
      if (window.phet.chipper.queryParameters.supportsInteractiveDescription && !platform.mobileSafari) {
        a11yButtons.push(keyboardHelpButton);
      }
    }

    options.children = a11yButtons;

    // Don't instrument this Node, only its child elements.
    super(_.omit(options, 'tandem'));
  }
}

joist.register('A11yButtonsHBox', A11yButtonsHBox);
export default A11yButtonsHBox;