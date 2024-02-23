import { OAuth2Client } from 'google-auth-library';

const runtimeConfig = useRuntimeConfig();

const CLIENT_ID = runtimeConfig.public.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

export default defineEventHandler(async (event) => {
  const { accessToken } = await readBody(event);

  const ticket = await client.verifyIdToken({
    idToken: accessToken,
    audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    // [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  console.log(payload);
  // const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  return { success: true };
});
