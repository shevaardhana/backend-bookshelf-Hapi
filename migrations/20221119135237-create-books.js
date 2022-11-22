'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Books', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.STRING
      },
      summary: {
        type: Sequelize.STRING
      },
      publisher: {
        type: Sequelize.STRING
      },
      pageCount: {
        type: Sequelize.INTEGER
      },
      readPage: {
        type: Sequelize.INTEGER
      },
      finished: {
        type: Sequelize.BOOLEAN
      },
      reading: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Books');
  }
};