import phetLocale from '@/assets/locales/phetLocale.json';
import { SimVersion } from '@/utils/perennial-alias/SimVersion';

export function handlePhetLocale() {
  window.phet.preloads = window.phet?.preloads || { chipper: {} };
  window.phet.preloads.chipper.SimVersion = SimVersion;
  window.phet.chipper.packageObject = {
    name: 'geometric-optics',
    version: '1.4.0-dev.2',
    license: 'GPL-3.0',
    phet: {
      requirejsNamespace: 'GEOMETRIC_OPTICS',
      simulation: true,
      runnable: true,
      supportedBrands: ['phet', 'phet-io', 'adapted-from-phet'],
      simFeatures: {
        supportsSound: true,
        supportsInteractiveDescription: true,
        supportsDynamicLocale: true,
        colorProfiles: ['default']
      },
      phetLibs: [],
      'phet-io': {
        compareDesignedAPIChanges: true
      },
      supportsOutputJS: true,
      published: true,
      screenNameKeys: [
        'GEOMETRIC_OPTICS/screen.lens',
        'GEOMETRIC_OPTICS/screen.mirror'
      ]
    }
  };

  window.phet.chipper.locale = 'zh_TW';
  window.phet.chipper.strings = phetLocale.locale;
  window.phet.chipper.stringMetadata = phetLocale.localeListMetadata.zh_TW;
}

if (typeof window === 'object') {
  handlePhetLocale();
}

export default handlePhetLocale;
