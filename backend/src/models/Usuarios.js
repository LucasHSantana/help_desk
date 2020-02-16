module.exports =  (sequelize, DataTypes) => {
    const Usuarios = sequelize.define('Usuarios', {
        //atributos
        descricao:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Este campo não pode ser vazio!',
                }
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio!',
                },
                len:{
                    args: [4, 20],
                    msg: 'Senha precisa ter entre 4 e 20 caracteres',
                }
            }
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Este campo não pode ser vazio!',
                },
                len:{
                    args: [3, 10],
                    msg: 'Código precisa ter entre 3 e 10 caracteres',
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Este campo não pode ser vazio!',
                },                
            }
        }
    });

    return Usuarios;
};