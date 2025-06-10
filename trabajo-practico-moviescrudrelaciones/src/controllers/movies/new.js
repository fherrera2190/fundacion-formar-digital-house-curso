const db = require("../../database/models");

const news = (req, res) => {
  db.Movie
    .findAll({
      order: [["release_date", "DESC"]],
      limit: 5
    })
    .then(movies => {
      res.render("newestMovies", { movies });
    });
};
module.exports = news;
