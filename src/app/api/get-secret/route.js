export async function GET() {
  const jsKey = process.env.JS_KEY;
  const applicationId = process.env.APPLICATION_ID;
  const serverUrl = process.env.SERVER_URL;

  return Response.json({ jsKey, applicationId, serverUrl });
}
