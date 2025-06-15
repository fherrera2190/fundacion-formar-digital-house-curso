const db = require("../database/models");

const getAllActors = async () => {
  try {
    const actors = await db.Actors.findAll();
    if (!actors) {
      throw {
        status: 404,
        message: "No existen actores"
      };
    }
    return actors;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

module.exports = {
  getAllActors,
};
