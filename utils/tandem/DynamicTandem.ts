// Copyright 2019-2023, University of Colorado Boulder

/**
 * A tandem for a dynamic element that stores the name of the archetype that defines its dynamic element's schema.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Chris Klusendorf (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import type StrictOmit from '@/utils/phet-core/types/StrictOmit';
import Tandem, { type TandemOptions } from '@/utils/tandem/Tandem';
import tandemNamespace from '@/utils/tandem/tandemNamespace';
import optionize, { type EmptySelfOptions } from '@/utils/phet-core/optionize';
import TandemConstants from '@/utils/tandem/TandemConstants';

type DynamicTandemOptions = StrictOmit<TandemOptions, 'isValidTandemName'>;

class DynamicTandem extends Tandem {

  public constructor(parentTandem: Tandem, name: string, providedOptions?: DynamicTandemOptions) {
    window.assert && window.assert(parentTandem, 'DynamicTandem must have a parentTandem');
    const options = optionize<DynamicTandemOptions, EmptySelfOptions, TandemOptions>()({
      isValidTandemName: (name: string) => Tandem.getRegexFromCharacterClass(TandemConstants.BASE_DYNAMIC_TANDEM_CHARACTER_CLASS).test(name)
    }, providedOptions);
    super(parentTandem, name, options);
  }
}

tandemNamespace.register('DynamicTandem', DynamicTandem);
export default DynamicTandem;