const config = require('../setting/config').config;
const httpRequest = require('../utils/httpRequest');

function removeManageData(data){
    for(let i = 0 ;i< data.length; i++){
        for(let j = 0 ;j<data[i].managerData.length;j++){
            const item = {
                account : data[i].managerData[j].account,
                name : data[i].managerData[j].name,
                gender : data[i].managerData[j].gender,
                mail : data[i].managerData[j].mail,
                phone : data[i].managerData[j].phone,
            }
            data[i].managerData[j] = item;
        }
    }
    return data
}

function getEmployeesByUserId(id,callback) {
    const url = config['employees-basic-server'].location+'/'+config['employees-basic-server'].restApi.getEmployeesByUserId + '?id=' + id
    const method = 'GET';
    const headers = {};
    httpRequest.sendGetRequest(url, headers, method, (error, body) => {
        if (error) {
            console.log('===getEmployeesByUserId==url=')
            console.log(url)
            console.log('===getEmployeesByUserId==error=')
            console.log(error)
            console.log('===getEmployeesByUserId==body=')
            console.log(body)
            callback(false,body);
        } else {
            try{
                const res = JSON.parse(body)
                const data = removeManageData(res.data)
                callback(true,data);
            }catch(e){
                console.log(e)
                callback(false,"data format error: "+e);
            }
        }
    });
}

function getCurrentEmployeeByUserId(userId,callback){
    getEmployeesByUserId(userId,(result,data)=>{
        if(result == true){
            let currentEmployee = {}
            for(let i = 0 ;i<data.length;i++){
                if((data[i].state == 4 || data[i].state == 2) && data[i].isResign == false){
                    currentEmployee = data[i]
                    i = data.length
                }
            }
            callback(result,currentEmployee)
        }else{
            callback(result,data)
        }
    })
}

exports.getEmployeesByUserId = getEmployeesByUserId
exports.getCurrentEmployeeByUserId = getCurrentEmployeeByUserId