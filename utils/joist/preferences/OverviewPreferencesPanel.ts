// Copyright 2022-2023, University of Colorado Boulder

/**
 * The content for the "Overview" panel of the Preferences dialog. It includes an introduction blurb
 * about features available in Preferences. This panel is always present in the dialog.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import merge from '@/utils/phet-core/merge';
import { VBox, VoicingRichText } from '@/utils/scenery/imports';
import isLeftToRightProperty from '@/i18n/joist/isLeftToRightProperty';
import joist from '@/utils/joist/joist';
import JoistStrings from '@/utils/joist/JoistStrings';
import PreferencesDialog from '@/utils/joist/preferences/PreferencesDialog';
import PreferencesPanel from '@/utils/joist/preferences/PreferencesPanel';
import PreferencesType from '@/utils/joist/preferences/PreferencesType';

class OverviewPreferencesPanel extends PreferencesPanel {
  public constructor(selectedTabProperty: TReadOnlyProperty<PreferencesType>, tabVisibleProperty: TReadOnlyProperty<boolean>) {
    super(PreferencesType.OVERVIEW, selectedTabProperty, tabVisibleProperty);

    const introTextOptions = merge({}, PreferencesDialog.PANEL_SECTION_CONTENT_OPTIONS, {

      // using lineWrap instead of default maxWidth for content
      maxWidth: null,
      lineWrap: 600,
      maxHeight: 600,
      tagName: 'p'
    });

    const introParagraphsTexts = [

      // These string keys go through preferences.tabs.general because they used to
      // live in that tab. But now we cannot rename the string keys.
      new VoicingRichText(JoistStrings.preferences.tabs.general.accessibilityIntroStringProperty, introTextOptions),
      new VoicingRichText(JoistStrings.preferences.tabs.general.moreAccessibilityStringProperty, introTextOptions)
    ];

    const panelContent = new VBox({ spacing: 10, children: introParagraphsTexts });
    this.addChild(panelContent);

    const leftToRightListener = (isLTR: boolean) => {
      introParagraphsTexts.forEach(text => {
        const align = isLTR ? 'left' : 'right';
        text.align = align;
        panelContent.align = align;
      });
    };
    isLeftToRightProperty.link(leftToRightListener);
  }
}

joist.register('OverviewPreferencesPanel', OverviewPreferencesPanel);
export default OverviewPreferencesPanel;
