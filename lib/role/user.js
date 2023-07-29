const config = require('../setting/config').config;
const httpRequest = require('../utils/httpRequest');
const utilsValue = require('../utils/value');
const errorMessage = require('../utils/error').message;
const employees = require('./employees');

const userDoc = {
    account:'',
    password:'',
    name:'',
    gender: true,
    roles:[],
    rolesInfo:{},
    houseIds:[],
    phone:'',
    address:'',
    mail:'',
    lineId:'',
    bornDate:'',
    verify:false,
    isDelete:false,
}

function newUserDoc(){
    const doc = JSON.parse(JSON.stringify(userDoc))
    return doc;
}

function addUser(account,password,name,gender,roles,rolesInfo,houseIds,phone,address,mail,lineId,bornDate,callback){
    const doc = newUserDoc()
        doc.account = account
        doc.password = password
        doc.address = address
        doc.houseIds = houseIds
        doc.phone = phone
        doc.name = name
        doc.gender = gender
        doc.roles = roles
        doc.rolesInfo = rolesInfo
        doc.mail = mail
        if(utilsValue.isValid(lineId)){
            doc.lineId = lineId
        }
        doc.bornDate = bornDate
        const url = config['user-basic-server'].location+'/'+config['user-basic-server'].restApi.addUser;
        const method = 'POST';
        const headers = {
            'Content-Type': 'application/json'
        };
        httpRequest.sendJsonRequest(url, headers, doc, method, (error, body) => {
            if (error) {
              callback(false,body);
            } else {
              const status = body.status
              let data = body.data
              if( status === false){
                if(data.indexOf('duplicate')>0){
                    if(data.indexOf('account')>0){
                        data = errorMessage.accountIsExist
                    }
                    if(data.indexOf('mail')>0){
                        data = errorMessage.mailIsExist
                    }
                  }
              }
              callback(status,data);
            }
          });
}

function getUserById(id,callback){
    const url = config['user-basic-server'].location+'/'+config['user-basic-server'].restApi.getUserById+'?id='+id+'&&isDelete=false';
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

function editUser(user,callback){
    const id = user._id
    delete user['createTime'];
    delete user['updateTime'];
    delete user['_id'];
    user.id = id
    user.verify = true
    const url = config['user-basic-server'].location+'/'+config['user-basic-server'].restApi.editUser;
    const method = 'PUT';
    const headers = {};

    httpRequest.sendJsonRequest(url, headers, user, method, (error, body) => {
        if (error) {
            callback(false,body);
        } else {
            if(body.data.nModified > 0){
                const result = body.data.updateData
                callback(true,result);
            }else{
                callback(false,'no match id');
            }
        }
    });
}

function loginByAccount(account,password,callback){
    const url = config['user-basic-server'].location+'/'+config['user-basic-server'].restApi.getUser+'?account='+account+'&&password='+password+'&&isDelete=false';
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

function loginByMail(mail,password,callback){
    const url = config['user-basic-server'].location+'/'+config['user-basic-server'].restApi.getUser+'?mail='+mail+'&&password='+password+'&&isDelete=false';
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

function getUserAndCurrentEmployeeById(id,callback){
    getUserById(id,(result,data)=>{
        if(result == true){
            const user = data
            employees.getCurrentEmployeeByUserId(id,(result,data)=>{
                if(result == true){
                    user.employee = data
                    callback(result,user)
                }else{
                    callback(result,data)
                }
            })

        }else{
            callback(result,data)
        }
    })
}

exports.addUser = addUser
exports.getUserById = getUserById
exports.editUser = editUser
exports.loginByAccount = loginByAccount
exports.loginByMail = loginByMail
exports.getUserAndCurrentEmployeeById = getUserAndCurrentEmployeeById