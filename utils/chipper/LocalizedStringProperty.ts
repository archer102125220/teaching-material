// Copyright 2023, University of Colorado Boulder

/**
 * The main Property for a translated string (subtyped so we can get the stringKey, or other things in the future).
 *
 * @author Jonathan Olson <jonathan.olson>
 */

import DynamicProperty from '@/utils/axon/DynamicProperty';
import localeProperty, { type Locale } from '@/i18n/joist/localeProperty';
import Tandem from '@/utils/tandem/Tandem';
import StringIO from '@/utils/tandem/types/StringIO';
import chipper from '@/utils/chipper/chipper';
import TandemConstants from '@/utils/tandem/TandemConstants';
import LocalizedString from '@/utils/chipper/LocalizedString';

class LocalizedStringProperty extends DynamicProperty<string, string, Locale> {

  public constructor(public readonly localizedString: LocalizedString, tandem: Tandem, metadata?: Record<string, unknown>) {

    // Allow phetioReadOnly to be overridden
    const phetioReadOnly = (metadata && typeof metadata.phetioReadOnly === 'boolean') ? metadata.phetioReadOnly :
      TandemConstants.PHET_IO_OBJECT_METADATA_DEFAULTS.phetioReadOnly;

    // All i18n model strings are phetioFeatured by default
    const phetioFeatured = (metadata && typeof metadata.phetioFeatured === 'boolean') ? metadata.phetioFeatured : true;

    // Allow phetioDocumentation to be overridden
    const phetioDocumentation = (metadata && typeof metadata.phetioDocumentation === 'string') ? metadata.phetioDocumentation :
      TandemConstants.PHET_IO_OBJECT_METADATA_DEFAULTS.phetioDocumentation;

    super(localeProperty, {
      derive: (locale: Locale) => localizedString.getLocaleSpecificProperty(locale),
      bidirectional: true,
      phetioValueType: StringIO,
      phetioState: false,
      tandem,
      phetioFeatured,
      phetioReadOnly,
      phetioDocumentation
    });
  }

  public get stringKey(): string {
    return this.localizedString.stringKey;
  }
}

chipper.register('LocalizedStringProperty', LocalizedStringProperty);

export default LocalizedStringProperty;
