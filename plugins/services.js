import * as nuxtServer from '@/services/nuxtServer';
import * as logApi from '@/services/logApi';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      nuxtServer,
      logApi
    }
  };
});
