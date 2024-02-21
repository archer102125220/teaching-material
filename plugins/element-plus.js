// 引入element样式文件
// import 'element-plus/dist/index.css';

// 按需引入element组件
import { ElConfigProvider, ElDatePicker } from 'element-plus';

// import zhTW from 'element-plus/dist/locale/zh-tw.mjs'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElConfigProvider);
  nuxtApp.vueApp.use(ElDatePicker);
});
