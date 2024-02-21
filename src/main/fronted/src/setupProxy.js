const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',	// 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    })
  );
};

/*이렇게 설정ㅎ아면 '/api'로 요청 시 Spring 서버로 요청 도착 */

