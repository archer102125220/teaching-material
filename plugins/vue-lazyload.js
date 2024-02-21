import VueLazyload from '@/node_modules/vue-lazyload';

// https://www.jianshu.com/p/d0aadf5cdf57
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueLazyload, {
    // preLoad: 1.33, //預加載寬高比例
    // error: errorimage, //加載失敗圖片的src
    // attempt: 2, //嘗試次數上限
    // throttleWait: 500, //節流等待時間(通過調節此值可以查看loading的效果，根據實際情況調節)
    filter: {
      // eslint-disable-next-line no-unused-vars
      progressive(listener, options) {
        if (typeof listener.src === 'string' && listener.src !== '') {
          // 實現漸進式加載圖片（先加載模糊的圖片）
          listener.el.setAttribute('lazy-progressive', 'true');
          // 先加載模糊的圖片（這裡是是替換圖片的寬度與高度大小）
          let loadingUrl = listener.src.replace(/w_[0-9]+/g, 'w_5') || '';
          loadingUrl = loadingUrl.replace(/h_[0-9]+/g, 'h_5');
          listener.loading = loadingUrl;
        }
      }
    }
  });
});
