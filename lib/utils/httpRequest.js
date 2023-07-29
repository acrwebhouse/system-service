const request = require('request');
exports.sendGetRequest = function sendJsonRequest(url, headers, method, callback) {
  let options = {
    'url': url,
    'headers': headers,
    'method': method
  };
  request(options,(error, response, body)=>{
  	callback(error,body);
  });
}


exports.sendJsonRequest = function sendJsonRequest(url, headers, json, method, callback) {
  let options = {
    'url': url,
    'headers': headers,
    'json': json,
    // 'form': json,
    'method': method
  };
  request(options,(error, response, body)=>{
  	callback(error,body);
  });
}

exports.sendFormRequest = function sendJsonRequest(url, headers, json, method, callback) {
  let options = {
    'url': url,
    'headers': headers,
    'form': json,
    'method': method
  };
  request(options,(error, response, body)=>{
    callback(error,body);
  });
}
