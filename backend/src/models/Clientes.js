module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define('Clientes', {
        razao: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio!',
                }
            }
          },
          fantasia: {
            allowNull: true,
            type: DataTypes.STRING,            
          },
          pessoa: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio!',
                }
            }
          },
          cpf: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          cnpj: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          rg: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          iest: {
            allowNull: true,
            type: DataTypes.STRING,
          },
          uf: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio!',
                }
            }
          },
          email: {
            allowNull: true,
            type: DataTypes.STRING,
          },
    });

    return Clientes;
}