const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const httpRequest = require('../utils/httpRequest');
const errorMessage = require('../utils/error').message;
const token = require('./token');
const employees = require('./employees');
const user = require('./user')


function signUp(account,password,name,gender,roles,rolesInfo,houseIds,phone,address,mail,lineId,bornDate,callback) {
    if (utilsValue.isValid(account) && utilsValue.isValid(password)){
        user.addUser(account,password,name,gender,roles,rolesInfo,houseIds,phone,address,mail,lineId,bornDate,callback)
    }else {
        callback(false, 'accout or password invalid')
    }
}

function generateToken(user){
    const data = {
        id:user._id,
        roles:user.roles,
        expired:config.token.useExpired,
        iat:new Date()
    }
    const token = utilsValue.jwtEncode(data)
    return token;
}

function login(accountOrMail,password,callback) {
    if (utilsValue.isValid(accountOrMail) && utilsValue.isValid(password)){
        if(accountOrMail.indexOf('@')>=0){
            user.loginByMail(accountOrMail,password,(result,data)=>{
                if(result == false || data == null){
                    user.loginByAccount(accountOrMail,password,(result,data)=>{
                        if(result == false || data == null){
                            callback(false,errorMessage.accountMailOrPasswordInvalid)
                        }else if(result == true && data.verify == false){
                            callback(false,errorMessage.userNotVerify)
                        }
                        else{
                            callback(result,data)
                        }
                    })
                }else{
                    if(result == false || data == null){
                        callback(result,errorMessage.accountMailOrPasswordInvalid)
                    }else if(result == true && data.verify == false){
                        callback(false,errorMessage.userNotVerify)
                    }else{
                        callback(result,data)
                    }
                }
            })
        }else{
            user.loginByAccount(accountOrMail,password,(result,data)=>{
                if(result == false || data == null){
                    callback(false,errorMessage.accountMailOrPasswordInvalid)
                }else if(result == true && data.verify == false){
                    callback(false,errorMessage.userNotVerify)
                }else{
                    callback(result,data)
                }
            })
        }
    }else {
        callback(false, errorMessage.accountMailOrPasswordInputInvalid)
    }
}

function verifyUserTime(iat , expired){
    const now = new Date()
    const old = new Date(iat)
    const diff = now.getTime() - old.getTime()
    if(diff < expired){
        return true
    }else{
        return false
    }
}



function verifyUser(token,callback){
    const decodeToken = utilsValue.jwtDecode(token)
    const id = decodeToken.id
    const iat = decodeToken.iat
    const expired = decodeToken.expired*1
    if(verifyUserTime(iat , expired)){
        user.getUserById(id,(result,data)=>{
            if(result){
                user.editUser(data,(result,data)=>{
                    if(result){
                        data.token = generateToken(data)
                        callback(true,data)
                    }else{
                        callback(false,data)
                    }
                })
            }else{
                callback(false,'query user fail')
            }
        })
        
    }else{
        callback(false,'time expired')
    }
    
}

function generateAccessTokenAndRefreshToken(userId,devices,callback){
    token.generateAccessTokenAndRefreshToken(userId,devices,callback)
}

function logout(accessToken,callback){
    token.removeAccessTokenByAccessToken(accessToken,callback)
}

function refreshAccessToken(refreshToken,callback){
    token.refreshAccessToken(refreshToken,callback)
}

function verifyAccessToken(accessToken,callback){
    token.verifyAccessToken(accessToken,callback)
}

exports.generateAccessTokenAndRefreshToken = generateAccessTokenAndRefreshToken
exports.signUp = signUp
exports.login = login
exports.verifyUser = verifyUser
exports.logout = logout
exports.refreshAccessToken = refreshAccessToken
exports.verifyAccessToken = verifyAccessToken