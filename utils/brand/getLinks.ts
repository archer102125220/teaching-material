// Copyright 2019-2023, University of Colorado Boulder

/**
 * Links for the AboutDialog, used in phet brand and phet-io brand since they are the same for both.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 * @author Chris Klusendorf (PhET Interactive Simulations)
 */

import type TReadOnlyProperty from '@/utils/axon/TReadOnlyProperty';
import { type Locale } from '@/i18n/joist/localeProperty';
import JoistStrings from '@/utils/joist/JoistStrings';
import brand from '@/utils/brand/brand';

const termsPrivacyAndLicensingStringProperty = JoistStrings.termsPrivacyAndLicensingStringProperty;
const translationCreditsLinkStringProperty = JoistStrings.translation.credits.linkStringProperty;
const thirdPartyCreditsLinkStringProperty = JoistStrings.thirdParty.credits.linkStringProperty;

export type LinkObject = {
  textStringProperty: TReadOnlyProperty<string>;
  url: string;
};

const getLinks = (simName: string, locale: Locale): LinkObject[] => {
  return [
    {
      textStringProperty: termsPrivacyAndLicensingStringProperty,
      url: 'https://phet.colorado.edu/en/licensing/html'
    },
    {
      textStringProperty: translationCreditsLinkStringProperty,
      url: `https://phet.colorado.edu/translation-credits?simName=${encodeURIComponent(simName)}&locale=${encodeURIComponent(locale)}`
    },
    {
      textStringProperty: thirdPartyCreditsLinkStringProperty,
      url: `https://phet.colorado.edu/third-party-credits?simName=${encodeURIComponent(simName)}&locale=${encodeURIComponent(locale)}#${simName}`
    }
  ];
};

brand.register('getLinks', getLinks);
export default getLinks;