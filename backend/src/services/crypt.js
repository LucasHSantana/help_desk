const crypto = require('crypto');
const moment = require('moment');
const { Usuarios }  = require('../models');

const algorithm = 'aes-192-cbc'; // Algoritmo utilizado
const password = "teste123"; // chave secreta
const iv_length = 16 // Sempre 16 para AES
const key_length = 24 // Sempre 24 para AES

const key = crypto.scryptSync(password, 'salt', key_length); // Cria a chave privada

function encryptString(plainText) {    
    const iv = crypto.randomBytes(iv_length); // Gera o vetor de inicialização

    const cypher = crypto.createCipheriv(algorithm, key, iv); // Cria o "codificador"

    let encrypted = cypher.update(plainText, 'utf-8', 'hex'); // Encripta a string
    encrypted += cypher.final('hex'); // mescla dados adicionais
    
    return {encrypted, iv: iv.toString('hex')};
}

function decryptString(encrypted, iv) {
    const decypher = crypto.createDecipheriv(algorithm, key, iv); // Cria o "descodificador"

    let decrypted = decypher.update(encrypted, 'hex', 'utf-8'); // Desencripta o código
    decrypted += decypher.final('utf-8'); // mescla dados adicionais

    return decrypted;
}

function dateToken(){
// Utiliza a função 'moment' para pegar a data atual
    const date = moment();
    return date;
}

function addZeros(num){
// Adiciona um zero a esquerda e mantem o tamanho em 2 caracteres
    return ('0' + num).slice(-2);
}

function tokenGenerator(codigo, descricao) {
    const date = dateToken(); //Pega a data atual
    //Cria uma string com todas as informações relevantes para criar o token de validação
    const plainText = addZeros(codigo.length) + addZeros(descricao.length) + codigo + descricao + date; 

    const encrypted = encryptString(plainText); //Gera o token encriptado
        
    return encrypted;
}
  
async function tokenValidate(token, iv){ 
    ivBuffer = Buffer.from(iv, 'hex'); // Gera um buffer em hexadecimal necessário para descriptografar o token
    const decrypted = decryptString(token, ivBuffer); //Descriptografa o token

    //As linhas abaixo leem as informações do token para confrontar com o usuário cadastrado  
    const lenCodigo = parseInt(decrypted.substring(0, 2));
    const lenDescricao = parseInt(decrypted.substring(2, 4));
    
    let pos = 4;
    const codigo  = decrypted.substring(pos, pos + lenCodigo);  
    pos += lenCodigo;

    const descricao = decrypted.substring(pos, pos + lenDescricao);
    pos += lenDescricao;
    
    const date = new Date(parseInt(decrypted.substring(pos), 10));

    var base = moment();    
    var diffDate = base.diff(date, 'days');
    
    const res = await Usuarios.findAll({where: {codigo: codigo, descricao: descricao}});

    return (res.length > 0 && diffDate === 0); // Retorna se o token é válido ou não
}

module.exports = {
    encryptString, 
    decryptString,
    tokenGenerator,
    tokenValidate
}


