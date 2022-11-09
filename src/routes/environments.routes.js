var express = require('express');
var router = express.Router();

var language = require('../controllers/tools/language.controller');
var library = require('../controllers/tools/library.controller');
var ambience = require('../controllers/tools/ambience.controller');
var environments = require('../controllers/tools/environments.controller');
var categories = require('../controllers/tools/categories.controller');


router.get('/',environments.list)
router.get('/categories',categories.list)


router.get('/language',language.list)
router.post('/language/create',language.create)
router.get('/language/:id',language.read)


router.get('/library',library.list)
router.post('/library/create',library.create)
router.get('/library/:id',library.read)

router.get('/ambience',ambience.list)
router.post('/ambience/create',ambience.create)
router.get('/ambience/:id',ambience.read)


module.exports = router;