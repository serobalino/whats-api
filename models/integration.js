'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Integration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Integration.init({
    id_in: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message_in: DataTypes.STRING,
    reply_in: DataTypes.STRING,
    uri_in: DataTypes.STRING,
    next_question_in : {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Integration',
    timestamps: false
  });
  return Integration;
};