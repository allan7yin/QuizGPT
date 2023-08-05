const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Your backend API base URL path
    createProxyMiddleware({
      target: 'http://localhost:8080', // Your backend URL
      changeOrigin: true,
    })
  );
};
