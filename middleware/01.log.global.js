export default defineNuxtRouteMiddleware(() => {
  if (process.client) return;
  const url = useRequestURL();
  const headers = useRequestHeaders();

  console.log(`user-agent: ${headers['user-agent']}`);
  console.log(`accept-language: ${headers['accept-language']}`);
  console.log(`referer: ${headers.referer}`);
  console.log(`host: ${headers.host}`);
  console.log(`url: ${url.href}`);

  // const h = useRequestHeaders(['x-forwarded-for', 'x-real-ip', 'user-agent']);
  // console.log(h);
});
