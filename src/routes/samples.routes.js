var express = require('express');
var router = express.Router();

var samples = require('../controllers/samples.controller');

router.get('/',samples.list)
router.post('/create',samples.create)
router.get('/:id',samples.read)
router.get('/:id/preview',samples.preview)
router.put('/:id',samples.update)

module.exports = router;