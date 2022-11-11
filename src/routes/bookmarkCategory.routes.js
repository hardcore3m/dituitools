var express = require('express');
var router = express.Router();

var bookmarkCategory = require('../controllers/bookmarkCategory.controller');

router.get('/',bookmarkCategory.list)
router.post('/create',bookmarkCategory.create)
router.get('/:id',bookmarkCategory.read)
router.put('/:id',bookmarkCategory.update)

module.exports = router;