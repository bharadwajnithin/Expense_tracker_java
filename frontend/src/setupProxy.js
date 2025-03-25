const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        // Log outgoing request
        console.log(`Proxying request to: ${req.method} ${proxyReq.path}`);
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        
        // Send a more user-friendly response
        if (!res.headersSent) {
          res.writeHead(500, {
            'Content-Type': 'application/json'
          });
          
          const json = { 
            error: 'Proxy error', 
            message: 'Cannot connect to the backend server. Please make sure the backend is running.',
            details: err.message 
          };
          
          res.end(JSON.stringify(json));
        }
      }
    })
  );
}; 