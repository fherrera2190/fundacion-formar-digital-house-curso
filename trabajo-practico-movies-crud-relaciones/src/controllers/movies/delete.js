const db = require("../../database/models");

const deletE = function(req, res) {
  // TODO
  db.Movie
    .findByPk(req.params.id)
    .then(movie => {
      res.render("moviesDelete", { Movie: movie });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = deletE;
