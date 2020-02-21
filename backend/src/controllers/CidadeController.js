const {validaToken, geraStatus} = require('../services/common');
const {statusCode} = require('../common/Bibli');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Cidades } = require('../models');

async function setCidade(request, response) {
/*  Cria nova cidade na base de dados  

    OBS: Vale lembrar que todas as requisições, exceto login, necessitam enviar o token e iv no header para validação da sessão.
*/
    try {
        // await validaToken(request, response);

        JCidade = request.body; // json com dados da cidade

        if (!JCidade.descricao) {
            return geraStatus(response, statusCode.BAD_REQUEST, undefined, true);
        }

        //Tenta localizar a cidade para evitar duplicação
        // const res = await Cidades.findAll({where: { descricao: JCidade.descricao}});
        const res = await Cidades.findAll(
            {where: 
                Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('descricao')), Sequelize.fn('unaccent', `${JCidade.descricao}`)),
            }
        );

        if (res.length > 0) {
            // return response.json({erro: 'Cidade já cadastrada!'});
            return geraStatus(response, statusCode.OK, 'Cidade já cadastrada', true)
        }

        //Cria a cidade na base de dados
        const cidade = await Cidades.create(request.body);

        // return response.json(cidade);
        return geraStatus(response, statusCode.OK, cidade);
    } catch (err) {
        console.log(err);
        // return response.json({ status: 'ERRO', result: -1, error: err.message});
        return geraStatus(response, statusCode.INTERNAL_ERROR, err.message, true);
    }
}

async function getCidade(request, response){
/*  Localiza uma ou mais cidades na base de dados
    Necessita ao menos parte da cidade para realizar a consulta

    OBS: Vale lembrar que todas as requisições, exceto login, necessitam enviar o token e iv no header para validação da sessão.
*/

    try {
        // await validaToken(request, response);        
        const { cidade_filter } = request.query;    

        //Se parametro para filtro for vazio, cancela a operação e retorna erro
        if (cidade_filter === ''){
            // return response.status(404).json({status: 'ERRO', result: -1, erros: 'Parâmetro inválido'});
            return geraStatus(response, statusCode.BAD_REQUEST, undefined, error = true)
        }

        /*  Localiza a cidade
            Usa iLike para case insensitive
            Usa Sequelize.fn para usar a extensão unaccent (accent insensitive)
        */  

        const res = await Cidades.findAll(
            {where: 
                Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('descricao')), {[Op.iLike]: Sequelize.fn('unaccent', `%${cidade_filter}%`)}),
            }
        );           

        /*  Exemplo para quando precisar de mais de um parametro no where

            {where: [
            Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('descricao')), {[Op.iLike]: Sequelize.fn('unaccent', `%${cidade_filter}%`)}),
            Sequelize.where(Sequelize.fn('unaccent', Sequelize.col('uf')), {[Op.iLike]: Sequelize.fn('unaccent', `%SP%`)})]
            }); 
        */                          

        if (res.length <= 0){
            // return response.status(404).json({status: 'ERRO', result: -1, erros: 'Cidade não localizada!'});
            return geraStatus(response, statusCode.OK, 'Cidade não localizada', true);
        }        

        // return response.json(res);
        return geraStatus(response, statusCode.OK, res);

    } catch (err){
        // return response.status(500).json({status: 'ERRO', result: -1, erros: err.message});
        return geraStatus(response, statusCode.INTERNAL_ERROR, err.message, true);
    }
}

async function getCidadeById(request, response){
    /*
        Consulta uma cidade na base de dados através do ID enviado no parâmetro da Url
    */

    try {
        const { id } = request.params; // Pega o parâmetro ID da Url

        // Se não existe o parametro, gera erro
        if (!id){
            return geraStatus(response, statusCode.BAD_REQUEST, undefined, true);
        }

        // Realiza a consulta no BD através da PK
        const res = await Cidades.findByPk(Number(id));

        if (!res.id){
            return geraStatus(response, statusCode.OK, 'Cidade não localizada', true);
        }

        return geraStatus(response, statusCode.OK, res);
        
    } catch (err) {
        return geraStatus(response, statusCode.INTERNAL_ERROR, err.message, true);
    }
}

async function updateCidade(request, response){
    try {
        const { id } = request.params;
        const JCidade = request.body;

        if (!id){
            return geraStatus(response, statusCode.BAD_REQUEST, undefined, true);
        }        

        let cidade = await Cidades.findByPk(Number(id));

        if (!cidade.id){
            return geraStatus(response, statusCode.OK, 'Cidade não localizada', true);
        }

        for (key in cidade.rawAttributes) {
            if ((JCidade[key] !== undefined) || (key !== 'id')){
                if (JCidade[key] !== cidade[key]){                
                    cidade.set(key, JCidade[key]);
                }
            }
        }

        const res = await cidade.save();        

        return geraStatus(response, statusCode.OK, res);

    } catch (err) {
        return geraStatus(response, statusCode.INTERNAL_ERROR, err.message, true);   
    }
}

async function deleteCidade(request, response) {
/*  Deleta cidade cadastrada na base de dados

    OBS: Vale lembrar que todas as requisições, exceto login, necessitam enviar o token e iv no header para validação da sessão.
*/
    try {
        await validaToken(request, response);

        const { cidade_id } = request.query;

        if (!cidade_id) {
            return geraStatus(response, statusCode.BAD_REQUEST, undefined, true);
        }

        //Deleta a cidade
        const res = await Cidades.destroy({where: {id: cidade_id}});

        if (res > 0) {
            // return response.json({msg: 'Cidade excluída com sucesso'});
            return geraStatus(response, statusCode.OK, 'Cidade excluída com sucesso');
        } else {
            // return response.json({msg: 'Cidade não localizada'});
            return geraStatus(response, statusCode.OK, 'Cidade não localizada', true);
        }
    } catch (err) {
        console.log(err);
        // return response.status(500).json({ status: 'ERRO', result: -1, error: err.message});
        return geraStatus(reponse, statusCode.INTERNAL_ERROR, err.message, true);
    }
}

module.exports = {
    setCidade,
    getCidade,
    getCidadeById,
    deleteCidade,
    updateCidade,
}