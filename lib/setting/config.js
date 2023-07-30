require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 8000,
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'xToken':process.env.X_TOKEN || '',
    'resourcePath':'../../resource'
}