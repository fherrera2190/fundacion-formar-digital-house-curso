const db = require("../../database/models");
const moment = require("moment");
const edit = function(req, res) {
  // TODO
  const genres = db.Genre.findAll({ order: ["name"] });
  const actors = db.Actor.findAll({
    order: [["first_name", "ASC"], ["last_name", "ASC"]]
  });
  // const movie = D
  const movie = db.Movie.findByPk(req.params.id, { include: ["actors"] });

  Promise.all([genres, movie, actors])
    .then(([genres, movie, actors]) => {
      //  return res.json(movie);
      //  return res.json(actors);
      //  return res.json(movie);

      return res.render("moviesEdit", {
        allGenres: genres,
        Movie: movie,
        actors,
        moment
      });
    })
    .catch(error => {
      console.log(error);
    });
};
module.exports = edit;
