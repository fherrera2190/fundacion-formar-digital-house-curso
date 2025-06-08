const { check } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('Debe ingresar un nombre')
    ,
    check('email')
        .notEmpty().withMessage('Debe ingresar un email')
        .isEmail().withMessage('')
    ,
    check('color')
        .custom(value => {
            if (value === "#a9a9a9") return false;
            return true
        }).withMessage('Debe elegir un color')
    ,
    check('age').optional({checkFalsy:true}).isInt({ min: 1 }).withMessage('Debe ingresar una edad mayor a 0')
]