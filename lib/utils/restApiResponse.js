const errorMessage = require('./error').message;

const errorCodeValue = {
    isOk : 0,
    accountMailOrPasswordInvalid : 1,
    userNotVerify : 2,
    accountIsExist : 3,
    mailIsExist : 4,
    userIsNotHouseOwner :5,
    userIsNotAccountOwner : 6,
    dbError : 7,
    internetError : 8,
    unKnowError : 9,
    houseAddressIsExist :10,
    tokenCreateFail :11,
    refreshTokenInvalid : 12,
    accessTokenInvalid : 13,
}

const responseDoc = {
    status : true,
    errorCode : errorCodeValue.isOk,
    data : ''
}

function createResponseDoc(){
    const result = JSON.parse(JSON.stringify(responseDoc))
    return result;
}

function setTokenCreateFail(res){
    res.status = false
    res.errorCode = 11
    res.data = ''
}

function createByData(data){
    const result = createResponseDoc()
    result.status = false
    result.data = data
    switch(data){
        case errorMessage.accountMailOrPasswordInvalid:
            result.errorCode = errorCodeValue.accountMailOrPasswordInvalid
            break;
        case errorMessage.passwordInvalid:
            result.errorCode = errorCodeValue.passwordInvalid
            break;
        case errorMessage.accountIsExist:
            result.errorCode = errorCodeValue.accountIsExist
            break;
        case errorMessage.mailIsExist:
            result.errorCode = errorCodeValue.mailIsExist
            break;
        case errorMessage.userIsNotHouseOwner:
            result.errorCode = errorCodeValue.userIsNotHouseOwner
            break;
        case errorMessage.userIsNotAccountOwner:
            result.errorCode = errorCodeValue.userIsNotAccountOwner
            break;
        case errorMessage.dbError:
            result.errorCode = errorCodeValue.dbError
            break;
        case errorMessage.internetError:
            result.errorCode = errorCodeValue.internetError
            break;
        case errorMessage.unKnowError:
            result.errorCode = errorCodeValue.unKnowError
            break;
        case errorMessage.houseAddressIsExist:
            result.errorCode = errorCodeValue.houseAddressIsExist
            break;
        case errorMessage.userNotVerify:
            result.errorCode = errorCodeValue.userNotVerify
            break;
        case errorMessage.refreshTokenInvalid:
            result.errorCode = errorCodeValue.refreshTokenInvalid
            break;
        case errorMessage.accessTokenInvalid:
            result.errorCode = errorCodeValue.accessTokenInvalid
            break;
        default:
            result.status = true
    }
    return result;
}

function create(status,errorCode,data){
    const result = createResponseDoc()
    if(errorCode === undefined){
        result.status = false
        result.errorCode = errorCodeValue.unKnowError
    }else{
        result.status = status
        result.errorCode = errorCode
    }
    result.data = data
    return result;
}


exports.createByData = createByData
exports.create = create
exports.errorCodeValue = errorCodeValue
exports.setTokenCreateFail = setTokenCreateFail