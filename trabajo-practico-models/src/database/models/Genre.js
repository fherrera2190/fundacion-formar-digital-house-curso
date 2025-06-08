module.exports = (sequelize, dataTypes) => {
    const alias = "Genre";
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        ranking: {
            type: dataTypes.INTEGER.UNSIGNED,
            unique:true,
            allowNull: false
        },
        active:{
            type: dataTypes.BOOLEAN,
            defaultValue:1
        }
    }
    const config = {
        tableName: "genres",
        timestamps: true,//Si no tiene  marca de tiempo debe ir en false
        underscored:true //Marca de tiempo escrita con un guion bajo
    }
    const Genre = sequelize.define(alias, cols, config);
    return Genre;
}