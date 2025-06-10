const db = require("../../database/models");

const recomended = (req, res) => {
  db.Movie
    .findAll({
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 }
      },
      order: [["rating", "DESC"]]
    })
    .then(movies => {
      res.render("recommendedMovies.ejs", { movies });
    });
};

module.exports = recomended;
