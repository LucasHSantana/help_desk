const { Client } = require('pg');

function getDBClient() {
    const client = new Client({
        user: 'helpdesk_test',
        password: 'Sparrow286',
        host: 'localhost',
        database: 'helpdesk',
        port: 5432,
    });

    try {
        const connect = async () => { await client.connect() };
        connect();
        
        return client;
    } catch (err) {
        console.warn('Erro ao conectar com o banco de dados');
        console.error(err);
        return null;
    }
}

function closeDBClient(client) {
    const close = async () => {
        await client.end(err => {
            if (err) {
                console.log('error during disconnection', err.stack)
            }
        });
    }    
    close();
}

module.exports = {
    getDBClient,
    closeDBClient,
}