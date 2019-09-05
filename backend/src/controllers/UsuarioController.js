const db = require('../database');
const crypt = require('../services/crypt');

async function getUsuario(request, response) {
    const client = db.getDBClient();            

    try{                                   
        const {user} = request.headers;        

        const res = await client.query(`SELECT * FROM usuario WHERE descricao = '${user}'`);            

        if (res.rows.length > 0) {
            return response.json(res.rows);
        } else {
            return response.status(400).json({erro: 'Usuário não encontrado'});
        }              
    } catch (err) {
        console.log(`Erro: ${err}`);    
        return response.status(500).json({erro: 'Erro interno no servidor'});
    } finally {                     
        db.closeDBClient(client);
    }
}

async function validaLogin(request, response){
    const client = db.getDBClient();

    try {
        const { codigo, pass } = request.headers;            
            
        const res = await client.query(`SELECT * FROM usuario WHERE codigo = '${codigo}' AND  senha = '${pass}'`);

        if (res.rows.length > 0){            
            const {encrypted, iv} =  tokenGenerator(codigo, res.rows[0].descricao);                         

            return response.json({ status: 'SUCESSO', result: 1, token: encrypted, iv});                    
        } else {
            return response.json({ status: 'INVALIDO', result: 0});
        }
        
    } catch (err) {
        console.log(`Erro: ${err}`);
        return response.json({ status: 'ERRO', result: -1, error: err});
    } finally {
        db.closeDBClient(client);
    }
}

async function testeDecrypt(request, response){
    const client = db.getDBClient();

    try {
        const { codigo, pass, token, iv } = request.headers;            
            
        const res = await client.query(`SELECT * FROM usuario WHERE codigo = '${codigo}' AND  senha = '${pass}'`);

        if (res.rows.length > 0){                        
            ivBuffer = Buffer.from(iv, 'hex');
            
            decoded =  tokenValidate(codigo, res.rows[0].descricao, token, ivBuffer);                             

            return response.json({ status: 'SUCESSO', result: 1, token: decoded});                    
        } else {
            return response.json({ status: 'INVALIDO', result: 0});
        }
        
    } catch (err) {
        console.log(`Erro: ${err}`);
        return response.json({ status: 'ERRO', result: -1, error: err});
    } finally {
        db.closeDBClient(client);
    }
}

function dateToken(){
    const date = new Date().toLocaleDateString();
    return date;
}

function tokenGenerator(codigo, descricao) {
    const date = dateToken();
    const plainText = codigo + descricao + date;

    const encrypted = crypt.encryptString(plainText);
        
    return encrypted;
}
  
function tokenValidate(codigo, descricao, token, iv){
    const date = dateToken();  
    const valid = codigo + descricao + date;         
    const decrypted = crypt.decryptString(token, iv);     
  
    return valid === decrypted;
}

module.exports = {   
    getUsuario,
    validaLogin, 
    testeDecrypt,
}