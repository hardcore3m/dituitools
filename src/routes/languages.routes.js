var express = require('express');
var router = express.Router();

var language = require('../controllers/language.controller');

router.get('/',language.list)
router.post('/create',language.create)
router.get('/:id',language.read)
router.put('/:id',language.update)

module.exports = router;