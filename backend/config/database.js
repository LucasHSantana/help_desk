module.exports = {
  username: 'helpdesk_test',
  password: '1234',
  database: 'helpdesk',
  host: 'localhost',
  dialect: 'postgres',
  /* logging permite ou previne que o sequelize imprima um log a cada operação
    Ideal manter mostrando o log em dev e retirar em produção
    Previnir: Definir como false
    Permitir: Definir uma função (aqui pode-se usar uma função própria para imprimir o log onde quiser)
    Ex:
      logging: false
      logging: console.log 
  */ 
  logging: console.log, 
}