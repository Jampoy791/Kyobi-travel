import path from 'path';

export default async function handler(req, res) {
  try {
    // Dynamically reference the exact runtime path inside Vercel's isolated container
    const serverDistPath = path.join(process.cwd(), 'dist/kyobi-travel-agency/server/server.mjs');
    
    // Import the main compiled angular bundle
    const module = await import(serverDistPath);
    
    // Fall back through Angular 19's server module exports
    const serverApp = module.reqHandler || module.default || module.app;
    
    const appHandler = typeof serverApp === 'function' ? serverApp() : serverApp;
    
    return appHandler(req, res);
  } catch (error) {
    console.error('Angular SSR Runtime Error Trace:', error);
    return res.status(500).json({
      error: 'Angular SSR Runtime Failure',
      message: error.message,
      stack: error.stack
    });
  }
}
