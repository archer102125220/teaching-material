export default defineEventHandler((event) => {
  try {
    const cookies = parseCookies(event);
    return cookies;
  } catch (error) {
    return error;
  }
});
