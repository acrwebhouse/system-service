const config = require('../setting/config').config;
const file = require('../utils/file');
const resourcePath = config.resourcePath
const path = require('path');
const announcementName = 'announcement.txt'
const announcementEncode = 'utf8'

function writeAnnouncement(data,callback){
    const announcementPath = path.join(resourcePath,announcementName)
    file.write(announcementPath,data,callback)
}

function readAnnouncement(callback){
    const announcementPath = path.join(resourcePath,announcementName)
    file.read(announcementPath,announcementEncode,callback)
}

exports.writeAnnouncement = writeAnnouncement
exports.readAnnouncement = readAnnouncement