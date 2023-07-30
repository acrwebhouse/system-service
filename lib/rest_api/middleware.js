const utilsValue = require('../utils/value');
const config = require('../setting/config').config;
const middleware = {
    tokenAuth: function(req, res, next) {
        const token = req.headers['x-token']
        const authToken = config.xToken
        if(token === authToken){
            next()
        }else{
            const response = {
                status : false,
                data :"system token auth fail"
            }
            res.send(response);
        }
    }
}

exports.middleware = middleware