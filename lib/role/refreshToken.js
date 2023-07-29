const config = require('../setting/config').config;
const httpRequest = require('../utils/httpRequest');
const utilsValue = require('../utils/value');
const errorMessage = require('../utils/error').message;

const refreshTokenDoc = {
    userId:'',
    devices:0,
}

function newRefreshTokenDoc(){
    const doc = JSON.parse(JSON.stringify(refreshTokenDoc))
    return doc;
}

function removeRefreshTokensByUserIdAndDevices(userId,devices,callback) {
    getRefreshTokens('',userId,devices,'','',(result,data)=>{
        if(result == true){
            const removeIds = []
            for(let i = 0 ;i<data.length;i++){
                removeIds.push(data[i]._id)
            }
            if(removeIds.length > 0){
                removeRefreshTokens(removeIds,callback)
            }else{
                callback(result,data)
            }
        }else{
            callback(result,data)
        }
    })
}

function addRefreshToken(userId,devices,callback) {
    const refreshToken = {
        userId,
        devices,
    }
    const url = config['auth-basic-server'].location+'/'+config['auth-basic-server'].restApi.addRefreshToken;
    const method = 'POST';
    const headers = {};
    httpRequest.sendJsonRequest(url, headers, refreshToken, method, (error, body) => {
        if (error) {
            console.log('===addRefreshToken==error=')
            console.log(error)
            console.log('===addRefreshToken==body=')
            console.log(body)
            callback(false,body);
        } else {
            if (utilsValue.isValid(body.data.result)){
                if(body.data.result.ok == 1){
                    callback(true,body.data.ops[0]);
                }else{
                    callback(true,'insert fail');
                }
            }else{
                callback(false,body.data);
            }
        }
    });
}

function getRefreshTokens(id,userId,devices,exp,iat,callback) {
    let url = config['auth-basic-server'].location+'/'+config['auth-basic-server'].restApi.getRefreshTokens
    let preStr = '?';
    if(utilsValue.isValid(id)){
        url = url + preStr + 'id='+id
        preStr = '&&'
    }
    if(utilsValue.isValid(userId)){
        url = url + preStr + 'userId='+userId
        preStr = '&&'
    }
    if(utilsValue.isValid(devices)){
        url = url + preStr + 'devices='+devices
        preStr = '&&'
    }
    if(utilsValue.isValid(exp)){
        url = url + preStr + 'exp='+exp
        preStr = '&&'
    }
    if(utilsValue.isValid(iat)){
        url = url + preStr + 'iat='+iat
        preStr = '&&'
    }

    const method = 'GET';
    const headers = {};
    httpRequest.sendGetRequest(url, headers, method, (error, body) => {
        if (error) {
            console.log('===getRefreshTokens==url=')
            console.log(url)
            console.log('===getRefreshTokens==error=')
            console.log(error)
            console.log('===getRefreshTokens==body=')
            console.log(body)
            callback(false,body);
        } else {
            try{
                const res = JSON.parse(body)
                const data = res.data
                callback(true,data);
            }catch(e){
                console.log(e)
                callback(false,"data format error: "+e);
            }
        }
    });
}

function removeRefreshTokens(ids,callback) {
    if (utilsValue.isValid(ids)){
        const url = config['auth-basic-server'].location+'/'+config['auth-basic-server'].restApi.removeRefreshTokens;
        const method = 'DELETE';
        const headers = {};
        const json = {
            ids:ids
        }
        httpRequest.sendJsonRequest(url, headers, json, method, (error, body) => {
            if (error) {
              console.log('===removeAccessTokens==error=')
              console.log(error)
              console.log('===removeAccessTokens==body=')
              console.log(body)
              callback(false,body);
            } else {
              if(body.status == true){
                callback(true,'remove access tokens');
              }else{
                callback(false,'no match id');
              }
            }
          });
    }else {
        callback(false, 'id invalid')
    }
}

function refreshTokenIsValid(refreshTokenId,callback){
    getRefreshTokens(refreshTokenId,'','','','',(result,data)=>{
        if(result == true && data.length>0){
            const token = data[0]
            const currentTime = new Date().getTime()
            if(token.exp>currentTime){
                callback(true,token)
            }else{
                callback(false,errorMessage.refreshTokenInvalid)
            }
        }else{
            callback(false,errorMessage.refreshTokenInvalid)
        }
    })
}

exports.newRefreshTokenDoc = newRefreshTokenDoc
exports.addRefreshToken = addRefreshToken
exports.getRefreshTokens = getRefreshTokens
exports.removeRefreshTokens = removeRefreshTokens
exports.removeRefreshTokensByUserIdAndDevices = removeRefreshTokensByUserIdAndDevices
exports.refreshTokenIsValid = refreshTokenIsValid
