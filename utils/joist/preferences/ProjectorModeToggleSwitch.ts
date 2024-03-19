// Copyright 2022-2023, University of Colorado Boulder

/**
 * A toggle switch for "Projector Mode". Changes the color scheme for better contrast on projectors. The sim must have
 * a projector mode color profile. This toggle switch appears in the PreferencesDialog in the Visual panel.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { SceneryConstants, VoicingText, Text } from '@/utils/scenery/imports';
import joist from '@/utils/joist/joist';
import PreferencesDialog from '@/utils/joist/preferences/PreferencesDialog';
import PreferencesControl, { type PreferencesControlOptions } from '@/utils/joist/preferences/PreferencesControl';
import JoistStrings from '@/utils/joist/JoistStrings';
import optionize, { combineOptions, type EmptySelfOptions } from '@/utils/phet-core/optionize';
import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import Property from '@/utils/axon/Property';
import ToggleSwitch, { type ToggleSwitchOptions } from '@/utils/sun/ToggleSwitch';
import PreferencesDialogConstants from '@/utils/joist/preferences/PreferencesDialogConstants';
import PatternStringProperty from '@/utils/axon/PatternStringProperty';
import Tandem from '@/utils/tandem/Tandem';

type SelfOptions = EmptySelfOptions;
type ParentOptions = PreferencesControlOptions;
export type ProjectorModeToggleSwitchOptions = SelfOptions & StrictOmit<ParentOptions, 'labelNode' | 'descriptionNode'>;

class ProjectorModeToggleSwitch extends PreferencesControl {
  public constructor(colorProfileProperty: Property<string>, providedOptions?: ProjectorModeToggleSwitchOptions) {
    window.assert && window.assert(
      phet.chipper.colorProfiles[0] !== SceneryConstants.PROJECTOR_COLOR_PROFILE &&
      phet.chipper.colorProfiles.includes(SceneryConstants.PROJECTOR_COLOR_PROFILE) &&
      phet.chipper.colorProfiles.length === 2 &&
      phet.chipper.colorProfiles[0] !== phet.chipper.colorProfiles[1],
      'ProjectorModeToggleSwitch requires sims that support the projector color profile and one other color profile');

    const projectorModeLabel = new Text(JoistStrings.projectorModeStringProperty, PreferencesDialog.PANEL_SECTION_LABEL_OPTIONS);
    const projectorModeDescription = new VoicingText(JoistStrings.preferences.tabs.visual.projectorModeDescriptionStringProperty, PreferencesDialog.PANEL_SECTION_CONTENT_OPTIONS);

    // Identify the non-projector color profile that this checkbox sets.
    const otherColorProfile = phet.chipper.colorProfiles.find((colorProfile: string) => colorProfile !== SceneryConstants.PROJECTOR_COLOR_PROFILE);
    const projectorModeSwitch = new ToggleSwitch(colorProfileProperty, otherColorProfile, SceneryConstants.PROJECTOR_COLOR_PROFILE, combineOptions<ToggleSwitchOptions>({
      a11yName: JoistStrings.projectorModeStringProperty
    }, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS));

    const projectorModePatternStringProperty = new PatternStringProperty(JoistStrings.a11y.preferences.tabs.labelledDescriptionPatternStringProperty, {
      label: JoistStrings.projectorModeStringProperty,
      description: JoistStrings.preferences.tabs.visual.projectorModeDescriptionStringProperty
    }, { tandem: Tandem.OPT_OUT });
    projectorModeDescription.readingBlockNameResponse = projectorModePatternStringProperty;

    const options = optionize<ProjectorModeToggleSwitchOptions, SelfOptions, ParentOptions>()({
      labelNode: projectorModeLabel,
      descriptionNode: projectorModeDescription,
      controlNode: projectorModeSwitch
    }, providedOptions);

    super(options);
  }
}

joist.register('ProjectorModeToggleSwitch', ProjectorModeToggleSwitch);
export default ProjectorModeToggleSwitch;