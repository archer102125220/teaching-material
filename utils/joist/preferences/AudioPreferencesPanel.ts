// Copyright 2021-2023, University of Colorado Boulder

/**
 * The panel for the PreferencesDialog containing preferences related to audio.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { HBox, Text, VBox, type VBoxOptions } from '../../scenery/imports';
import joist from '../joist';
import JoistStrings from '../JoistStrings';
import PreferencesDialog from './PreferencesDialog';
import { type AudioModel } from './PreferencesModel';
import PreferencesControl from './PreferencesControl';
import SoundPanelSection from './SoundPanelSection';
import VoicingPanelSection from './VoicingPanelSection';
import PreferencesPanelSection from './PreferencesPanelSection';
import type PickRequired from '../../phet-core/types/PickRequired';
import PreferencesPanel, { type PreferencesPanelOptions } from './PreferencesPanel';
import PreferencesType from './PreferencesType';
import type TReadOnlyProperty from '../../axon/TReadOnlyProperty';
import ToggleSwitch, { type ToggleSwitchOptions } from '../../sun/ToggleSwitch';
import { combineOptions } from '../../phet-core/optionize';
import PreferencesDialogConstants from './PreferencesDialogConstants';

// constants
const audioFeaturesStringProperty = JoistStrings.preferences.tabs.audio.audioFeatures.titleStringProperty;

type AudioPreferencesPanelOptions = PickRequired<PreferencesPanelOptions, 'tandem'>;

class AudioPreferencesTabPanel extends PreferencesPanel {

  /**
   * @param audioModel - configuration for audio settings, see PreferencesModel
   * @param selectedTabProperty
   * @param tabVisibleProperty
   * @param providedOptions
   */
  public constructor(audioModel: AudioModel, selectedTabProperty: TReadOnlyProperty<PreferencesType>, tabVisibleProperty: TReadOnlyProperty<boolean>, providedOptions: AudioPreferencesPanelOptions) {
    super(PreferencesType.AUDIO, selectedTabProperty, tabVisibleProperty, {
      labelContent: audioFeaturesStringProperty
    });

    // Some contents of this Dialog will be dynamically removed. Dont resize when this happens because we don't want
    // to shift contents of the entire Preferences dialog.
    const contentOptions: VBoxOptions = {
      align: 'left',
      spacing: PreferencesDialog.CONTENT_SPACING,
      excludeInvisibleChildrenFromBounds: false
    };
    const leftContent = new VBox(contentOptions);
    const rightContent = new VBox(contentOptions);

    if (audioModel.supportsVoicing) {
      const voicingPanelSection = new VoicingPanelSection(audioModel);
      leftContent.addChild(voicingPanelSection);
    }

    if (audioModel.supportsSound) {

      // If only one of the audio features are in use, do not include the toggle switch to
      // enable/disable that feature because the control is redundant. The audio output should go
      // through the "Audio Features" toggle only.
      const hideSoundToggle = audioModel.supportsVoicing !== audioModel.supportsSound;

      const soundPanelSection = new SoundPanelSection(audioModel, {
        includeTitleToggleSwitch: !hideSoundToggle
      });
      rightContent.addChild(soundPanelSection);
    }

    const sections = new HBox({
      align: 'top',
      spacing: 10,
      children: [leftContent, rightContent],
      tagName: 'div' // Must have PDOM content to support toggling enabled in the PDOM. Could be removed after https://github.com/phetsims/scenery/issues/1514
    });

    audioModel.customPreferences.forEach((customPreference, i) => {
      const container = i % 2 === 0 ? leftContent : rightContent;
      const customContent = customPreference.createContent(providedOptions.tandem);
      const preferencesPanelSection = new PreferencesPanelSection({
        contentNode: customContent,
        contentNodeOptions: {
          excludeInvisibleChildrenFromBounds: true
        },
        contentLeftMargin: 0
      });
      container.addChild(preferencesPanelSection);
    });

    const audioFeaturesText = new Text(audioFeaturesStringProperty, PreferencesDialog.PANEL_SECTION_LABEL_OPTIONS);
    const audioFeaturesSwitch = new ToggleSwitch(audioModel.audioEnabledProperty, false, true, combineOptions<ToggleSwitchOptions>({
      a11yName: audioFeaturesStringProperty
    }, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS));
    const allAudioSwitch = new PreferencesControl({
      labelNode: audioFeaturesText,
      controlNode: audioFeaturesSwitch,
      headingControl: true
    });

    const audioEnabledListener = (enabled: boolean) => {
      sections.enabled = enabled;
    };

    audioModel.audioEnabledProperty.link(audioEnabledListener);

    const panelContent = new VBox({
      align: 'center',
      spacing: 25,
      children: [allAudioSwitch, sections]
    });
    this.addChild(panelContent);
  }
}

joist.register('AudioPreferencesTabPanel', AudioPreferencesTabPanel);
export default AudioPreferencesTabPanel;