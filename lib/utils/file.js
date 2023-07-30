const fs = require('fs');
const path = require('path');
exports.moveFile = function(orgPath, distPath, callback) {
    fs.readFile(orgPath, function(err, data) {
        if (err) {
            console.error(err.message);
            callback(false)
        } else {
            fs.writeFile(distPath, data, function(err) {
                if (err) {
                    console.error(err.message);
                    callback(false)
                } else {
                    fs.unlink(orgPath, function(err) {
                        if (err) {
                            console.error(err.message);
                            callback(false)
                        } else {
                            // console.log('delete ' + req.file.path + ' successfully!');
                            callback(true)
                        }
                    });
                }
            });
        }
    });
}
