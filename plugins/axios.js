import { axiosInit } from '@/utils/request';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  return {
    provide: {
      axios: axiosInit(runtimeConfig.public.API_BASE_URL),
    },
  };
});
