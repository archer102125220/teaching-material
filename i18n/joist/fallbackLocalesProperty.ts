// Copyright 2022-2023, University of Colorado Boulder

/**
 * A Property that stores "backup" locales to be used for translations, if the translation of a string is not available
 * in the main locale (determined by localeProperty)
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Property from '@/utils/axon/Property';
import localeInfoModule from '@/assets/chipper/localeInfoModule';
import Tandem from '@/utils/tandem/Tandem';
import ArrayIO from '@/utils/tandem/types/ArrayIO';
import StringIO from '@/utils/tandem/types/StringIO';
import joist from '@/utils/joist/joist';
import { type Locale } from './localeProperty';

const fallbackLocalesProperty = new Property<Locale[]>([], {
  tandem: Tandem.GENERAL_MODEL.createTandem('fallbackLocalesProperty'),
  phetioDocumentation: 'An ordered list of locales to "fall back" on when a translation is missing for the selected ' +
    'locale, for example: ["es", "de" ]. "en" will always be added to the end of this, because it has ' +
    'guaranteed full coverage of all translated keys.',
  phetioFeatured: true,
  isValidValue: locales => {
    return _.every(locales, locale => !!localeInfoModule[locale]);
  },
  phetioValueType: ArrayIO(StringIO)
});

joist.register('fallbackLocalesProperty', fallbackLocalesProperty);

export default fallbackLocalesProperty;
