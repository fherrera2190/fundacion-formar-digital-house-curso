module.exports = (sequelize, dataTypes) => {
  let alias = "Actor_Movie";
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    // created_at: dataTypes.TIMESTAMP,
    // updated_at: dataTypes.TIMESTAMP,
    actor_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    movie_id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  };
  let config = {
    tableName: "actor_movie",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: false,
  };
  const Actor_Movie = sequelize.define(alias, cols, config);
  return Actor_Movie;
};
