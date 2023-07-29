const jwt = require('jsonwebtoken');
const config = require('../setting/config').config;

exports.jwtEncode = function(data) {
    const secretKey = config.token.secretKey
    const token = jwt.sign(data, secretKey);
    return token
}

exports.jwtDecode = function(token) {
    try {
        const secretKey = config.token.secretKey
        const decoded = jwt.verify(token, secretKey);
        return decoded
      } catch (error) {
        console.log(error)
        return {}
      }
}

exports.isValid = function(value) {
    if (value != '' && value != undefined && value != null) {
        return true;
    } else {
        return false;
    }
}

exports.isNumber = function isNumber(value) {
  return !Number.isNaN(Number(value))
}

exports.getUUID = function() {
   return parseInt(uuid.v4(), 16).toString();
}

exports.getCurrentTime = function() {
    const currentdate = new Date(); 
    const datetime =  currentdate.getFullYear() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getDate() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
 }
