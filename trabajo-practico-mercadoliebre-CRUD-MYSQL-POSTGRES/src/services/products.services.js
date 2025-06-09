const db = require("../database/models");
const getAllProducts = async (limit, offset) => {
  try {
    const { count, rows } = await db.Product.findAndCountAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "categoryId"]
      },
      limit,
      offset,
      include: [{ association: "category", attributes: ["name"] }]
    });
    return { total: count, products: rows };
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "ERROR en el servicio"
    };
  }
};

const getProductById = async id => {
  try {
    if (!id || isNaN(id)) {
      throw {
        status: 400,
        message: "Id inexsistente"
      };
    }
    const product = await db.Product.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "categoryId"]
      },
      include: [{ association: "category", attributes: ["name"] }]
    });
    if (!product) {
      throw {
        status: 400,
        message: "Producto no encontrado"
      };
    }
    return product;
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "ERROR en el servicio"
    };
  }
};

const createProduct = async data => {
  try {
    console.log(data)
    const newProduct = await db.Product.create(data);
    return await getProductById(newProduct.id);
  } catch (error) {
    console.log(error);
    throw {
      status: error.status || 500,
      message: error.message || "ERROR en el servicio de productos"
    };
  }
};
module.exports = {
  getAllProducts,
  createProduct,
  getProductById
};
