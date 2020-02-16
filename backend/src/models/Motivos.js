module.exports = (sequelize, DataTypes) => {
    const Motivos = sequelize.define('Motivos', {
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio!',
                }
            }
        }
    });

    return Motivos;
}