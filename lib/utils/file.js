const fs = require('fs');
const path = require('path');

function exists(filePath,callback){
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          callback(false,err)
        } else {
          callback(true,'')
        }
    });
}

function write(filePath,data,callback){
    fs.writeFile(filePath, data, (err) => {
        if (err) {
          callback(false,err)
        } else {
          callback(true,data)
        }
    });
}
function read(filePath,encode,callback){
    fs.readFile(filePath, encode, (err, data) => {
        if (err) {
            callback(false,err)
        } else {
            callback(true,data)
        }
    });
}

exports.exists = exists
exports.write = write
exports.read = read
