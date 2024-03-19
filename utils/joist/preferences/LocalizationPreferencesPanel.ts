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

import { Node, RichText, Text, VBox } from '@/utils/scenery/imports';
import joist from '@/utils/joist/joist';
import { type LocalizationModel } from '@/utils/joist/preferences/PreferencesModel';
import PreferencesPanelSection from '@/utils/joist/preferences/PreferencesPanelSection';
import RegionAndCultureComboBox from '@/utils/joist/preferences/RegionAndCultureComboBox';
import LocalePanel from '@/utils/joist/preferences/LocalePanel';
import type PickRequired from '@/utils/phet-core/types/PickRequired';
import PreferencesDialog from '@/utils/joist/preferences/PreferencesDialog';
import PreferencesPanel, { type PreferencesPanelOptions } from '@/utils/joist/preferences/PreferencesPanel';
import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import PreferencesType from '@/utils/joist/preferences/PreferencesType';
import JoistStrings from '@/utils/joist/JoistStrings';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import PreferencesDialogConstants from '@/utils/joist/preferences/PreferencesDialogConstants';
import PreferencesControl from '@/utils/joist/preferences/PreferencesControl';

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
