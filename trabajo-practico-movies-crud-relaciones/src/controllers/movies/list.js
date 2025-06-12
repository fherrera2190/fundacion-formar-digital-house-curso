const db = require("../../database/models");
const list = (req, res) => {
  db.Movie.findAll().then(movies => {
    res.render("moviesList.ejs", { movies });
  });
};

module.exports = list;
