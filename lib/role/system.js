const config = require('../setting/config').config;
const file = require('../utils/file');
const resourcePath = config.resourcePath
const path = require('path');
const announcementName = 'announcement.txt'

function writeAnnouncement(data,callback){
    const announcementPath = path.join(resourcePath,announcementName)
    file.write(announcementPath,data,callback)
}

function readAnnouncement(){

}

exports.writeAnnouncement = writeAnnouncement
exports.readAnnouncement = readAnnouncement