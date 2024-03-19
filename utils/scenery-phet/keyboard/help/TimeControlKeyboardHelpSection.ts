// Copyright 2022-2023, University of Colorado Boulder

/**
 * Help section that explains how to use a keyboard to toggle play/pause and timing controls.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import optionize from '@/utils/phet-core/optionize';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import KeyboardHelpSection, { type KeyboardHelpSectionOptions } from '@/utils/scenery-phet/keyboard/help/KeyboardHelpSection';
import KeyboardHelpSectionRow from '@/utils/scenery-phet/keyboard/help/KeyboardHelpSectionRow';
import SceneryPhetStrings from '@/utils/scenery-phet/SceneryPhetStrings';

// constants
const timingControlsStringProperty = SceneryPhetStrings.keyboardHelpDialog.timingControls.timingControlsStringProperty;
const pauseOrPlayActionStringProperty = SceneryPhetStrings.keyboardHelpDialog.timingControls.pauseOrPlayActionStringProperty;
const pauseOrPlayActionDescriptionStringProperty = SceneryPhetStrings.a11y.keyboardHelpDialog.timingControls.pauseOrPlayActionDescriptionStringProperty;

type SelfOptions = {

  // The heading string for this section of keyboard help content
  headingString?: string | TReadOnlyProperty<string>;

  // Visible string that describes the action of pause/play from a key command. You may want sim-specific terminology
  // for this command.
  pauseOrPlayActionString?: string | TReadOnlyProperty<string>;

  // String for the PDOM (screen readers) that describes the hotkeys for play/pause.
  pauseOrPlayActionDescriptionString?: string | TReadOnlyProperty<string>;
};
type ParentOptions = KeyboardHelpSectionOptions;
export type TimeControlKeyboardHelpSectionOptions = SelfOptions & ParentOptions;

class TimeControlKeyboardHelpSection extends KeyboardHelpSection {
  public constructor(providedOptions?: TimeControlKeyboardHelpSectionOptions) {
    const options = optionize<TimeControlKeyboardHelpSectionOptions, SelfOptions, ParentOptions>()({
      headingString: timingControlsStringProperty,
      pauseOrPlayActionString: pauseOrPlayActionStringProperty,
      pauseOrPlayActionDescriptionString: pauseOrPlayActionDescriptionStringProperty
    }, providedOptions);

    const playPauseRow = KeyboardHelpSectionRow.createPlayPauseKeyRow(options.pauseOrPlayActionString, {
      labelInnerContent: options.pauseOrPlayActionDescriptionString
    });

    super(options.headingString, [playPauseRow], options);
  }
}

sceneryPhet.register('TimeControlKeyboardHelpSection', TimeControlKeyboardHelpSection);
export default TimeControlKeyboardHelpSection;
