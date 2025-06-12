const db = require("../../database/models");

const destroy = function(req, res) {
  // TODO
  // return res.json(req.params.id);
  db.Actor_Movie
    .destroy({
      where: {
        movie_id: req.params.id
      }
    })
    .then(() => {
      db.Actor
        .update(
          {
            favorite_movie_id: null
          },
          {
            where: {
              favorite_movie_id: req.params.id
            }
          }
        )
        .then(() => {
          db.Movie
            .destroy({
              where: {
                id: req.params.id
              }
            })
            .then(() => {
              db.Movie
                .destroy({
                  where: {
                    id: req.params.id
                  }
                })
                .then(() => {
                  return res.redirect("/movies");
                });
            });
        });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports = destroy;
