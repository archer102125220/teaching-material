import { request } from '@/utils/request';

// const runtimeConfig = useRuntimeConfig();

// const CLIENT_ID = runtimeConfig.public.LINE_CLIENT_ID;
// const CLIENT_SECRET = runtimeConfig.public.LINE_CLIENT_SECRET;
// const CALLBACK_URI = runtimeConfig.public.LINE_CALLBACK_URI;

// https://developers.line.biz/en/reference/line-login/#verify-access-token-http-request
export default defineEventHandler(async (event) => {

  const { accessToken } = await readBody(event);

  const url = 'https://api.line.me/oauth2/v2.1/verify';
  const reslut = await request.get(url, { access_token: accessToken });

  console.log({ url, reslut });

  return { success: true };
});
