// Copyright 2021-2023, University of Colorado Boulder

/**
 * A panel for the PreferencesDialog with controls for visual preferences. Includes features such as
 * "Interactive Highlights" and perhaps others in the future.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import merge from '@/utils/phet-core/merge';
import { Node, Text, VBox, VoicingText } from '@/utils/scenery/imports';
import joist from '@/utils/joist/joist';
import JoistStrings from '@/utils/joist/JoistStrings';
import PreferencesDialog from '@/utils/joist/preferences/PreferencesDialog';
import PreferencesPanelSection from '@/utils/joist/preferences/PreferencesPanelSection';
import PreferencesControl from '@/utils/joist/preferences/PreferencesControl';
import { type VisualModel } from '@/utils/joist/preferences/PreferencesModel';
import optionize, { combineOptions, type EmptySelfOptions } from '@/utils/phet-core/optionize';
import ProjectorModeToggleSwitch from '@/utils/joist/preferences/ProjectorModeToggleSwitch';
import Tandem from '@/utils/tandem/Tandem';
import PreferencesPanel, { type PreferencesPanelOptions } from '@/utils/joist/preferences/PreferencesPanel';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import PreferencesType from '@/utils/joist/preferences/PreferencesType';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import ToggleSwitch, { type ToggleSwitchOptions } from '@/utils/sun/ToggleSwitch';
import PreferencesDialogConstants from '@/utils/joist/preferences/PreferencesDialogConstants';
import PatternStringProperty from '@/utils/axon/PatternStringProperty';

// constants
const interactiveHighlightsStringProperty = JoistStrings.preferences.tabs.visual.interactiveHighlightsStringProperty;
const interactiveHighlightsDescriptionStringProperty = JoistStrings.preferences.tabs.visual.interactiveHighlightsDescriptionStringProperty;
const interactiveHighlightsEnabledAlertStringProperty = JoistStrings.a11y.preferences.tabs.visual.interactiveHighlights.enabledAlertStringProperty;
const interactiveHighlightsDisabledAlertStringProperty = JoistStrings.a11y.preferences.tabs.visual.interactiveHighlights.disabledAlertStringProperty;
const labelledDescriptionPatternStringProperty = JoistStrings.a11y.preferences.tabs.labelledDescriptionPatternStringProperty;

type VisualPreferencesPanelOptions = PickRequired<PreferencesPanelOptions, 'tandem'>;

class VisualPreferencesPanel extends PreferencesPanel {

  public constructor(visualModel: VisualModel, selectedTabProperty: TReadOnlyProperty<PreferencesType>, tabVisibleProperty: TReadOnlyProperty<boolean>, providedOptions?: VisualPreferencesPanelOptions) {

    const options = optionize<PreferencesPanelOptions, EmptySelfOptions, PreferencesPanelOptions>()({
      labelContent: 'Visual'
    }, providedOptions);

    // Grab the required tandem for subcomponents but the tandem is NOT passed through to the super
    const tandem = options.tandem;
    options.tandem = Tandem.OPT_OUT;

    super(PreferencesType.VISUAL, selectedTabProperty, tabVisibleProperty, options);

    const contentNode = new VBox({
      spacing: PreferencesDialog.CONTENT_SPACING,
      align: 'left'
    });

    if (visualModel.supportsProjectorMode) {
      const projectorModeSwitch = new ProjectorModeToggleSwitch(visualModel.colorProfileProperty);
      contentNode.addChild(projectorModeSwitch);
    }


    if (visualModel.supportsInteractiveHighlights) {

      const label = new Text(interactiveHighlightsStringProperty, PreferencesDialog.PANEL_SECTION_LABEL_OPTIONS);

      const highlightsReadingBlockNameResponsePatternStringProperty = new PatternStringProperty(labelledDescriptionPatternStringProperty, {
        label: interactiveHighlightsStringProperty,
        description: interactiveHighlightsDescriptionStringProperty
      }, { tandem: Tandem.OPT_OUT });
      const interactiveHighlightsEnabledSwitchVoicingText = new VoicingText(interactiveHighlightsDescriptionStringProperty, merge({}, PreferencesDialog.PANEL_SECTION_CONTENT_OPTIONS, {
        readingBlockNameResponse: highlightsReadingBlockNameResponsePatternStringProperty
      }));
      const interactiveHighlightsEnabledSwitch = new ToggleSwitch(visualModel.interactiveHighlightsEnabledProperty, false, true, combineOptions<ToggleSwitchOptions>({
        a11yName: interactiveHighlightsStringProperty,
        leftValueContextResponse: interactiveHighlightsDisabledAlertStringProperty,
        rightValueContextResponse: interactiveHighlightsEnabledAlertStringProperty
      }, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS));

      const interactiveHighlightsEnabledControl = new PreferencesControl({
        labelNode: label,
        descriptionNode: interactiveHighlightsEnabledSwitchVoicingText,
        controlNode: interactiveHighlightsEnabledSwitch
      });

      contentNode.addChild(interactiveHighlightsEnabledControl);
    }

    visualModel.customPreferences.forEach(customPreference => {
      const customContent = customPreference.createContent(tandem);
      const node = new Node({ children: [customContent] });
      contentNode.addChild(node);
    });

    const panelSection = new PreferencesPanelSection({
      contentNode,

      // no title for this section so no indendation necessary
      contentLeftMargin: 0
    });
    this.addChild(panelSection);
  }
}

joist.register('VisualPreferencesPanel', VisualPreferencesPanel);
export default VisualPreferencesPanel;
