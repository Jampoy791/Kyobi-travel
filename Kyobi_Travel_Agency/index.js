export default async function handler(req, res) {
  // Dynamically import the Angular SSR server engine from your dist folder
  const server = await import('../dist/kyobi-travel-agency/server/server.mjs');
  
  // Use the built-in app handler to process the Vercel request/response
  return server.app()(req, res);
}
