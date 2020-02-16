const {statusCode} = require('../common/Bibli');

async function validaToken(request, response){
    const {token, iv} = request.headers; 

    const validacao = await tokenValidate(token, iv); // Verifica se login é válido

    if (!validacao) {
        return response.json({ status: 'ERRO', result: -1, error: 'Login inválido!'});
    }
}

function geraStatus(response, status, message, error=false){
    let statusName = '';

    switch (status){
        case statusCode.OK:
            statusName = 'OK';            
            break;
        case statusCode.CREATED:
            statusName = 'CREATED';
            break;
        case statusCode.ACCEPTED:
            statusName = 'ACCEPTED';
            break;
        case statusCode.BAD_REQUEST:
            statusName = 'BAD_REQUEST';
            break;
        case statusCode.UNAUTHORIZED:
            statusName = 'UNAUTHORIZED';
            break;
        case statusCode.FORBIDDEN:
            statusName = 'FORBIDDEN';
            break;
        case statusCode.NOT_FOUND:
            statusName = 'NOT_FOUND';
            break;
        case statusCode.INTERNAL_ERROR:
            statusName = 'INTERNAL_ERROR';
            break;
        case statusCode.NOT_IMPLEMENTED:
            statusName = 'NOT_IMPLEMENTED';
            break;
        default:
            statusName = 'ERROR';
    }

    if (!message){
        message = statusName;
    }

    if (error){
        return response.status(status).json({status: statusName, code: status, error: message});
    } else {
        return response.status(status).json({status: statusName, code: status, result: message});
    }
}

module.exports = {
    validaToken,
    geraStatus,    
}