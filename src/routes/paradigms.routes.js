var express = require('express');
var router = express.Router();

var paradigm = require('../controllers/paradigm.controller');

router.get('/',paradigm.list)
router.post('/create',paradigm.create)
router.get('/:id',paradigm.read)
router.put('/:id',paradigm.update)

module.exports = router;