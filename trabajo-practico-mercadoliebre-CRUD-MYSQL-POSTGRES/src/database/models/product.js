"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId"
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      image: DataTypes.STRING,
      categoryId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Product"
    }
  );
  return Product;
};
