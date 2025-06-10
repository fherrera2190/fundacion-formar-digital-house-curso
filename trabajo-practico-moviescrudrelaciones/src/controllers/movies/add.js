const db = require("../../database/models");

const add = function(req, res) {
  const actors = db.Actor.findAll();
  const genres = db.Genre.findAll({ order: ["name"] });
  Promise.all([actors, genres])
    .then(([actors, genres]) => {
      res.render("moviesAdd", { allGenres: genres, actors });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = add;
