import path from 'path';

export default async function handler(req, res) {
  try {
    // Resolve the exact absolute path inside the Vercel container lambda
    const serverPath = path.join(process.cwd(), 'dist/kyobi-travel-agency/server/server.mjs');
    
    // Dynamically import the Angular SSR server engine
    const server = await import(serverPath);
    
    // Safely extract the active server request handler fallback
    const requestHandler = server.reqHandler || server.default || server.app();
    
    return requestHandler(req, res);
  } catch (error) {
    console.error('Angular SSR Serverless Wrapper Error:', error);
    return res.status(500).send('Internal Server Error: Execution Failed');
  }
}
