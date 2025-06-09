const router = require("express").Router();

const {
  listProducts,
  showProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/apiProductsController");
const upload = require("../middlewares/upload");
const productValidation = require("../validations/productValidation");

// Productos
router
  .get("/products", listProducts)
  .get("/products/:id", showProduct)
  .post("/products",  upload.single("image"),productValidation, createProduct)
  .put("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct);

module.exports = router;
