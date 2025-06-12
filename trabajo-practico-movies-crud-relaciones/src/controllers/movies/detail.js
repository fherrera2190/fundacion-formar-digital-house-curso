const db = require("../../database/models");

const detail = (req, res) => {
  db.Movie.findByPk(req.params.id, { include: ["actors"] }).then(movie => {
    res.render("moviesDetail.ejs", { movie });
  });
};

module.exports = detail;
