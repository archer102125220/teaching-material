// Copyright 2022-2023, University of Colorado Boulder

/**
 * The content for the "Localization" tab in the PreferencesDialog.
 *
 * This is still being designed and developed. We expect it to contain a UI component to change the
 * language on the fly when running in the "_all" file. There may also be controls to change out
 * a character set or other artwork to match certain cultures or regions.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { Node, RichText, Text, VBox } from '../../scenery/imports';
import joist from '../joist';
import { type LocalizationModel } from './PreferencesModel';
import PreferencesPanelSection from './PreferencesPanelSection';
import RegionAndCultureComboBox from './RegionAndCultureComboBox';
import LocalePanel from './LocalePanel';
import type PickRequired from '../../phet-core/types/PickRequired';
import PreferencesDialog from './PreferencesDialog';
import PreferencesPanel, { type PreferencesPanelOptions } from './PreferencesPanel';
import type TReadOnlyProperty from '../../axon/TReadOnlyProperty';
import PreferencesType from './PreferencesType';
import JoistStrings from '../JoistStrings';
import optionize, { type EmptySelfOptions } from '../../phet-core/optionize';
import PreferencesDialogConstants from './PreferencesDialogConstants';
import PreferencesControl from './PreferencesControl';

// constants
const localizationTitleStringProperty = JoistStrings.preferences.tabs.localization.titleStringProperty;
const regionAndCultureTitleStringProperty = JoistStrings.preferences.tabs.localization.regionAndCulture.titleStringProperty;
const regionAndCultureDescriptionStringProperty = JoistStrings.preferences.tabs.localization.regionAndCulture.descriptionStringProperty;

type SelfOptions = EmptySelfOptions;

type LocalizationPreferencesPanelOptions = SelfOptions & PickRequired<PreferencesPanelOptions, 'tandem'>;

class LocalizationPreferencesPanel extends PreferencesPanel {

  public constructor(localizationModel: LocalizationModel,
    selectedTabProperty: TReadOnlyProperty<PreferencesType>,
    tabVisibleProperty: TReadOnlyProperty<boolean>,
    providedOptions: LocalizationPreferencesPanelOptions) {

    const options = optionize<LocalizationPreferencesPanelOptions, SelfOptions, PreferencesPanelOptions>()({
      labelContent: localizationTitleStringProperty,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions);

    super(PreferencesType.LOCALIZATION, selectedTabProperty, tabVisibleProperty, options);

    const contentNode = new VBox({
      spacing: PreferencesDialog.CONTENT_SPACING
    });

    // regionAndCulturePortrayalProperty only gets set in PreferencesModel if there is at least one descriptor.
    if (localizationModel.regionAndCulturePortrayalProperty) {
      const comboBox = new RegionAndCultureComboBox(localizationModel.regionAndCulturePortrayalProperty, localizationModel.portrayals);
      const labelNode = new Text(regionAndCultureTitleStringProperty, PreferencesDialogConstants.CONTROL_LABEL_OPTIONS);
      const descriptionNode = new RichText(regionAndCultureDescriptionStringProperty, PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS);
      contentNode.addChild(new PreferencesControl({
        labelNode,
        controlNode: comboBox,
        descriptionNode
      }));
    }

    if (localizationModel.supportsDynamicLocale && localizationModel.includeLocalePanel) {

      // The language selection provided by LocalePanel does not follow the PreferencesControl pattern because it is a
      // much larger custom UI component that does not fit in the standard PreferencesControl layout.
      const localeLabel = new Text(JoistStrings.a11y.preferences.tabs.localization.languageSelection.labelStringProperty,
        PreferencesDialogConstants.CONTROL_LABEL_OPTIONS);
      const localeDescription = new RichText(JoistStrings.a11y.preferences.tabs.localization.languageSelection.descriptionStringProperty,
        PreferencesDialogConstants.CONTROL_DESCRIPTION_OPTIONS);
      const localePanel = new LocalePanel(localizationModel.localeProperty);

      const localeVBox = new VBox({
        children: [localeLabel, localeDescription, localePanel],
        align: 'left',
        spacing: 5,
        stretch: true,
        layoutOptions: {
          stretch: true
        }
      });
      contentNode.addChild(localeVBox);
    }

    localizationModel.customPreferences.forEach(customPreference => {
      const customContent = customPreference.createContent(providedOptions.tandem);
      contentNode.addChild(new Node({
        children: [customContent]
      }));
    });

    // center align within this content if there is only one item, otherwise left align all items
    contentNode.align = contentNode.children.length > 1 ? 'left' : 'center';

    const panelSection = new PreferencesPanelSection({
      contentNode,

      // Without a title no indentation is necessary
      contentLeftMargin: 0
    });

    this.addChild(panelSection);
  }
}

joist.register('LocalizationPreferencesPanel', LocalizationPreferencesPanel);
export default LocalizationPreferencesPanel;
