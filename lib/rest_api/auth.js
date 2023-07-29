exports.on = function(app) {
    const preRestApi = '/auth';
    const auth = require('../role/auth');
    const smtp = require('../role/smtp');
    const employees = require('../role/employees');
    const middleware = require('./middleware').middleware;
    const restApiResponse = require('../utils/restApiResponse');
    const errorCodeValue = require('../utils/restApiResponse').errorCodeValue;

    app.post(preRestApi + '/signUp', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a user',
            schema: {
                account: 'a123456789',
                password: '123456',
                name: 'Chris',
                gender: true,
                roles: [1,2,3,4],
                rolesInfo: {
                    admin:{},
                    host:{},
                    user:{},
                    sales:{
                        scope:[
                            {
                                "city":"台北市",
                                "area":"大安區"
                            },
                            {
                                "city":"花蓮市",
                                "area":"測試區"
                            },
                            {
                                "city":"台北市",
                                "area":"文山區"
                            }
                        ]
                    },
                },
                houseIds:[],
                phone: '0909666666',
                mail: 'acr.webhouse@gmail.com',
                lineId:'s_213456789',
                address: '台北市文山區興隆路六段66號6樓',
                bornDate : '2022/05/11'
            }
        }*/ 
        const account = req.body.account
        const password = req.body.password
        const name = req.body.name
        const gender = req.body.gender
        const roles = req.body.roles
        const rolesInfo = req.body.rolesInfo
        const houseIds = req.body.houseIds
        const phone = req.body.phone
        const address = req.body.address
        const mail = req.body.mail
        const lineId = req.body.lineId
        const bornDate = req.body.bornDate
        auth.signUp(account,password,name,gender,roles,rolesInfo,houseIds,phone,address,mail,lineId,bornDate,(result,data)=> {
            const response = restApiResponse.createByData(data)
            res.send(response);
            if(result == true){
                smtp.sendVerifyUserMail(data.ops[0],(result,data)=> {})
            }
        })
    });

    app.post(preRestApi + '/login', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a user',
            schema: {
                accountOrMail: 'a123456789',
                password: '123456',
                devices: 1,
            }
        }*/ 
        const accountOrMail = req.body.accountOrMail
        const password = req.body.password
        const devices = req.body.devices

        auth.login(accountOrMail,password,(result,data)=> {
            if(result == true){
                const loginData = data
                employees.getEmployeesByUserId(loginData._id,(result,data)=>{
                    if(result == true){
                        loginData.employeesData = data
                    }
                    const response = restApiResponse.createByData(loginData)
                    auth.generateAccessTokenAndRefreshToken(loginData._id,devices,(result,data)=>{
                        if(result == true){
                            response.data.accessToken = data.accessToken
                            response.data.refreshToken = data.refreshToken
                        }else{
                            restApiResponse.setTokenCreateFail(response)
                        }
                        res.send(response);
                    })
                    
                })
            }else{
                const response = restApiResponse.createByData(data)
                res.send(response);
            }
        })
    });

    app.get(preRestApi + '/sendResetPasswordMail', function(req, res) {
        const accountOrMail = req.query.accountOrMail
        const response = {
            'status':true,
            'data':''
        }
        smtp.sendResetPasswordMail(accountOrMail,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/sendVerifyUserMailByMail', function(req, res) {
        const mail = req.query.mail
        const response = {
            'status':true,
            'data':''
        }
        smtp.sendVerifyUserMailByMail(mail,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/verifyUser',[middleware.tokenAuth],  function(req, res) {
        const response = {
            'status':true,
            'data':''
        }
        const token = req.headers['x-token']
        auth.verifyUser(token,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/verifyAccessToken',  function(req, res) {
        const token = req.headers['x-token']
        auth.verifyAccessToken(token,(result,data)=> {
            const response = restApiResponse.createByData(data)
            if(response.errorCode === errorCodeValue.accessTokenInvalid){
                res.status(401).send(response);
            }else{
                res.send(response);
            }
            
        })
    });

    app.put(preRestApi + '/refreshAccessToken', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'refreshToken',
            schema: {
                refreshToken: '63e126d24abafb0fa66777ee'
            }
        }*/ 
        const refreshToken = req.body.refreshToken
        auth.refreshAccessToken(refreshToken,(result,data)=> {
            const response = restApiResponse.createByData(data)
            if(response.errorCode === errorCodeValue.refreshTokenInvalid){
                res.status(401).send(response);
            }else{
                res.send(response);
            }
        })
    });

    app.delete(preRestApi + '/logout', function(req, res) {
        const token = req.headers['x-token']
        const response = {
            'status':true,
            'data':''
        }
        auth.logout(token,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });
}