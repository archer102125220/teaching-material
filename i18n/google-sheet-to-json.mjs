import '@babel/register';

import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import flat from 'flat';
import fsExtra from 'fs-extra';
import { extractSheets } from 'spreadsheet-to-json';
import vuetifyZhHant from 'vuetify/lib/locale/zh-Hant.mjs';
import vuetifyEn from 'vuetify/lib/locale/en.mjs';
import elementPlusZhTW from 'element-plus/dist/locale/zh-tw.mjs';
import elementPlusEn from 'element-plus/dist/locale/en.mjs';

import credentials from '../google-key/isu-member-90f333a85fc9.mjs';

const { unflatten } = flat;

const __dirname = dirname(fileURLToPath(import.meta.url));

const I18N_DIR = join(__dirname, './');

const sheetsToExtract = [
  'System',
  'Index',
  'Reserve Room',
  'Follow Player',
  'Latest News',
  'Recommend Store',
  'Login',
  'Sign up',
  'Forgot password',
  'Member information',
  'Reset Password',
  'Member information new phone',
  'Collect stamps',
  'Points',
  'Coupons',
  'Modify registered phone number',
  'Member guide'
];

// https://docs.google.com/spreadsheets/d/19p-Go-ZUq95LXndHi4qaz-T5wgbFmv2u/edit#gid=1207512908
// https://docs.google.com/spreadsheets/d/1TsWT38xE_OloRfF6BZqyPmSm4LuVgQ8ImCH08BCJ_Xw/edit?pli=1#gid=29526360

extractSheets(
  {
    spreadsheetKey: '1TsWT38xE_OloRfF6BZqyPmSm4LuVgQ8ImCH08BCJ_Xw',
    credentials,
    sheetsToExtract
  },
  function (err, data) {
    if (err) throw err;
    const en = {
      system: {
        titleTemplate: 'Online textbook test',
        frontPage: 'home page',
        emptyData: 'No data available',
        pagination:
          'Displaying search results from $__start__$ to $__end__$, total $__total__$ results.',
        positionError: 'Please obtain current location permission',
        copyright: 'Copyright © 2023 I See You Taiwan Hostel  Alliance.',
        selectOrtherabel: '(and other $___num___$ items)'
      },
      navList: {
        reserveRoom: 'Reserve Room',
        followPlayer: 'Follow Player',
        latestNews: 'Latest News',
        recommendStore: 'Top Picks',
        mall: 'Mall',
        login: 'Sign in',
        name: 'Name'
      },
      footer: {
        navigation: 'Navigation',
        follow_us: 'Follow us',
        facebook_page: 'Facebook Page',
        cooperation: 'Cross-industry cooperation',
        contact_us: 'Contact us'
      },
      login: {
        pageTitle: 'Sign in'
      },
      sign_up: {
        pageTitle: 'Sign up',
        titleTemplate: 'Become a member of I See You',
        Third_PartyLoginPageTitle: 'Third-party login',
        Third_PartyLoginTitleTemplate: 'Login with third-party'
      },
      forgot_password: {
        pageTitle: 'Forgot'
      },
      coupons: {
        pageTitle: 'Coupons'
      },
      member_information: {
        pageTitle: 'Member Info',
        titleTemplate: 'Member exclusive area'
      },
      reset_password: {
        pageTitle: 'New Password'
      },
      modify_registered_phone_number: {
        pageTitle: 'Change phone number'
      },
      member_information_new_phone: {
        pageTitle: 'Change phone number'
      },
      points: {
        pageTitle: 'Points'
      },
      collect_stamps: {
        pageTitle: 'Stamps'
      },
      reserve_room: {
        pageTitle: 'Reserve Room',
        titleTemplate: 'I See You Taiwan Hostel  Alliance - Reserve Room'
      },
      follow_player: {
        pageTitle: 'Follow Player',
        titleTemplate: 'I See You Taiwan Hostel  Alliance - Follow Player',
        seoTitleTemplate: 'I See You Taiwan Hostel  Alliance Follow Player -'
      },
      latest_news: {
        pageTitle: 'Latest News',
        titleTemplate: 'I See You Taiwan Hostel  Alliance - Latest News',
        seoTitleTemplate: 'I See You Taiwan Hostel  Alliance Latest News -'
      },
      recommend_store: {
        pageTitle: 'Recommend Store',
        titleTemplate: 'I See You Taiwan Hostel  Alliance - Recommend Store'
      },
      $vuetify: vuetifyEn,
      ...elementPlusEn
    };
    const zhTw = {
      system: {
        titleTemplate: '線上教材測試',
        frontPage: '首頁',
        emptyData: '尚無資料',
        pagination:
          '顯示第 $__start__$ -  $__end__$ 筆搜尋結果，共 $__total__$ 筆',
        positionError: '請允許取得當前位置權限',
        copyright: 'Copyright © 2023 愛嬉遊臺灣青年旅館聯盟. 版權所有。',
        selectOrtherabel: '(以及其他$___num___$項)'
      },
      navList: {
        reserveRoom: '訂房去',
        followPlayer: '玩家帶路',
        latestNews: '最新消息',
        recommendStore: '好康推薦',
        mall: '商城',
        login: '登入',
        name: '姓名'
      },
      footer: {
        navigation: '網站功能',
        follow_us: '關注我們',
        facebook_page: 'Facebook 粉專',
        cooperation: '異業合作',
        contact_us: '聯絡我們'
      },
      login: {
        pageTitle: '登入'
      },
      sign_up: {
        pageTitle: '註冊',
        titleTemplate: '加入愛嬉遊',
        Third_PartyLoginPageTitle: '第三方註冊',
        Third_PartyLoginTitleTemplate: '愛嬉遊第三方帳號服務'
      },
      forgot_password: {
        pageTitle: '忘記密碼'
      },
      coupons: {
        pageTitle: '優惠券'
      },
      member_information: {
        pageTitle: '會員資訊',
        titleTemplate: '愛嬉遊會員專區'
      },
      reset_password: {
        pageTitle: '重設密碼'
      },
      modify_registered_phone_number: {
        pageTitle: '更換手機號碼'
      },
      member_information_new_phone: {
        pageTitle: '更換手機號碼'
      },
      points: {
        pageTitle: '點數'
      },
      collect_stamps: {
        pageTitle: '集章'
      },
      reserve_room: {
        pageTitle: '訂房去',
        titleTemplate: '愛嬉遊臺灣青年旅館聯盟-訂房去專區'
      },
      follow_player: {
        pageTitle: '玩家帶路',
        titleTemplate: '愛嬉遊臺灣青年旅館聯盟-玩家帶路專區',
        seoTitleTemplate: '愛嬉遊玩家帶路專區 -'
      },
      latest_news: {
        pageTitle: '最新消息',
        titleTemplate: '愛嬉遊臺灣青年旅館聯盟-最新消息專區',
        seoTitleTemplate: '愛嬉遊最新消息專區 -'
      },
      recommend_store: {
        pageTitle: '好康推薦',
        titleTemplate: '愛嬉遊臺灣青年旅館聯盟-好康推薦專區'
      },
      $vuetify: vuetifyZhHant,
      ...elementPlusZhTW
    };

    sheetsToExtract.forEach(function (_sheetsToExtract) {
      const sheets = data[_sheetsToExtract] || [];
      sheets.forEach(function (_sheets) {
        if (_sheets.key !== null) {
          const key = (_sheetsToExtract + '.' + _sheets.key)
            .replaceAll(/\s/g, '_')
            .toLocaleLowerCase();

          const sheetsZhTw = _sheets['zh-TW'];
          const sheetsEn = _sheets['en-US'];
          const defaultLang = sheetsZhTw || '';
          en[key] = sheetsEn || defaultLang;
          zhTw[key] = sheetsZhTw || defaultLang;
        }
      });
    });

    const output = [
      { lang: en, file: 'locales/en.json' },
      { lang: zhTw, file: 'locales/zh-tw.json' }
    ];
    output.forEach(function (_lang) {
      fsExtra.ensureDirSync(dirname(resolve(I18N_DIR, _lang.file)));
      fsExtra.writeJSONSync(
        resolve(I18N_DIR, _lang.file),
        unflatten(_lang.lang, { object: true }),
        { spaces: 2 }
      );
    });
  }
);
