'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Conversation.init({
    question_co: DataTypes.INTEGER,
    answer_co: DataTypes.STRING,
    from_co: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  Conversation.removeAttribute('id');
  return Conversation;
};
