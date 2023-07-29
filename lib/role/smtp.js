const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const httpRequest = require('../utils/httpRequest');

function getUser(mail,account,callback){
    const url = config['user-basic-server'].location+'/'+config['user-basic-server'].restApi.getUserNoPassword+'?mail='+mail+'&&account='+account+'&&isDelete=false';
    const method = 'GET';
    const headers = {
        'Content-Type': 'application/json'
    };
    httpRequest.sendGetRequest(url, headers, method, (error, body) => {
        try {
            body = JSON.parse(body)
        }catch(e){
            error = true
        }
        if (error) {
            callback(false,body);
        } else {
            callback(body.status,body.data);
        }
    });
}

function getResetPasswordSubject(){
    return 'ACR platform 重設密碼通知信'
}

function getResetPasswordContent(name,resetLink){
    let first = '';
    if(utilsValue.isValid(name)){
        first += '親愛的 '+name+' 您好'
    }else{
        first += '親愛的您好'
    }
    first += '，您已於 '+utilsValue.getCurrentTime()+' 重新設定您的密碼。'
    const second = `請點選下方連結設定您的新密碼 <br> ${resetLink}`
    const third = `如有任何問題，可寄客服 mail 與我們聯絡，謝謝。<br>acr.webhouse@gmail.com'`
    const content = `<div style=color:black;>${first}<div/><div style=color:black;>${second}<br><div/><div style=color:black;>${third}<div/>`
    return content
}

function getSignUpSubject(){
    return 'ACR platform 會員註冊驗證信'
}

function getSignUpContent(name,link){
    let first = '';
    if(utilsValue.isValid(name)){
        first += '親愛的 '+name+' 您好'
    }else{
        first += '親愛的您好'
    }
    first += '，您已於 '+utilsValue.getCurrentTime()+' 在我們平台註冊為新用戶，新用戶需要進行帳號啟用。<br>'
    const second = `帳號啟動說明 :  `
    const third = `您是我們平台的新用戶，我們需要對您的註冊的有效性進行驗證以避免垃圾郵件或地址被濫用。
    您需要點擊下面的連結即可啟動您的帳號：`
    const end = `感謝您的訪問，祝您使用愉快。`
    const content = `<div style=color:black;>${first}<div/><div style=color:black;>${second}<br><div/><div style=color:black;>${third}<br><div/><div style=color:black;>${link}<br><br><div/><div style=color:black;>${end}<div/>`
    return content
}

function sendMail(toMail,subject,content,callback){
    const url = config['smtp-basic-server'].location+'/'+config['smtp-basic-server'].restApi.sendMail;
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    };
    const doc = {
        toMail,
        subject,
        content,
    }
    httpRequest.sendJsonRequest(url, headers, doc, method, (error, body) => {
        if (error) {
          callback(false,body);
        } else {
          callback(body.status,body.data);
        }
      });
}

function getResetPasswordToken(user){
    const data = {
        id:user._id,
        iat:new Date(),
        expired:config.token.resetExpired,
    }
    return utilsValue.jwtEncode(data)
}

function getVerifyUserToken(user){
    const data = {
        id:user._id,
        iat:new Date(),
        expired:config.token.signInExpired,
    }
    return utilsValue.jwtEncode(data)
}

function sendResetPasswordMail(accountOrMail,callback) {
    if (utilsValue.isValid(accountOrMail)){
        let resetLink = config['web-server'];
        if(accountOrMail.indexOf('@')>=0){
            const mail = accountOrMail;
            getUser(mail,'',(result,user)=>{                
                if(result){
                    resetLink = resetLink + '/reset-password?key=' + getResetPasswordToken(user)
                    const name = user.name
                    const subject = getResetPasswordSubject();
                    const content = getResetPasswordContent(name,resetLink);
                    sendMail(accountOrMail,subject,content,callback)
                }else{
                    callback(false, 'query user fail by mail')
                }
            })
        }else{
            const account = accountOrMail;
            getUser('',account,(result,user)=>{               
                if(result){    
                    resetLink = resetLink + '/reset-password?key=' + getResetPasswordToken(user)
                    const name = user.name
                    const subject = getResetPasswordSubject();
                    const content = getResetPasswordContent(name,resetLink);
                    const mail = user.mail;
                    sendMail(mail,subject,content,callback)
                }else{ 
                    callback(false, 'query user fail by account')
                }
            })
        }
    }else {
        callback(false, 'accout or mail invalid')
    }
}

function sendVerifyUserMail(user,callback) {
    const name = user.name
    const mail = user.mail
    // const mail = 'jieyu0702@gmail.com'
    const link = config['web-server'] + '/verifyUser?key=' + getVerifyUserToken(user)
    const subject = getSignUpSubject();
    const content = getSignUpContent(name,link);
    sendMail(mail,subject,content,callback)
}

function sendVerifyUserMailByMail(mail,callback) {
    getUser(mail,'',(result,user)=>{                
        if(result){
            const link = config['web-server'] + '/verifyUser?key=' + getVerifyUserToken(user)
            const name = user.name
            const subject = getSignUpSubject();
            const content = getSignUpContent(name,link);
            sendMail(mail,subject,content,callback)
        }else{
            callback(false, 'query user fail by mail')
        }
    })   
}

exports.sendResetPasswordMail = sendResetPasswordMail
exports.sendVerifyUserMail = sendVerifyUserMail
exports.sendVerifyUserMailByMail = sendVerifyUserMailByMail
