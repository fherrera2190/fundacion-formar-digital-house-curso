var express = require('express');
const loginValidator = require('../validations/loginValidator');
const indexController = require('../controllers/indexController')
var router = express.Router();

/* GET home page. */
router.get('/', indexController.index);

router.post('/', loginValidator, indexController.test)

router.get('/otraVista', indexController.otraVista);

router.get('/logout', indexController.logout);

module.exports = router;
