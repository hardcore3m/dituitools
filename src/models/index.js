const mongoose = require('mongoose');

Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.language = require('./tools/language.model')
db.library = require('./tools/library.model')
db.ambience = require('./tools/ambience.model')
db.bookmark = require('./bookmark/bookmark.model')
db.code = require('./code/code.model')


module.exports = db;