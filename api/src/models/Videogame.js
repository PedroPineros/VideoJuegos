const { DataTypes, ARRAY } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating_top:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plataforms: {
      type:DataTypes.JSON,
      allowNull: false,
    },
    background_image:{
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });
};
