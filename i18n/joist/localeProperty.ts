// Copyright 2022-2024, University of Colorado Boulder

/**
 * A universal locale Property that is accessible independently of the running Sim instance.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Property from '@/utils/axon/Property';
import localeInfoModule from '@/assets/chipper/localeInfoModule';
import StringUtils from '@/utils/phetcommon/util/StringUtils';
import { globalKeyStateTracker, KeyboardUtils } from '@/utils/scenery/imports';
import Tandem from '@/utils/tandem/Tandem';
import StringIO from '@/utils/tandem/types/StringIO';
import joist from '@/utils/joist/joist';

const FALLBACK_LOCALE = 'en';

export type Locale = keyof typeof localeInfoModule;

// All available locales for the runtime
export const availableRuntimeLocales = _.sortBy(Object.keys(phet.chipper.strings), locale => {
  return StringUtils.localeToLocalizedName(locale).toLowerCase();
}) as Locale[];

// Start only with a valid locale, see https://github.com/phetsims/phet-io/issues/1882
const isLocaleValid = (locale?: Locale): boolean => {
  return !!(locale && availableRuntimeLocales.includes(locale));
};

// We might use a partial locale (e.g. 'en' instead of 'en_US'), so grab this if it exists. It might be the same as
// phet.chipper.locale (that's OK).
const partialLocale = typeof phet.chipper.locale === 'string' ? phet.chipper.locale.slice(0, 2) : undefined;

// Get the "most" valid locale, see https://github.com/phetsims/phet-io/issues/1882
// 'ar_SA' would try 'ar_SA', 'ar', and 'en' (result: ar_SA)
// 'ar_QP' would try 'ar_QP', 'ar', and 'en' (result: ar)
// 'zx_ZX' would try 'zx_ZX', 'zx', and 'en' (result: en)
// NOTE: If the locale doesn't actually have any strings: THAT IS OK! Our string system will use the appropriate
// fallback strings.
const validInitialLocale = isLocaleValid(phet.chipper.locale) ? phet.chipper.locale :
  isLocaleValid(partialLocale) ? partialLocale :
    FALLBACK_LOCALE;

// Just in case we had an invalid locale, remap phet.chipper.locale to the "corrected" value
phet.chipper.locale = validInitialLocale;

class LocaleProperty extends Property<Locale> {
  // @ts-expect-error
  protected override unguardedSet(value: Locale): void {
    if (availableRuntimeLocales.includes(value)) {
      super.unguardedSet(value);
    }
    else {
      assert && assert(false, 'Unsupported locale: ' + value);

      // Do not try to set if the value was invalid
    }
  }
}

// @ts-expect-error
const localeProperty = new LocaleProperty(validInitialLocale, {
  tandem: Tandem.GENERAL_MODEL.createTandem('localeProperty'),
  phetioFeatured: true,
  phetioValueType: StringIO,
  validValues: availableRuntimeLocales,
  phetioDocumentation: 'Specifies language currently displayed in the simulation'
});

if (phet?.chipper?.queryParameters?.keyboardLocaleSwitcher) {

  // DUPLICATION ALERT: don't change these without consulting PHET_IO_WRAPPERS/PhetioClient.initializeKeyboardLocaleSwitcher()
  const FORWARD_KEY = KeyboardUtils.KEY_I;
  const BACKWARD_KEY = KeyboardUtils.KEY_U;

  globalKeyStateTracker.keydownEmitter.addListener((event: KeyboardEvent) => {

    const bump = (delta: number) => {

      // Ctrl + u in Chrome on Windows is "view source" in a new tab
      event.preventDefault();

      // @ts-expect-error
      const index = availableRuntimeLocales.indexOf(localeProperty.value);
      const nextIndex = (index + delta + availableRuntimeLocales.length) % availableRuntimeLocales.length;
      // @ts-expect-error
      localeProperty.value = availableRuntimeLocales[nextIndex];

      // Indicate the new locale on the console
      // @ts-expect-error
      console.log(localeProperty.value);
    };

    if (event.ctrlKey && !event.shiftKey && !event.metaKey && !event.altKey) {
      if (KeyboardUtils.isKeyEvent(event, FORWARD_KEY)) {
        bump(+1);
      }
      else if (KeyboardUtils.isKeyEvent(event, BACKWARD_KEY)) {
        bump(-1);
      }
    }
  });
}

joist.register('localeProperty', localeProperty);

export default localeProperty;
