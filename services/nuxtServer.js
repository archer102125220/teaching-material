function getHost() {
  let protocol = '';
  let host;
  if (process.server) {
    const runtimeConfig = useRuntimeConfig();
    const HTTPS = runtimeConfig.public.HTTPS;

    const url = useRequestURL();
    protocol = HTTPS ? 'https://' : 'http://';
    host = url.host || '';
  } else {
    protocol = (window?.location?.protocol || '') + '//';
    host = window?.location?.host || '';
  }
  return protocol + host;
}

export function POST_setNuxtCookie(payload) {
  const { $axios } = useNuxtApp();

  const host = getHost();
  return $axios.post(host + '/api/nuxt-cookie', payload);
}

export function GET_setNuxtCookie(payload) {
  const { $axios } = useNuxtApp();

  const host = getHost();
  return $axios.get(host + '/api/nuxt-cookie', payload);
}

export function POST_googleOAuthVerify(payload) {
  const { $axios } = useNuxtApp();

  const host = getHost();
  return $axios.post(host + '/api/google-oauth-verify', payload);
}

export function POST_facebookOAuthVerify(payload) {
  const { $axios } = useNuxtApp();

  const host = getHost();
  return $axios.post(host + '/api/facebook-oauth-verify', payload);
}

export function POST_lineAuthVerify(payload) {
  const { $axios } = useNuxtApp();

  const host = getHost();
  return $axios.post(host + '/api/line-oauth-verify', payload);
}
