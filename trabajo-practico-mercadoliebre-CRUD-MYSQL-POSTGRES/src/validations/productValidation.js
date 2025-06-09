const { check } = require("express-validator");

module.exports = [
  check("name").notEmpty().withMessage("Debe ingresar un nombre"),
  check("price")
    .notEmpty()
    .withMessage("Debe ingresar un precio")
    .isInt({ gt: 0 })
    .withMessage("Debe ingresar un precio mayor a 0"),
  check("discount")
    .notEmpty()
    .withMessage("Debe ingresar un valor")
    .isInt({ min: 0, max: 99 })
    .withMessage("Debe ingresar un descuento mayor o igual 0 y menor que 99"),
  check("description")
    .isLength({
      min: 20,
      max: 500
    })
    .withMessage("Debe tener entre 20 y 500 caracteres"),
  check("categoryId")
    .isInt({ min: 1 })
    .withMessage("Debe ingresar una categoria valida")
];
