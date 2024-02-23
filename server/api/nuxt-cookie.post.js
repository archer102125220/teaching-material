export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    Object.keys(body).forEach((key) => {
      if (body === '__cookie_seting__') return;
      const cookieSeting = body.__cookie_seting__ || { httpOnly: true };
      setCookie(event, key, body[key], cookieSeting);
    });

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
});
