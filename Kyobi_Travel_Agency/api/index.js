import { URL } from 'url';

export default async function handler(req, res) {
  try {
    // Resolve relative path cleanly
    const serverDistUrl = new URL('../dist/kyobi-travel-agency/server/server.mjs', import.meta.url).href;
    
    // Import the compiled angular server module
    const module = await import(serverDistUrl);
    
    // In Angular 19, the direct request handler can be explicitly passed or invoked.
    // If serverApp() expects a web Request, we use the standard default or reqHandler fallback natively.
    const serverApp = module.reqHandler || module.default || module.app;
    
    // Ensure we handle both standard Node.js request signatures or web request formats 
    if (typeof serverApp === 'function' && serverApp.length <= 1) {
      // If it expects a single argument (like a Web Request), we invoke its fallback sub-method
      const appHandler = module.app ? module.app() : serverApp;
      return appHandler(req, res);
    }
    
    // Otherwise pass standard Node req/res signature directly
    const appHandler = typeof serverApp === 'function' ? serverApp : serverApp();
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
