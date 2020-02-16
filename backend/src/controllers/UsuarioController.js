const {tokenGenerator, tokenValidate} = require('../services/crypt');
const {validaToken} = require('../services/common');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Usuarios }  = require('../models');

async function setUsuario(request, response) { 
/*  Cria novo usuário na base de dados  

    OBS: Vale lembrar que todas as requisições, exceto login, necessitam enviar o token e iv no header para validação da sessão.
*/
    try{
        await validaToken(request, response);

        const JUser = request.body; //json com dados do usuário    

        // Tenta localizar o usuário para evitar duplicação
        const res = await Usuarios.findAll({where: { [Op.or]: [{codigo: JUser.codigo}, {email: JUser.email}]}}); 

        if (res.length > 0) {
            return response.json({erro: 'Usuário já cadastrado!'});            
        }

        //Cria o usuário na base de dados
        const user = await Usuarios.create(request.body);

        return response.json(user);
    } catch (err){
        console.log(err);
        return response.status(500).json({ status: 'ERRO', result: -1, error: err.message});        
    }    
}

async function getUsuario(request, response) {     
/*  Localiza um ou mais usuários de acordo com o que for passado na query
    Aceita tanto descrição completa, só parte dela, ou vazio(traz todos os usuários cadastrados).

    Ex: http://localhost:3333/getUsuario?user=Teste (Traz todos usuários que contenham 'Teste' na descrição)
        http://localhost:3333/getUsuario?user (abstrair o atributo traz todos os usuários cadastrados)
        
    OBS: Vale lembrar que todas as requisições, exceto login, necessitam enviar o token e iv no header para validação da sessão.
*/


    try{                                          
        await validaToken(request, response);

        const {user} = request.query;

        // Tenta localizar o usuário informado na query
        const res = await Usuarios.findAll({
            attributes: ['id', 'descricao', 'email', 'createdAt', 'updatedAt'], 
            where: { descricao: {[Op.like]: `%${user}%`}},
        });          

        if (res.length > 0) {
            return response.json(res);
        } else {
            return response.status(400).json({erro: 'Usuário não encontrado'});
        }              
    } catch (err) {
        console.log(`Erro: ${err}`);    
        return response.status(500).json({ status: 'ERRO', result: -1, error: err.message});
    } 
}

async function deleteUsuario(request, response){
/*  Deleta usuário cadastrado na base de dados

    OBS: Vale lembrar que todas as requisições, exceto login, necessitam enviar o token e iv no header para validação da sessão.
*/

    try {
        await validaToken(request, response);

        const { user_id } = request.query;             

        // Tenta excluir usuário informado
        const res = await Usuarios.destroy({where: {id: user_id}});
        
        if  (res > 0) {
            return response.json({msg: 'Usuário excluído com sucesso'});
        } else {
            return response.json({msg: 'Usuário não localizado!'});
        }
    } catch (err){
        console.log(err);
        return response.status(500).json({ status: 'ERRO', result: -1, error: err.message});
    }
}

async function validaLogin(request, response){   
/*  Função de login */

    try {        
        const { codigo, pass } = request.headers;            
            
        // Verifica se código e senha batem com algum registro na base de dados
        const res = await Usuarios.findAll({where: {codigo: codigo, senha: pass}});        

        if (res.length > 0){                      
            // Se login for válido, gera um token e retorna para a aplicação cliente (para validações de login)
            const {encrypted, iv} =  tokenGenerator(codigo, res[0].dataValues.descricao);                         

            return response.json({ status: 'SUCESSO', result: 1, token: encrypted, iv});            
        } else {
            return response.json({ status: 'INVALIDO', result: 0});
        }
        
    } catch (err) {
        console.log(`Erro: ${err}`);
        return response.status(500).json({ status: 'ERRO', result: -1, error: err.message});
    }
}

async function testeDecrypt(request, response){
    try {
        const {token, iv } = request.headers;  
                                        
        decoded = await tokenValidate(token, iv);             

        return response.json({ status: 'SUCESSO', result: 1, decoded});                            
        
    } catch (err) {
        console.log(`Erro: ${err}`);
        return response.status(500).json({ status: 'ERRO', result: -1, error: err.message});
    }
}

module.exports = {   
    setUsuario,
    getUsuario,
    deleteUsuario,
    validaLogin, 
    testeDecrypt,
}