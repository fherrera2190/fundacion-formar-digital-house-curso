const fs = require("fs");
const db = require("../database/models");
const { validationResult } = require("express-validator");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    db.Product
      .findAll()
      .then(products => {
        res.render("products", { products, toThousand });
      })
      .catch(err => {
        console.log(error);
      });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    db.Product
      .findByPk(req.params.id)
      .then(product => {
        res.render("detail", { ...product.dataValues, toThousand });
      })
      .catch(err => {
        console.log(error);
      });
  },

  // Create - Form to create
  create: (req, res) => {
    db.Category
      .findAll()
      .then(categories => {
        return res.render("product-create-form", { categories });
      })
      .catch(err => {
        console.log(err);
      });
  },

  // Create -  Method to store
  store: (req, res) => {
    const errors = validationResult(req);
    // console.log(req.body.categoryId);

    if (!errors.isEmpty()) {
      console.log("Hay errores", req.body, errors.mapped());
      req.file &&
        fs.existsSync(`./public/images/products/${req.file.filename}`) &&
        fs.unlinkSync(`./public/images/products/${req.file.filename}`);

      db.Category
        .findAll()
        .then(categories => {
          return res.render("product-create-form", {
            categories,
            errors: errors.mapped(),
            old: req.body
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const { name, price, discount, categoryId, description } = req.body;
      db.Product
        .create({
          name: name.trim(),
          price,
          discount: discount || 0,
          categoryId,
          description: description.trim(),
          image: req.file ? req.file.filename : null
        })
        .then(product => {
          //console.log(product);
          return res.redirect("/products");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  // Update - Form to edit
  edit: (req, res) => {
    // Do the magic

    const categories = db.Category.findAll();
    const product = db.Product.findByPk(req.params.id);

    Promise.all([categories, product])
      .then(([categories, product]) => {
        res.render("product-edit-form", { ...product.dataValues, categories });
      })
      .catch(err => {
        console.log(error);
      });
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
    const { name, price, discount, categoryId, description } = req.body;

    db.Product
      .findByPk(req.params.id, {
        attributes: ["image"]
      })
      .then(product => {
        //console.log(product);
        fs.existsSync(`./public/images/products/${product.dataValues.image}`) &&
          fs.unlinkSync(`./public/images/products/${product.dataValues.image}`);
        db.Product
          .update(
            {
              name: name.trim(),
              price,
              discount,
              categoryId,
              image: req.file ? req.file.filename : product.image,
              description: description.trim()
            },
            {
              where: {
                id: req.params.id
              }
            }
          )
          .then(response => {
            //console.log(response);
            return res.redirect("/products/detail/" + req.params.id);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    // Do the magic
    db.Product
      .findByPk(req.params.id, {
        attributes: ["image"]
      })
      .then(product => {
        //console.log(product.dataValues.image);
        fs.existsSync(`./public/images/products/${product.dataValues.image}`) &&
          fs.unlinkSync(`./public/images/products/${product.dataValues.image}`);
        db.Product
          .destroy({
            where: {
              id: req.params.id
            }
          })
          .then(response => {
            console.log(response);
            return res.redirect("/products");
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

module.exports = controller;
