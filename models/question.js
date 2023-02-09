'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init({
    id_qu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question_qu: DataTypes.STRING,
    process_qu: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sub_questions : {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Question,
        key: 'id_qu'
      }
    }
  }, {
    sequelize,
    modelName: 'Question',
    timestamps: false
  });
  return Question;
};
