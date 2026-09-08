import { URL } from 'url';

export default async function handler(req, res) {
  try {
    // Resolve relative path cleanly regardless of root system casing variations
    const serverDistUrl = new URL('../dist/kyobi-travel-agency/server/server.mjs', import.meta.url).href;
    
    // Import the main compiled angular server bundle
    const module = await import(serverDistUrl);
    
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
