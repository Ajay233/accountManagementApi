'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('users', {
       id: {
         type: Sequelize.BIGINT.UNSIGNED,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true
       },
       firstName: {
         type: Sequelize.STRING,
         allowNull: false
       },
       lastName: {
         type: Sequelize.STRING,
         allowNull: false
       },
       password: {
         type: Sequelize.STRING,
         allowNull: false
       },
       avatarUrl: {
         type: Sequelize.STRING,
         allowNull: false
       },
       email: {
         type: Sequelize.STRING,
         unique: true
       },
       permission: {
         type: Sequelize.STRING,
         unique: true
       },
       verified: {
         type:Sequelize.BOOLEAN,
         allowNull: false
       }
     });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('users');
  }
};
