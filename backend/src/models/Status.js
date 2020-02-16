module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        //Atributos
        descricao: {
            type: DataTypes.STRING,
            allowNull: false,
            validade: {
                notEmpty: {
                    msg: 'Este campo não pode ser vazio!',
                }
            }
        }
    });

    return Status;
}