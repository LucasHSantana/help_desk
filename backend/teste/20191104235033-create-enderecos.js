'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Enderecos',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING(8),
      },
      logradouro: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      numero: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      bairro: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      complemento: {
        allowNull: true,
        type: Sequelize.STRING(60),
      },
      cidades_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Cidades',
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      clientes_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Enderecos');
  }
};
