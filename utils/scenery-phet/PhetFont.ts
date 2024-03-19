// Copyright 2013-2024, University of Colorado Boulder

/**
 * Encapsulation of the font used for PhET simulations.
 * Provides PhET-specific defaults, and guarantees a fallback for font family.
 *
 * Sample use:
 * new PhetFont( { family: 'Futura', size: 24, weight: 'bold' } )
 * new PhetFont( 24 )
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { combineOptions } from '@/utils/phet-core/optionize';
import { Font, type FontOptions } from '@/utils/scenery/imports';
import sceneryPhet from '@/utils/scenery-phet/sceneryPhet';
import sceneryPhetQueryParameters from '@/utils/scenery-phet/sceneryPhetQueryParameters';

export default class PhetFont extends Font {

  /**
   * @param providedOptions - number or string indicate the font size, otherwise same options as phet.scenery.Font
   */
  public constructor(providedOptions?: number | string | FontOptions) {

    window.assert && window.assert(arguments.length === 0 || arguments.length === 1, 'Too many arguments');

    // convenience constructor: new PhetFont( {number|string} size )
    let options: FontOptions;
    if (typeof providedOptions === 'number' || typeof providedOptions === 'string') {
      options = { size: providedOptions };
    }
    else {
      options = providedOptions || {};
    }

    // PhET defaults
    options = combineOptions<FontOptions>({
      family: sceneryPhetQueryParameters.fontFamily!
    }, options);

    // Guarantee a fallback family
    window.assert && window.assert(options.family);

    options.family = [
      options.family,
      'sans-serif'
    ].join(', ');

    super(options);
  }
}

sceneryPhet.register('PhetFont', PhetFont);
