// Copyright 2019-2022, University of Colorado Boulder

/**
 * Property whose value is a member of an Enumeration.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import deprecationWarning from '@/utils/phet-core/deprecationWarning';
import EnumerationDeprecated from '@/utils/phet-core/EnumerationDeprecated';
import merge from '@/utils/phet-core/merge';
import EnumerationIO from '@/utils/tandem/types/EnumerationIO';
import axon from '@/utils/axon/axon';
import Property from '@/utils/axon/Property';

/**
 * @deprecated
 */
class EnumerationDeprecatedProperty extends Property {
  /**
   * @param {EnumerationDeprecated} enumeration
   * @param {*} initialValue - one of the values from enumeration
   * @param {Object} [options]
   */
  constructor(enumeration, initialValue, options) {
    deprecationWarning(
      'Use EnumerationProperty. EnumerationDeprecated should be exchanged for classes that extend EnumerationValue, see WilderEnumerationPatterns for examples.'
    );

    window.assert &&
      window.assert(
        enumeration instanceof EnumerationDeprecated,
        'likely you are using the new and improved Enumeration, better use EnumerationProperty too.'
      );
    window.assert &&
      window.assert(
        enumeration.VALUES.includes(initialValue),
        `invalid initialValue: ${initialValue}`
      );

    if (options) {
      // client cannot specify superclass options that are not supported by EnumerationDeprecatedProperty
      window.assert &&
        window.assert(
          !options.hasOwnProperty('isValidValue'),
          'EnumerationDeprecatedProperty does not support isValidValue'
        );

      // client cannot specify superclass options that are controlled by EnumerationDeprecatedProperty
      window.assert &&
        window.assert(
          !options.hasOwnProperty('valueType'),
          'EnumerationDeprecatedProperty sets valueType'
        );
      window.assert &&
        window.assert(
          !options.hasOwnProperty('phetioType'),
          'EnumerationDeprecatedProperty sets phetioType'
        );
    }

    options = merge(
      {
        valueType: enumeration,
        phetioValueType: EnumerationIO(enumeration),
        validValues: enumeration.VALUES // for PhET-iO documentation and support
      },
      options
    );

    super(initialValue, options);

    // @public (read-only)
    this.enumeration = enumeration;
  }
}

axon.register('EnumerationDeprecatedProperty', EnumerationDeprecatedProperty);
export default EnumerationDeprecatedProperty;
