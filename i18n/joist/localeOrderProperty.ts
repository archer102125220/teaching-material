// Copyright 2022, University of Colorado Boulder

/**
 * Stores the ground-truth order of locales used in translation fallback, with the first attempted (highest priority)
 * locale listed first.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import DerivedProperty from '@/utils/axon/DerivedProperty';
import joist from '@/utils/joist/joist';
import localeProperty, { type Locale } from './localeProperty';
import fallbackLocalesProperty from './fallbackLocalesProperty';

const FALLBACK_LOCALE = 'en';

const localeOrderProperty = new DerivedProperty([localeProperty, fallbackLocalesProperty],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (locale: any, fallbackLocales: any) => {

    const localeOrder = [locale];

    // Attempt to fill in a language reduction for the selected locale, e.g. 'zh_CN' => 'zh'
    const shortLocale = locale.slice(0, 2) as Locale;
    if (locale !== shortLocale && !localeOrder.includes(shortLocale)) {
      localeOrder.push(shortLocale);
    }

    // Add custom fallback locales if not already in the order
    for (let i = 0; i < fallbackLocales.length; i++) {
      const fallbackLocale = fallbackLocales[i];
      if (!localeOrder.includes(fallbackLocale)) {
        localeOrder.push(fallbackLocale);
      }
    }

    // Guaranteed fallback locale at the very end (if not already included)
    if (!localeOrder.includes(FALLBACK_LOCALE)) {
      localeOrder.push(FALLBACK_LOCALE);
    }

    const fallbackIndex = localeOrder.indexOf(FALLBACK_LOCALE);
    assert && assert(fallbackIndex >= 0, `Required local in localeOrderProperty: ${FALLBACK_LOCALE}`);

    // Optimization: Ignore locales past our fallback, because it will include a value for every single key.
    return localeOrder.slice(0, fallbackIndex + 1);
  });

joist.register('localeOrderProperty', localeOrderProperty);

export default localeOrderProperty;
