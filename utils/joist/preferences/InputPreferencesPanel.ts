// Copyright 2021-2023, University of Colorado Boulder

/**
 * The panel of the PreferencesDialog related to options related to user input.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import merge from '@/utils/phet-core/merge';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import StringUtils from '@/utils/phetcommon/util/StringUtils';
import { Node, Text, VBox, VoicingRichText } from '@/utils/scenery/imports';
import ToggleSwitch, { type ToggleSwitchOptions } from '@/utils/sun/ToggleSwitch';
import joist from '@/utils/joist/joist';
import JoistStrings from '@/utils/joist/JoistStrings';
import PreferencesDialog from '@/utils/joist/preferences/PreferencesDialog';
import { type InputModel } from '@/utils/joist/preferences/PreferencesModel';
import PreferencesPanel, { type PreferencesPanelOptions } from '@/utils/joist/preferences/PreferencesPanel';
import PreferencesPanelSection from '@/utils/joist/preferences/PreferencesPanelSection';
import PreferencesControl from '@/utils/joist/preferences/PreferencesControl';
import PreferencesType from '@/utils/joist/preferences/PreferencesType';
import PreferencesDialogConstants from '@/utils/joist/preferences/PreferencesDialogConstants';
import { combineOptions } from '@/utils/phet-core/optionize';

// constants
const gestureControlEnabledAlertStringProperty = JoistStrings.a11y.preferences.tabs.input.gestureControl.enabledAlertStringProperty;
const gestureControlDisabledAlertStringProperty = JoistStrings.a11y.preferences.tabs.input.gestureControl.disabledAlertStringProperty;
const labelledDescriptionPatternStringProperty = JoistStrings.a11y.preferences.tabs.labelledDescriptionPatternStringProperty;

// NOT translatable yet because this tab does not appear in any published simulation.
const inputTitleString = 'Input';
const gestureControlsString = 'Gesture Control';
const gestureControlsDescriptionString = 'Use touch with custom swipes and taps instead. No direct touch with gesture control enabled.';

type InputPreferencesPanelOptions = PickRequired<PreferencesPanelOptions, 'tandem'>;

class InputPreferencesPanel extends PreferencesPanel {

  public constructor(inputModel: InputModel, selectedTabProperty: TReadOnlyProperty<PreferencesType>, tabVisibleProperty: TReadOnlyProperty<boolean>, providedOptions: InputPreferencesPanelOptions) {

    super(PreferencesType.INPUT, selectedTabProperty, tabVisibleProperty, {
      labelContent: inputTitleString
    });

    // children are filled in later depending on what is supported in the InputModel
    const contentVBox = new VBox({
      spacing: PreferencesDialog.CONTENT_SPACING,
      align: 'left'
    });
    this.addChild(contentVBox);

    if (inputModel.supportsGestureControl) {

      const gestureControlText = new Text(gestureControlsString, PreferencesDialog.PANEL_SECTION_LABEL_OPTIONS);
      const gestureControlDescriptionNode = new VoicingRichText(gestureControlsDescriptionString, merge({}, PreferencesDialog.PANEL_SECTION_CONTENT_OPTIONS, {
        lineWrap: 350,
        maxHeight: 100,

        readingBlockNameResponse: StringUtils.fillIn(labelledDescriptionPatternStringProperty, {
          label: gestureControlsString,
          description: gestureControlsDescriptionString
        })
      }));
      const gestureControlsEnabledSwitch = new ToggleSwitch(inputModel.gestureControlsEnabledProperty, false, true, combineOptions<ToggleSwitchOptions>({
        a11yName: gestureControlsString,
        leftValueContextResponse: gestureControlDisabledAlertStringProperty,
        rightValueContextResponse: gestureControlEnabledAlertStringProperty
      }, PreferencesDialogConstants.TOGGLE_SWITCH_OPTIONS));
      const gestureControlsControl = new PreferencesControl({
        labelNode: gestureControlText,
        descriptionNode: gestureControlDescriptionNode,
        controlNode: gestureControlsEnabledSwitch
      });

      const gesturePanelSection = new PreferencesPanelSection({
        titleNode: gestureControlsControl,
        contentLeftMargin: 0
      });

      contentVBox.addChild(gesturePanelSection);
    }

    const contentNode = new VBox({
      spacing: PreferencesDialog.CONTENT_SPACING,
      align: 'left'
    });

    inputModel.customPreferences.forEach(customPreference => {
      const customContent = customPreference.createContent(providedOptions.tandem);
      contentNode.addChild(
        new Node({ children: [customContent] })
      );
    });

    const customPanelSection = new PreferencesPanelSection({
      contentNode,
      contentLeftMargin: 0
    });
    contentVBox.addChild(customPanelSection);
  }
}

joist.register('InputPreferencesPanel', InputPreferencesPanel);
export default InputPreferencesPanel;
