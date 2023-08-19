const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Replace with your API route prefix
    createProxyMiddleware({
      target: 'http://localhost:27017', // Replace with your API Backend URL
      changeOrigin: true,
    })
  );
};
