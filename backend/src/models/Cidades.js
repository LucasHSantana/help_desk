module.exports = (sequelize, DataTypes) => {
    const Cidades = sequelize.define('Cidades', {
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            validade: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio!',
                }
            }
        },
        uf: {
            type: DataTypes.STRING,
            allowNull: false,
            validade: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio!',
                }
            }
        },        
    });

    return Cidades;
}