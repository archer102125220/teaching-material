<template>
  <div class="geometric_optics_root" :style="cssVariable">
    <div ref="geometricOpticsEl" :class="className" />
  </div>
</template>
<script setup>
import _get from 'lodash/get';

import localeInfo from '@/assets/chipper/localeInfo';

// import FlatQueue from '@/utils/sherpa/lib/flatqueue-1.2.1';
import '@/utils/sherpa/lib/flatqueue-1.2.1';
// import {
//   TextEncoderLite,
//   TextDecoderLite
// } from '@/utils/sherpa/lib/TextEncoderLite-3c9f6f0';
import '@/utils/sherpa/lib/TextEncoderLite-3c9f6f0';
// import {
//   byteLength,
//   toByteArray,
//   fromByteArray
// } from '@/utils/sherpa/lib/base64-js-1.2.0';
import '@/utils/sherpa/lib/base64-js-1.2.0';
// import seedrandom from '@/utils/sherpa/lib/seedrandom-2.4.2';
import '@/utils/sherpa/lib/seedrandom-2.4.2';
// import { paperInit } from '@/utils/sherpa/lib/paper-js-0.12.17';
import '@/utils/sherpa/lib/paper-js-0.12.17';
// import { heInit } from '@/utils/sherpa/lib/he-1.1.1';
import '@/utils/sherpa/lib/he-1.1.1';
// import FileSaver from '@/utils/sherpa/lib/FileSaver-b8054a2';
import '@/utils/sherpa/lib/FileSaver-b8054a2';
// import LineBreaker from '@/utils/sherpa/lib/linebreak-1.1.0';
import '@/utils/sherpa/lib/linebreak-1.1.0';
import '@/utils/chipper/initialize-globals';
// import { initializeGlobals } from '@/utils/chipper/initialize-globals';
import { splash } from '@/utils/joist/splash';
import '@/utils/assert/assert';
// import { createAssert } from '@/utils/assert/assert';
// import { handlePhetioIDUtils } from '@/utils/tandem/PhetioIDUtils';
import '@/utils/tandem/PhetioIDUtils';
// import { handlePhetioCompareAPIs } from '@/utils/chipper/phet-io/phetioCompareAPIs';
import '@/utils/chipper/phet-io/phetioCompareAPIs';
import '@/i18n/handlePhetLocale';
// import { SimVersion } from '@/utils/perennial-alias/SimVersion';
import { GeometricOpticsInit } from '@/utils/geometric-optics/geometric-optics-main';

const localeJsonModules = import.meta.glob('@/assets/json/**/*.json');

// window.FlatQueue = FlatQueue;
// paperInit(self);
// heInit(window);
// window.TextEncoderLite = TextEncoderLite;
// window.TextDecoderLite = TextDecoderLite;
// window.seedrandom = seedrandom;
// window.saveAs = FileSaver;
// window.LineBreaker = LineBreaker;
// window.byteLength = byteLength;
// window.toByteArray = toByteArray;
// window.fromByteArray = fromByteArray;
// initializeGlobals();
// createAssert();
// handlePhetioIDUtils();
// handlePhetioCompareAPIs();
// window.phet.preloads = window.phet?.preloads || { chipper: {} };
// window.phet.preloads.chipper.SimVersion = SimVersion;
// window.phet.chipper.packageObject = {
//   name: 'geometric-optics',
//   version: '1.4.0-dev.2',
//   license: 'GPL-3.0',
//   phet: {
//     requirejsNamespace: 'GEOMETRIC_OPTICS',
//     simulation: true,
//     runnable: true,
//     supportedBrands: ['phet', 'phet-io', 'adapted-from-phet'],
//     simFeatures: {
//       supportsSound: true,
//       supportsInteractiveDescription: true,
//       supportsDynamicLocale: true,
//       colorProfiles: ['default']
//     },
//     phetLibs: [],
//     'phet-io': {
//       compareDesignedAPIChanges: true
//     },
//     supportsOutputJS: true,
//     published: true,
//     screenNameKeys: [
//       'GEOMETRIC_OPTICS/screen.lens',
//       'GEOMETRIC_OPTICS/screen.mirror'
//     ]
//   }
// };

// const { $i18n } = useNuxtApp();

const props = defineProps({
  height: { type: String, default: '80vh' },
  width: { type: String, default: null },
  className: { type: [String, Array, Object], default: null }
});
const emit = defineEmits(['loading']);

const geometricOptics = ref(null);
const geometricOpticsEl = ref(null);
// const geometricOpticsModule = ref(null);
const locale = ref(null);
const localeListData = ref(null);
const localeListMetadata = ref(null);

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (typeof props.height === 'string') {
    _cssVariable['--geometric_optics_height'] = props.height;
  }

  if (typeof props.width === 'string') {
    _cssVariable['--geometric_optics_width'] = props.width;
  }

  return _cssVariable;
});
const className = computed(() => {
  const _className = ['geometric_optics_root-el'];

  if (typeof props.className === 'string') {
    _className.push(props.className);
  } else if (Array.isArray(props.className) && props.className.length > 0) {
    _className.push(...props.className);
  } else if (typeof props.className === 'object' && props.className !== null) {
    Object.keys(props.className).forEach((key) => {
      if (props.className[key] !== false) {
        _className.push(key);
      }
    });
  }

  return _className;
});

async function handleLoadGeometricOptics(container) {
  emit('loading', true);
  // const [
  //   { FlatQueue },
  //   { TextEncoderLite, TextDecoderLite },
  //   { byteLength, toByteArray, fromByteArray },
  //   { default: seedrandom },
  //   { paperInit },
  //   { default: heInit },
  //   { default: FileSaver },
  //   { default: LineBreaker },
  //   { initializeGlobals },
  //   { splash },
  //   { createAssert },
  //   { handlePhetioIDUtils },
  //   { handlePhetioCompareAPIs },
  //   { SimVersion },
  //   {
  //     locale: _locale,
  //     localeListData: _localeListData,
  //     localeListMetadata: _localeListMetadata
  //   }
  // ] = await Promise.all([
  //   import('@/utils/sherpa/lib/flatqueue-1.2.1'),
  //   import('@/utils/sherpa/lib/TextEncoderLite-3c9f6f0'),
  //   import('@/utils/sherpa/lib/base64-js-1.2.0'),
  //   import('@/utils/sherpa/lib/seedrandom-2.4.2'),
  //   import('@/utils/sherpa/lib/paper-js-0.12.17'),
  //   import('@/utils/sherpa/lib/he-1.1.1'),
  //   import('@/utils/sherpa/lib/FileSaver-b8054a2'),
  //   import('@/utils/sherpa/lib/linebreak-1.1.0'),
  //   import('@/utils/chipper/initialize-globals'),
  //   import('@/utils/joist/splash'),
  //   import('@/utils/assert/assert'),
  //   import('@/utils/tandem/PhetioIDUtils'),
  //   import('@/utils/chipper/phet-io/phetioCompareAPIs'),
  //   import('@/utils/perennial-alias/SimVersion'),
  //   handleLocale()
  // ]);

  const {
    locale: _locale,
    localeListData: _localeListData,
    localeListMetadata: _localeListMetadata
  } = await handleLocale();
  locale.value = _locale;
  localeListData.value = _localeListData;
  localeListMetadata.value = _localeListMetadata;

  splash(container);
  // splash();

  // if (typeof window.phet?.chipper === 'object') {
  //   window.phet.chipper.locale = $i18n.locale.value.includes('zh')
  //     ? 'zh_TW'
  //     : 'en';
  //   window.phet.chipper.strings = locale.value;
  //   window.phet.chipper.stringMetadata =
  //     localeListMetadata.value[
  //       $i18n.locale.value.includes('zh') ? 'zh_TW' : 'en'
  //     ];
  // }
  // window.phet_container = container;

  // const [
  //   { default: simLauncher },
  //   { default: GOSim },
  //   { default: GeometricOpticsStrings }
  // ] = await Promise.all([
  //   import('@/utils/joist/simLauncher'),
  //   import('@/utils/geometric-optics/GeometricOpticsStrings'),
  //   import('@/utils/geometric-optics/GOSim'),
  //   import('@/utils/phet-core/asyncLoader'),
  //   import('@/utils/tandem/Tandem'),
  //   import('@/utils/joist/joist')
  // ]);

  try {
    await handleGeometricOptics(container);
  } catch (error) {
    console.log(44444);
    console.log(error);
  }
  // setTimeout(
  //   () =>
  //     GeometricOpticsInit(
  //       simLauncher,
  //       GOSim,
  //       GeometricOpticsStrings,
  //       container
  //     ),
  //   5000
  // );

  emit('loading', false);
}

function handleGeometricOptics(container) {
  console.log('handleGeometricOptics');

  // geometricOptics.value = await _geometricOpticsModule.getGeometricOptics();
  geometricOptics.value = GeometricOpticsInit(container);
  // geometricOptics.value = await _geometricOpticsModule.GeometricOpticsInit();

  console.log(
    'handleGeometricOptics _geometricOpticsModule.GeometricOpticsInit'
  );
  // geometricOptics.value = await _geometricOpticsModule.GeometricOpticsInit();
}
// async function handleGeometricOptics(container) {
//   console.log('handleGeometricOptics');
//   const _geometricOpticsModule = await import(
//     '@/utils/geometric-optics/geometric-optics-main'
//   );
//   console.log({ _geometricOpticsModule });

//   // geometricOptics.value = await _geometricOpticsModule.getGeometricOptics();
//   geometricOptics.value =
//     await _geometricOpticsModule.GeometricOpticsInit(container);
//   // geometricOptics.value = await _geometricOpticsModule.GeometricOpticsInit();
//   console.log(
//     'handleGeometricOptics _geometricOpticsModule.GeometricOpticsInit'
//   );
//   // geometricOptics.value = await _geometricOpticsModule.GeometricOpticsInit();

//   geometricOpticsModule.value = _geometricOpticsModule;
// }

// function GeometricOpticsInit(
//   simLauncher,
//   GOSim,
//   GeometricOpticsStrings,
//   container
// ) {
//   return new Promise((resolve, reject) => {
//     try {
//       simLauncher.launch(() => {
//         const sim = new GOSim(
//           GeometricOpticsStrings['geometric-optics'].titleStringProperty,
//           {
//             isBasicsVersion: false,
//             phetioDesigned: true
//           },
//           { container }
//         );
//         sim.start();
//         resolve({ simLauncher, sim });
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

async function handleLocale(_localeList) {
  // "joist","geometric-optics","scenery-phet","sun"

  if (locale.value !== null) {
    return locale.value;
  }
  const promiseList = {};
  const _localeListData = {};
  const _locale = {};
  const _localeListMetadata = {};

  const localeList = _localeList || [
    'en',
    'am',
    'ar_MA',
    'ar_SA',
    'ar',
    'az',
    'be',
    'bg',
    'bn',
    'bs',
    'ca',
    'cs',
    'da',
    'de',
    'el',
    'en',
    'es_PE',
    'es',
    'eu',
    'fa',
    'fi',
    'fr',
    'ga',
    'gu',
    'ha',
    'hi',
    'hr',
    'hu',
    'hy',
    'ig',
    'it',
    'iw',
    'ja',
    'ka',
    'ko',
    'lg',
    'lt',
    'mi',
    'mn',
    'ms',
    'mt',
    'nl',
    'ny',
    'om',
    'pl',
    'ps',
    'pt_BR',
    'pt',
    'ro',
    'ru',
    'rw',
    'sk',
    'sl',
    'sq',
    'sr',
    'st',
    'sv',
    'sw',
    'ta',
    'te',
    'th',
    'tk',
    'tr',
    'tw',
    'uk',
    'uz',
    'vi',
    'yo',
    'zh_CN',
    'zh_TW',
    'zu'
  ];
  localeList.forEach((element) => {
    promiseList[element] = {
      joist: handleImportLocale(
        `/assets/json/joist/joist-strings_${element}.json`,
        '/assets/json/_generated_development_strings/joist-all.json',
        '/assets/json/joist/joist-strings_zh_TW.json',
        element
      ),
      geometricOptics: handleImportLocale(
        `/assets/json/joist/joist-strings_${element}.json`,
        '/assets/json/_generated_development_strings/geometric-optics_all.json',
        '/assets/json/geometric-optics/geometric-optics-strings_zh_TW.json',
        element
      ),
      sceneryPhet: handleImportLocale(
        `/assets/json/scenery-phet/scenery-phet-strings_${element}.json`,
        '/assets/json/_generated_development_strings/scenery-phet_all.json',
        '/assets/json/scenery-phet/scenery-phet-strings_zh_TW.json',
        element
      ),
      sun: handleImportLocale(
        `/assets/json/sun/sun-strings_${element}.json`,
        '/assets/json/_generated_development_strings/sun_all.json',
        '/assets/json/sun/sun-strings_zh_TW.json',
        element
      )
    };
  });

  for (let i = 0; i < localeList.length; i++) {
    const element = localeList[i];
    const isRTL = localeInfo[element].direction === 'rtl';

    const [joist, geometricOptics, sceneryPhet, sun] = await Promise.all([
      promiseList[element].joist,
      promiseList[element].geometricOptics,
      promiseList[element].sceneryPhet,
      promiseList[element].sun
    ]);

    // console.log({ joist, geometricOptics, sceneryPhet, sun });

    _localeListData[element] = {
      joist,
      geometricOptics,
      sceneryPhet,
      sun
    };

    const _joist = handleLocaleKey('JOIST', joist, isRTL);
    const _geometricOptics = handleLocaleKey(
      'GEOMETRIC_OPTICS',
      geometricOptics,
      isRTL
    );
    const _sceneryPhet = handleLocaleKey('SCENERY_PHET', sceneryPhet, isRTL);
    const _sun = handleLocaleKey('SUN', sun, isRTL);

    _locale[element] = {
      ..._joist.locale,
      ..._geometricOptics.locale,
      ..._sceneryPhet.locale,
      ..._sun.locale
    };

    // if (element === 'zh_TW') {
    //   console.log(_joist.locale);
    // }

    _localeListMetadata[element] = {
      ..._joist.localeMetadata,
      ..._geometricOptics.localeMetadata,
      ..._sceneryPhet.localeMetadata,
      ..._sun.localeMetadata
    };
  }

  return {
    locale: _locale,
    localeListData: _localeListData,
    localeListMetadata: _localeListMetadata
  };
}

async function handleImportLocale(
  localePath,
  localeAllPath,
  defaultLocalePath,
  lang = 'zh_TW'
) {
  let localeData = {};
  try {
    if (typeof localeJsonModules[localePath] === 'function') {
      const { default: _default } = await localeJsonModules[localePath]();
      localeData = _default;
    } else if (typeof localeJsonModules[defaultLocalePath] === 'function') {
      const { default: _default } =
        await localeJsonModules[defaultLocalePath]();
      localeData = _default;
    }

    if (typeof localeJsonModules[localeAllPath] === 'function') {
      const { default: _default } = await localeJsonModules[localeAllPath]();
      localeData = {
        ...localeData,
        ...(_default?.[lang] || _default?.zh_TW || {})
      };
    }
  } catch (error) {
    console.log({ error, localePath, defaultLocalePath });
  }

  return localeData;
}

function handleLocaleKey(
  prefix = '',
  localeObj = {},
  isRTL = false,
  key = '',
  keyRecursion = '',
  localeRecursion = {},
  localeMetadataRecursion = {}
) {
  const _localeObj = key === '' ? localeObj : _get(localeObj, key, {});
  const localeObjKeyList = Object.keys(_localeObj);

  for (let i = 0; i < localeObjKeyList.length; i++) {
    const objKey = localeObjKeyList[i];

    if (
      Array.isArray(_localeObj[objKey]) === true &&
      typeof _localeObj[objKey][0]?.newValue === 'string'
    ) {
      localeRecursion[keyRecursion] = handleDirectionalFormatting(
        _localeObj[objKey][0]?.newValue,
        isRTL
      );
    } else if (typeof _localeObj[objKey] === 'object') {
      if (
        keyRecursion !== '' &&
        typeof localeRecursion[keyRecursion] === 'object'
      ) {
        localeRecursion[keyRecursion] = undefined;
        delete localeRecursion[keyRecursion];
      }
      const _keyRecursion =
        key === '' && prefix !== ''
          ? `${prefix.toUpperCase()}/${objKey}`
          : keyRecursion !== ''
            ? `${keyRecursion}.${objKey}`
            : objKey;
      localeRecursion = handleLocaleKey(
        `${prefix.toUpperCase()}/`,
        localeObj,
        isRTL,
        key === '' ? objKey : `${key}.${objKey}`,
        _keyRecursion,
        localeRecursion,
        localeMetadataRecursion
      ).locale;
      if (_localeObj[objKey].metadata) {
        localeMetadataRecursion[_keyRecursion] = _localeObj[objKey].metadata;
      }
    } else if (typeof _localeObj[objKey] === 'string') {
      localeRecursion[keyRecursion] = handleDirectionalFormatting(
        _localeObj[objKey],
        isRTL
      );
    }
  }

  return { locale: localeRecursion, localeMetadata: localeMetadataRecursion };
}

function handleDirectionalFormatting(str, isRTL) {
  if (str.length > 0) {
    return `${(isRTL ? '\u202b' : '\u202a') + str}\u202c`;
  } else {
    return str;
  }
}

onMounted(() => {
  handleLoadGeometricOptics(geometricOpticsEl.value);
  // handleLoadGeometricOptics();
});
</script>

<style lang="scss" scoped>
.geometric_optics_root {
  width: var(--geometric_optics_width);
  height: var(--geometric_optics_height);
  position: relative;
  &-el {
    width: 100%;
    height: 100%;
  }
}
</style>
