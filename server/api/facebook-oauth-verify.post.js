import { request } from '@/utils/request';

const runtimeConfig = useRuntimeConfig();

const APP_ID = runtimeConfig.public.FACEBOOK_APP_ID;

// https://stackoverflow.com/questions/70114224/how-to-verify-facebook-login-access-token-from-node-js
// https://developers.facebook.com/docs/graph-api/overview
export default defineEventHandler(async (event) => {

  const { accessToken } = await readBody(event);

  const url = `https://graph.facebook.com/me?client_id=${APP_ID}&access_token=${accessToken}`;
  const reslut = await request.get(url);

  console.log({ url, reslut });

  return { success: true };
});
