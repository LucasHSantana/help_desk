const db = require('../database');

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

        return response.json((res.rows.length > 0) ? { status: 'SUCESSO'} : { status: 'INVALIDO'});                    
    } catch (err) {
        console.log(`Erro: ${err}`);
    } finally {
        db.closeDBClient(client);
    }
}

module.exports = {   
    getUsuario,
    validaLogin,
}