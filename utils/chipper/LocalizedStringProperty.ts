// Copyright 2023, University of Colorado Boulder

/**
 * The main Property for a translated string (subtyped so we can get the stringKey, or other things in the future).
 *
 * @author Jonathan Olson <jonathan.olson>
 */

import DynamicProperty from '../axon/DynamicProperty';
import localeProperty, { Locale } from '@/i18n/localeProperty';;
import Tandem from '../tandem/Tandem';
import StringIO from '../tandem/types/StringIO';
import chipper from './chipper';
import TandemConstants from '../tandem/TandemConstants';
import LocalizedString from './LocalizedString';

class LocalizedStringProperty extends DynamicProperty<string, string, Locale> {

  public constructor( public readonly localizedString: LocalizedString, tandem: Tandem, metadata?: Record<string, unknown> ) {

    // Allow phetioReadOnly to be overridden
    const phetioReadOnly = ( metadata && typeof metadata.phetioReadOnly === 'boolean' ) ? metadata.phetioReadOnly :
                           TandemConstants.PHET_IO_OBJECT_METADATA_DEFAULTS.phetioReadOnly;

    // All i18n model strings are phetioFeatured by default
    const phetioFeatured = ( metadata && typeof metadata.phetioFeatured === 'boolean' ) ? metadata.phetioFeatured : true;

    // Allow phetioDocumentation to be overridden
    const phetioDocumentation = ( metadata && typeof metadata.phetioDocumentation === 'string' ) ? metadata.phetioDocumentation :
                                TandemConstants.PHET_IO_OBJECT_METADATA_DEFAULTS.phetioDocumentation;

    super( localeProperty, {
      derive: ( locale: Locale ) => localizedString.getLocaleSpecificProperty( locale ),
      bidirectional: true,
      phetioValueType: StringIO,
      phetioState: false,
      tandem: tandem,
      phetioFeatured: phetioFeatured,
      phetioReadOnly: phetioReadOnly,
      phetioDocumentation: phetioDocumentation
    } );
  }

  public get stringKey(): string {
    return this.localizedString.stringKey;
  }
}

chipper.register( 'LocalizedStringProperty', LocalizedStringProperty );

export default LocalizedStringProperty;
