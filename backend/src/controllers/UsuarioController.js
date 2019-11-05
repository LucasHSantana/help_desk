const crypt = require('../services/crypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');

const { Usuarios }  = require('../models');

async function store(request, response) {    
    const user = await Usuarios.create(request.body);

    return response.json(user);
}

async function getUsuario(request, response) {            
    try{                                          
        const {user} = request.headers;                
        const res = await Usuarios.findAll({where: { descricao: {[Op.like]: `%${user}%`} }});          
        if (res.length > 0) {
            return response.json(res);
        } else {
            return response.status(400).json({erro: 'Usuário não encontrado'});
        }              
    } catch (err) {
        console.log(`Erro: ${err}`);    
        return response.status(500).json({erro: 'Erro interno no servidor'});
    } finally {                     
        
    }
}

async function validaLogin(request, response){   

    try {        
        const { codigo, pass } = request.headers;            
            
        const res = await Usuarios.findAll({where: {codigo: codigo, senha: pass}});        

        if (res.length > 0){                      
            const {encrypted, iv} =  tokenGenerator(codigo, res[0].dataValues.descricao);                         

            return response.json({ status: 'SUCESSO', result: 1, token: encrypted, iv});            
        } else {
            return response.json({ status: 'INVALIDO', result: 0});
        }
        
    } catch (err) {
        console.log(`Erro: ${err}`);
        return response.json({ status: 'ERRO', result: -1, error: err});
    } finally {
        
    }
}

async function testeDecrypt(request, response){
    try {
        const {token, iv } = request.headers;  
                    
        ivBuffer = Buffer.from(iv, 'hex');            
        decoded = await tokenValidate(token, ivBuffer);             

        return response.json({ status: 'SUCESSO', result: 1, decoded});                            
        
    } catch (err) {
        console.log(`Erro: ${err}`);
        return response.json({ status: 'ERRO', result: -1, error: err.message});
    } finally {
        
    }
}

function dateToken(){
    const date = new Date().toLocaleDateString();
    return date;
}

function addZeros(num){
    return ('0' + num).slice(-2);
}

function tokenGenerator(codigo, descricao) {
    const date = dateToken();
    const plainText = addZeros(codigo.length) + addZeros(descricao.length) + codigo + descricao + date;

    const encrypted = crypt.encryptString(plainText);
        
    return encrypted;
}
  
async function tokenValidate(token, iv){           
    const decrypted = crypt.decryptString(token, iv);     
  
    const lenCodigo = parseInt(decrypted.substring(0, 2));
    const lenDescricao = parseInt(decrypted.substring(2, 4));
    
    let pos = 4;
    const codigo  = decrypted.substring(pos, pos + lenCodigo);  
    pos += lenCodigo;

    const descricao = decrypted.substring(pos, pos + lenDescricao);
    pos += lenDescricao;
    
    const date = new Date(decrypted.substring(pos));

    var base = moment();    
    var diffDate = base.diff(date, 'days');
    
    const res = await Usuarios.findAll({where: {codigo: codigo, descricao: descricao}});

    return (res.length > 0 && diffDate === 0);
}

module.exports = {   
    store,
    getUsuario,
    validaLogin, 
    testeDecrypt,
}