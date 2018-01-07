
import mongoose from 'mongoose';
var config = require('config')


const dbHost = config.get("appConfig.dbConfig.host")
const dbPort = config.get("appConfig.dbConfig.port")
const dbName = config.get("appConfig.dbConfig.dbName")
module.exports = function (req, res, next) {

    mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
}