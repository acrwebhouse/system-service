require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 3000,
    'user-basic-server':{
        location: process.env.USER_BASIC_LOCATION ||'http://35.234.42.100:13000',
        restApi:{
            'addUser':'user/addUser',
            'getUser':'user/getUser',
            'getUserNoPassword':'user/getUserNoPassword',
            'getUserById':'user/getUserById',
            'editUser':'user/editUser',
        }
    },
    'smtp-basic-server':{
        location: process.env.SMTP_BASIC_LOCATION ||'http://35.234.42.100:16000',
        restApi:{
            'sendMail':'smtp/sendMail'
        }
    },
    'employees-basic-server':{
        location: process.env.EMPLOYEES_BASIC_LOCATION ||'http://35.234.42.100:21000',
        restApi:{
            'getEmployeesByUserId':'employees/getEmployeesByUserId'
        }
    },
    'auth-basic-server':{
        location: process.env.AUTH_BASIC_LOCATION ||'http://35.234.42.100:23000',
        restApi:{
            'addAccessToken':'auth/addAccessToken',
            'getAccessTokens':'auth/getAccessTokens',
            'removeAccessTokens':'auth/removeAccessTokens',
            'addRefreshToken':'auth/addRefreshToken',
            'getRefreshTokens':'auth/getRefreshTokens',
            'removeRefreshTokens':'auth/removeRefreshTokens',
        }
    },
    'web-server':process.env.WEB_LOCATION ||'https://matchrentdev.com',
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'token':{
        'signInExpired': 300000,
        'resetExpired': 300000,
        'useExpired': 300000,
        accessTokenTime : 3600000, // 1 h
        secretKey : process.env.ACCESS_TOKEN_SECRET_KEY ||'648f2a88e6b1d8001fc7388d',
    }
}