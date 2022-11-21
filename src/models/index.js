const mongoose = require('mongoose');

Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.application = require('./application.model')
db.paradigm = require('./paradigm.model')
db.language = require('./language.model')
db.bookmarkCategory = require('./bookmarkCategory.model')


module.exports = db;