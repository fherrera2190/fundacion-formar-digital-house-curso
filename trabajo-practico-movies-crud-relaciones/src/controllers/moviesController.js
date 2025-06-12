// const db = require("../database/models");
// const { validationResult } = require("express-validator");

//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados

const moviesController = {
  list: require("./movies/list"),//OK
  detail: require("./movies/detail"),//OK
  new: require("./movies/new"),
  recomended: require("./movies/recomended"),
  //Aqui dispongo las rutas para trabajar con el CRUD
  add: require("./movies/add"),
  create: require("./movies/create"),
  edit: require("./movies/edit"),
  update: require("./movies/update"),
  delete: require("./movies/delete"),
  destroy: require("./movies/destroy")
};

module.exports = moviesController;
