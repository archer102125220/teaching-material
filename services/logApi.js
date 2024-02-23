export function POST_log(payload) {
  const { $axios } = useNuxtApp();

  return $axios.post(
    'https://resume-web-orpin.vercel.app/api/app-log',
    payload
  );
}

export function POST_errorLog(payload) {
  const { $axios } = useNuxtApp();

  return $axios.post(
    'https://resume-web-orpin.vercel.app/api/app-error-log',
    payload
  );
}
