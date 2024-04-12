// Copyright 2022-2023, University of Colorado Boulder

/**
 * Class for items of a LocalePanel. Locales shown in their localized name wrapped in a Rectangle for highlighting
 * and input listeners.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import joist from '@/utils/joist/joist';
import { Color, FireListener, HighlightOverlay, Rectangle, Text } from '@/utils/scenery/imports';
import Tandem from '@/utils/tandem/Tandem';
import PreferencesDialog from '@/utils/joist/preferences/PreferencesDialog';
import PhetColorScheme from '@/utils/scenery-phet/PhetColorScheme';
import Property from '@/utils/axon/Property';
import { type Locale } from '@/i18n/joist/localeProperty';
import StringUtils from '@/utils/phetcommon/util/StringUtils';
import pushButtonSoundPlayer from '@/utils/tambo/shared-sound-players/pushButtonSoundPlayer';
import JoistStrings from '@/utils/joist/JoistStrings';
import localeInfoModule from '@/assets/chipper/localeInfoModule';

export default class LanguageSelectionNode extends Rectangle {

  public readonly locale: Locale; // locale associated with this Node

  public constructor(localeProperty: Property<Locale>, locale: Locale) {

    // Wrap it with embedding marks to ensure it displays correctly, see https://github.com/phetsims/chipper/issues/1379
    const wrappedLocaleString = StringUtils.localeToLocalizedName(locale);

    // Include the locale code when running with ?dev.
    const string = window.phet.chipper.queryParameters.dev ?
      StringUtils.wrapLTR(`${wrappedLocaleString} (${locale})`) :
      wrappedLocaleString;

    // The english name of the locale is reported for accessibility because PDOM strings are not translatable.
    // If you use the localized name, it might change the screen reader voice.
    const localeInfo = localeInfoModule[locale];
    window.assert && window.assert(localeInfo, `No localeInfo for ${locale}`);
    const englishLocaleString = localeInfo.name;

    const text = new Text(string, {
      font: PreferencesDialog.CONTENT_FONT
    });

    super(text.bounds.dilated(5), {
      cursor: 'pointer',

      // pdom
      tagName: 'button',
      innerContent: englishLocaleString
    });
    text.center = this.center;
    this.addChild(text);

    this.locale = locale;

    const fireListener = new FireListener({
      fire: () => {
        localeProperty.value = locale;

        pushButtonSoundPlayer.play();
        this.alertDescriptionUtterance(StringUtils.fillIn(
          JoistStrings.a11y.preferences.tabs.localization.languageSelection.languageChangeResponsePatternStringProperty, {
          language: englishLocaleString
        })
        );
      },

      // Preferences components are not instrumented, see https://github.com/phetsims/joist/issues/744
      tandem: Tandem.OPT_OUT
    });
    this.addInputListener(fireListener);

    fireListener.isOverProperty.link(isOver => {

      // makes the mouse interactive, keep the same dimensions so the layout will not change
      this.stroke = isOver ? HighlightOverlay.getInnerGroupHighlightColor() : Color.TRANSPARENT;
    });

    const localeListener = (selectedLocale: string) => {

      // identifies the selected locale
      this.fill = selectedLocale === locale ? PhetColorScheme.PHET_LOGO_BLUE : null;
    };
    localeProperty.link(localeListener);
  }
}

joist.register('LanguageSelectionNode', LanguageSelectionNode);