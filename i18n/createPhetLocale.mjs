import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
// import flat from 'flat';
import fsExtra from 'fs-extra';
import _ from 'lodash';

import localeInfo from '../assets/chipper/localeInfo.mjs';

// const { unflatten } = flat;

const __dirname = dirname(fileURLToPath(import.meta.url));

const PHET_LOCALE_DIR = join(__dirname, './../assets/locales');
const PHET_LOCALE_NAME = 'phetLocale.json';

export async function createPhetLocale(_localeList) {
  // "joist","geometric-optics","scenery-phet","sun"

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
        `@/assets/json/joist/joist-strings_${element}.json`,
        '@/assets/json/_generated_development_strings/joist-all.json',
        '@/assets/json/joist/joist-strings_zh_TW.json',
        element
      ),
      geometricOptics: handleImportLocale(
        `@/assets/json/joist/joist-strings_${element}.json`,
        '@/assets/json/_generated_development_strings/geometric-optics_all.json',
        '@/assets/json/geometric-optics/geometric-optics-strings_zh_TW.json',
        element
      ),
      sceneryPhet: handleImportLocale(
        `@/assets/json/scenery-phet/scenery-phet-strings_${element}.json`,
        '@/assets/json/_generated_development_strings/scenery-phet_all.json',
        '@/assets/json/scenery-phet/scenery-phet-strings_zh_TW.json',
        element
      ),
      sun: handleImportLocale(
        `@/assets/json/sun/sun-strings_${element}.json`,
        '@/assets/json/_generated_development_strings/sun_all.json',
        '@/assets/json/sun/sun-strings_zh_TW.json',
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

  handleSaveLocal({
    locale: _locale,
    localeListData: _localeListData,
    localeListMetadata: _localeListMetadata
  });

  return {
    locale: _locale,
    localeListData: _localeListData,
    localeListMetadata: _localeListMetadata
  };
}

export async function handleImportLocale(
  localePath = '',
  localeAllPath = '',
  defaultLocalePath = '',
  lang = 'zh_TW'
) {
  let importArg;
  let localeData = {};
  if (typeof window === 'undefined') {
    importArg = {
      assert: {
        type: 'json'
      }
    };
    localePath = localePath.replaceAll(/\@\//g, './../');
    localeAllPath = localeAllPath.replaceAll(/\@\//g, './../');
    defaultLocalePath = defaultLocalePath.replaceAll(/\@\//g, './../');
  }
  try {
    try {
      const { default: _default } = await import(localePath, importArg);
      localeData = _default;
    } catch (localeError) {
      console.log(localeError, { localePath });
      try {
        const { default: _default } = await import(
          defaultLocalePath,
          importArg
        );
        localeData = _default;
      } catch (defaultLocaleError) {
        console.log(defaultLocaleError, { defaultLocalePath });
      }
    }

    try {
      const { default: _default } = await import(localeAllPath, importArg);
      const defaultLocaleData = _default?.[lang] || _default?.zh_TW || {};
      Array.from(
        new Set([...Object.keys(localeData), ...Object.keys(defaultLocaleData)])
      ).forEach((dataKey) => {
        if (localeData[dataKey] === null || localeData[dataKey] === undefined) {
          localeData[dataKey] = defaultLocaleData[dataKey];
        }
      });
    } catch (localeAllError) {
      console.log(localeAllError, { localeAllPath });
    }
  } catch (error) {
    console.log({ error, localePath, defaultLocalePath });
  }

  return localeData;
}

export function handleLocaleKey(
  prefix = '',
  localeObj = {},
  isRTL = false,
  key = '',
  keyRecursion = '',
  localeRecursion = {},
  localeMetadataRecursion = {}
) {
  const _localeObj = key === '' ? localeObj : _.get(localeObj, key, {});
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

export function handleDirectionalFormatting(str, isRTL) {
  if (str.length > 0) {
    return `${(isRTL ? '\u202b' : '\u202a') + str}\u202c`;
  } else {
    return str;
  }
}

export function handleSaveLocal(locale) {
  fsExtra.ensureDirSync(dirname(resolve(PHET_LOCALE_DIR, PHET_LOCALE_NAME)));
  fsExtra.writeFileSync(
    resolve(PHET_LOCALE_DIR, PHET_LOCALE_NAME),
    JSON.stringify(locale),
    {
      spaces: 2
    }
  );
}

if (typeof window === 'undefined') {
  createPhetLocale();
}
