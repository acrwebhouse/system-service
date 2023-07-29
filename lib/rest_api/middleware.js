const utilsValue = require('../utils/value');
const config = require('./setting/config');
const middleware = {
    tokenAuth: function(req, res, next) {
        const token = config.xToken
        
    }
}

exports.middleware = middleware