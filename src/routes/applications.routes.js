var express = require('express');
var router = express.Router();

var application = require('../controllers/application.controller');

router.get('/',application.list)
router.post('/create',application.create)
router.get('/:id',application.read)
router.put('/:id',application.update)

module.exports = router;