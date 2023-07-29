const swaggerAutogen = require('swagger-autogen')();
const config = require('./setting/config').config;
const outputFile = './swagger_output.json'; // 輸出的文件名稱
// const endpointsFiles = ['./app.js']; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以
const endpointsFiles = ['./lib/rest_api/auth.js'];
const doc = {
    info: {
      title: 'auth-service API',
      description: 'Description',
    },
    host: config.swaggerIp+':'+config.serverPort,
    schemes: ['http'],
    securityDefinitions: {
      apiKeyAuth: {
        type: 'apiKey',
        in: 'header', // can be 'header', 'query' or 'cookie'
        name: 'x-token', // name of the header, query parameter or cookie
        description: 'auth secure token'
      }
    }
  };
swaggerAutogen(outputFile, endpointsFiles,doc); // swaggerAutogen 的方法