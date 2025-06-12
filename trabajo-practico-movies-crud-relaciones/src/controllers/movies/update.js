const db = require("../../database/models");

const update = function(req, res) {
  // TODO
  const { title, awards, rating, length, release_date, genre_id } = req.body;
  // console.log(req.file)
  // return res.json({image})
  // actors = typeof actors === "string" ? [actors] : actors;
  const actors = req.body.actors ? [req.body.actors].flat() : false;
  let movie;
  if (req.file) {
    movie = {
      title: title.trim(),
      awards,
      rating,
      length,
      release_date,
      genre_id,
      image: req.file.filename
    };
  } else {
    movie = {
      title: title.trim(),
      awards,
      rating,
      length,
      release_date,
      genre_id
    };
  }

  db.Movie
    .update(movie, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      db.Actor_Movie
        .destroy({
          where: {
            movie_id: req.params.id
          }
        })
        .then(() => {
          if (actors) {
            const actorsDB = actors.map(actor => {
              return {
                movie_id: req.params.id,
                actor_id: actor
              };
            });
            db.Actor_Movie
              .bulkCreate(actorsDB, {
                validate: true
              })
              .then(() => {
                console.log("Actores agregados correctamente");
              });
          }
        });
    })
    .catch(err => console.log(err))
    .finally(() => res.redirect("/movies"));
};
module.exports = update;
