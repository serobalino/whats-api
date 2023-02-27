'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Integrations', {
      id_in: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message_in: {
        type: Sequelize.STRING
      },
      reply_in: {
        type: Sequelize.STRING
      },
      uri_in: {
        type: Sequelize.STRING,
        allowNull: true
      },
      next_question_in: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: 'Questions'
          },
          key: 'id_qu'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Integrations');
  }
};
