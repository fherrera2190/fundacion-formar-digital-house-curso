const { validationResult } = require("express-validator");
const fs = require("fs");
const {
  getAllProducts,
  getProductById,
  createProduct
} = require("../services/products.services");
const paginate = require("express-paginate");
module.exports = {
  listProducts: async (req, res) => {
    try {
      const { total, products } = await getAllProducts(
        req.query.limit,
        req.skip
      );

      const pagesCount = Math.ceil(total / req.query.limit);
      const currentPage = req.query.page;
      const pages = paginate.getArrayPages(req)(
        pagesCount,
        pagesCount,
        currentPage
      );
      return res.status(200).json({
        ok: true,
        meta: {
          total,
          pagesCount,
          currentPage,
          pages
        },
        data: products.map(product => {
          return {
            ...product.dataValues,
            url: `${req.protocol}://${req.get(
              "host"
            )}/api/products/${product.id}`
          };
        })
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "Upss, hubo un error. Sorry. :("
      });
    }
  },
  showProduct: async (req, res) => {
    try {
      const product = await getProductById(req.params.id);
      return res.status(200).json({
        ok: true,
        data: {
          ...product.dataValues,
          image: `${req.protocol}://${req.get(
            "host"
          )}/images/products/${product.image}`
        }
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "Upss, hubo un error. Sorry. :("
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      console.log(req.body, req.file);
      const errors = validationResult(req);
      const objectError = errors.mapped();
      if (!errors.isEmpty()) {
        req.file &&
          fs.existsSync(`./public/images/products/${req.file.filename}`) &&
          fs.unlinkSync(`./public/images/products/${req.file.filename}`);
        let errorsMessages = {};
        for (const key in objectError) {
          errorsMessages = {
            ...errorsMessages,
            [errors.mapped()[key].path]: errors.mapped()[key].msg
          };
        }
        let error = new Error();
        error.status = 400;
        error.message = errorsMessages;
        throw error;
      }
      if (req.file) req.body.image = req.file.filename;
      const newProduct = await createProduct(req.body);
      // console.log(newProduct);
      return res.status(200).json({
        ok: true,
        data: {
          ...newProduct.dataValues,
          image: `${req.protocol}://${req.get(
            "host"
          )}/images/products/${newProduct.image}`
        }
      });
    } catch (error) {
      req.file &&
        fs.existsSync(`./public/images/products/${req.file.filename}`) &&
        fs.unlinkSync(`./public/images/products/${req.file.filename}`);
      return res.status(error.status || 500).json({
        ok: false,
        status: error.status || 500,
        error: error.message || "Upss, hubo un error. Sorry. :("
      });
    }
  },
  updateProduct: async (req, res) => {
    try {
    } catch (error) {}
  },
  deleteProduct: async (req, res) => {}
};
