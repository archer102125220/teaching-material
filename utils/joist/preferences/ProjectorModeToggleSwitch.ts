// Copyright 2022-2023, University of Colorado Boulder

/**
 * A toggle switch for "Projector Mode". Changes the color scheme for better contrast on projectors. The sim must have
 * a projector mode color profile. This toggle switch appears in the PreferencesDialog in the Visual panel.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { SceneryConstants, VoicingText, Text } from '../../scenery/imports';
import joist from '../joist';
import PreferencesDialog from './PreferencesDialog';
import PreferencesControl, { type PreferencesControlOptions } from './PreferencesControl';
import JoistStrings from '../JoistStrings';
import optionize, { combineOptions, type EmptySelfOptions } from '../../phet-core/optionize';
import type StrictOmit from '../../phet-core/types/StrictOmit';
import Property from '../../axon/Property';
import ToggleSwitch, { type ToggleSwitchOptions } from '../../sun/ToggleSwitch';
import PreferencesDialogConstants from './PreferencesDialogConstants';
import PatternStringProperty from '../../axon/PatternStringProperty';
import Tandem from '../../tandem/Tandem';

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