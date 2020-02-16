module.exports = (sequelize, DataTypes) => {
    const Telefones = sequelize.define('Telefones', {
        //Atributos
        telefone: {
            allowNull: false,
            type: DataTypes.STRING,        
            validate: {
                notEmpty: {
                    msg: 'Esse campo não pode ser vazio!'
                }
            }
          },
          clientes_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
              model: 'Clientes',
              key: 'id', 
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },          
    });    

    return Telefones;
}