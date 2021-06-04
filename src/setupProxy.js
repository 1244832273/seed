const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  console.log('proxy', process.env);
  app.use(
    createProxyMiddleware('/mock', {
      target: 'http://10.10.12.243:3000/mock/41/',
      changeOrigin: true,
      pathRewrite: {
        '^/mock': '',
      },
    })
  );
  app.use(
    createProxyMiddleware('/dev', {
      //本地环境
      // target: 'http://mkdddev.kuaixe.com',
      //测试环境
      target: 'http://jd-test.jiandandian.com',
      //预发
      // target: 'https://jiandandian-isv.isvjcloud.com',
      //线上
      // target: 'https://jiandandian-isv.isvjcloud.com',

      changeOrigin: true,
      pathRewrite: {
        '^/dev': '',
      },
      cookieDomainRewrite: {
        '': '',
      },
    })
  );
};
