var express = require('express');
const indexController = require('../controllers/indexController');
var router = express.Router();

/* GET home page. */
router.get('/', indexController.index);
router.get('/detalle/:id', indexController.detail);

module.exports = router;
