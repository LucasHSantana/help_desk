const crypto = require('crypto');

const algorithm = 'aes-192-cbc';
const password = "teste123"; // chave secreta
const iv_length = 16 // Sempre 16 para AES
const key_length = 24 // Sempre 24 para AES

const key = crypto.scryptSync(password, 'salt', key_length);

function encryptString(plainText) {    
    const iv = crypto.randomBytes(iv_length);

    const cypher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cypher.update(plainText, 'utf-8', 'hex');
    encrypted += cypher.final('hex');    
    
    return {encrypted, iv: iv.toString('hex')};
}

function decryptString(encrypted, iv) {
    const decypher = crypto.createDecipheriv(algorithm, key, iv);

    let decrypted = decypher.update(encrypted, 'hex', 'utf-8');
    decrypted += decypher.final('utf-8');

    return decrypted;
}

module.exports = {
    encryptString, 
    decryptString,
}


