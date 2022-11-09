var express = require('express');
var router = express.Router();

var bookmark = require('../controllers/bookmark/bookmarks.controller');

router.get('/',bookmark.list)
router.post('/create',bookmark.create)
router.get('/:id',bookmark.read)

module.exports = router;