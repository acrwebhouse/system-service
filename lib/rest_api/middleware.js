const utilsValue = require('../utils/value');
const middleware = {
    tokenAuth: function(req, res, next) {
        const token = req.headers['x-token']
        if(utilsValue.isValid(token)){
            const decodeToken = utilsValue.jwtDecode(token)
            const id = decodeToken.id
            const iat = decodeToken.iat
            const expired = decodeToken.expired
            if(utilsValue.isValid(id) && utilsValue.isValid(iat) &&utilsValue.isValid(expired)){
                next()
            }else{
                const response = {
                    status : false,
                    data :"x-token format error"
                }
                res.send(response);
            }
        }else{
            const response = {
                status : false,
                data :"x-token undefined"
            }
            res.send(response);
        }
    }
}

exports.middleware = middleware