'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      author: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      nodejs: {
        type: Sequelize.BOOLEAN
      },
      reactjs: {
        type: Sequelize.BOOLEAN
      },
      nextjs: {
        type: Sequelize.BOOLEAN
      },
      typescript: {
        type: Sequelize.BOOLEAN
      },
      durasi: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('tb_projects');
  }
};