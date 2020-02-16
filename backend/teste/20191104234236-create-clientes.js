'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      razao: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      fantasia: {
        allowNull: true,
        type: Sequelize.STRING(60),
      },
      pessoa: {
        allowNull: false,
        type: Sequelize.STRING(1),
      },
      cpf: {
        allowNull: true,
        type: Sequelize.STRING(11),
      },
      cnpj: {
        allowNull: true,
        type: Sequelize.STRING(14),
      },
      rg: {
        allowNull: true,
        type: Sequelize.STRING(11),
      },
      iest: {
        allowNull: true,
        type: Sequelize.STRING(9),
      },
      uf: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(60),
      },
      createdAt:{
        allowNull:false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Clientes');
  }
};
