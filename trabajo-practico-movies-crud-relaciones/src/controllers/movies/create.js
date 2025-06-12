const { validationResult } = require("express-validator");
const db = require("../../database/models");

const create = function(req, res) {
  // TODO
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.render("moviesAdd", {
  //     errors: errors.mapped(),
  //     old: req.body
  //   });
  // }
  // console.log("Sigo por aca");
  // return res.json(req.file);
  const { title, rating, awards, release_date, length, genre_id } = req.body;
  const actors = req.body.actors ? [req.body.actors].flat() : false;
  db.Movie
    .create({
      title: title.trim(),
      rating,
      awards,
      release_date,
      length,
      genre_id,
      image: req.file ? req.file.filename : null
    })
    .then(movie => {
      if (actors) {
        const actorsDB = actors.map(actor => {
          return {
            movie_id: movie.id,
            actor_id: actor
          };
        });
        db.Actor_Movie
          .bulkCreate(actorsDB, {
            validate: true
          })
          .then(() => {
            console.log("Actores agregados correctamente");
            return res.redirect("/movies");
          });
      } else {
        return res.redirect("/movies");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = create;
