const mongoose = require('mongoose');

Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.application = require('./application.model')
db.paradigm = require('./paradigm.model')


module.exports = db;