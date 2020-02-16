import React, { Component } from 'react';
import api from '../../services/Api';
import ComboBox from '../common/ComboBox/ComboBox';
import Erro from '../common/Erro/Erro';
import Loading from '../common/Loading/Loading';

const estados = [
    {
        value: 'Acre',
        key: 'AC',
    },       
    {
        value: 'Alagoas',    
        key: 'AL',
    },       
    {
        value: 'Amapá',    
        key: 'AP',
    },       
    {
        value: 'Amazonas',    
        key: 'AM',
    },       
    {
        value: 'Bahia',    
        key: 'BA',
    },       
    {
        value: 'Ceará',    
        key: 'CE',
    },       
    {
        value: 'Distrito Federal',    
        key: 'DF',
    },       
    {
        value: 'Espírito Santo',    
        key: 'ES',
    },       
    {
        value: 'Goiás',    
        key: 'GO',
    },       
    {
        value: 'Maranhão',    
        key: 'MA',
    },       
    {
        value: 'Mato Grosso',    
        key: 'MT',
    },       
    {
        value: 'Mato Grosso do Sul',    
        key: 'MS',
    },       
    {
        value: 'Minas Gerais',    
        key: 'MG',
    },       
    {
        value: 'Pará',    
        key: 'PA',
    },       
    {
        value: 'Paraíba',    
        key: 'PB',
    },       
    {
        value: 'Paraná',    
        key: 'PR',
    },       
    {
        value: 'Pernambuco',    
        key: 'PE',
    },       
    {
        value: 'Piauí',    
        key: 'PI',
    },       
    {
        value: 'Rio de Janeiro',    
        key: 'RJ',
    },       
    {
        value: 'Rio Grande do Norte',    
        key: 'RN',
    },       
    {
        value: 'Rio Grande do Sul',    
        key: 'RS',
    },       
    {
        value: 'Rondônia',    
        key: 'RO',
    },       
    {
        value: 'Roraima',    
        key: 'RR',
    },       
    {
        value: 'Santa Catarina',    
        key: 'SC',
    },       
    {
        value: 'São Paulo',    
        key: 'SP',
    },       
    {
        value: 'Sergipe',    
        key: 'SE',
    },       
    {
        value: 'Tocantins',
        key: 'TO',
    },
]
    
class Cidade extends Component {
    constructor(props){
        super(props);

        this.state = {
            //Interno React
            interno: {            
                isErro: false,
                erro: '',
                titulo: '',
                subtitulo: '',
                isLoading: false,
            },
            //Campo BD
            descricao: '',
            uf: '',        
        }
    }

    handleChange = (event) =>{
        const state = Object.assign({}, this.state);
        const campo = event.target.name;
        const type = event.target.type;
        
        if (type === 'checkbox'){
            state[campo] = Number(event.target.checked);
        }else{
            state[campo] = event.target.value;
        }

        this.setState(state);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post('/setCidade', JSON.stringify(this.state), {
                headers: {
                     'content-type': 'application/json',
                },
           });
    
            if (response.data.result) {
                console.log('OK');
            }else{
                this.showError(true, response.data.error, 'Erro', ' ');                
            }       
        } catch (error) {
           this.showError(true, error.message, 'Erro interno');
        }        
    }

    carregaDados = async () =>{        
        const state = Object.assign({}, this.state);        
        
        try{    
            const { id } = this.props.match.params;        

            if (id) {            
                const response = await api.get('/getCidade/' + id);            

                if (response.data.result){                                  

                    for (const campo in response.data.result){
                        state[campo] = response.data.result[campo];
                    }

                    this.setState(state, () => {console.log(this.state)});

                }
            }else{
                console.log('nada');
            }
        } catch (err) {
            this.showError(true, err.message, 'Erro interno');
        } finally {
            state['interno'] = {...state.interno, isLoading: false};
            this.setState(state, () => {console.log(this.state)});
        }
    }

    componentDidMount = async () => {
        const state = Object.assign({}, this.state);
    
        state['interno'] = {...state.interno, isLoading: true};
        this.setState(state, () => {console.log(this.state)});

        await this.carregaDados();                    
    }

    showError = (isErro, erro, titulo, subtitulo) => {
        /* Seta o state interno para preencher as informações de erro.
        '...state.interno' serve para manter os dados que não foram informados aqui,
        senão seria sobrescrito */

        const state = Object.assign({}, this.state);
        state['interno'] = {...state.interno, isErro, erro, titulo, subtitulo}    
        
        this.setState(state, () => {console.log(this.state)});
    }

    hideError = () => {
        /* Seta o state interno para apagar as informações de erro.
        '...state.interno' serve para manter os dados que não foram informados aqui,
        senão seria sobrescrito */

        const state = Object.assign({}, this.state);
        state['interno'] = {...state.interno, isErro: false, erro: '', titulo: '', subtitulo: ''};

        this.setState(state);
    }

    render() {

        return ( 
            <div>
                {
                    this.state.interno.isLoading &&
                    <Loading visible/>
                }

                { this.state.interno.isErro && 
                    <Erro 
                        titulo={this.state.interno.titulo} 
                        subtitulo={this.state.interno.subtitulo} 
                        erro={this.state.interno.erro} 
                        onClick={this.hideError} 
                    />
                }           
                <div>                
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="descricao" placeholder="Descrição da cidade" onChange={this.handleChange} value={this.state.descricao} autoFocus={true}/>
                        <ComboBox title="Estado" name="uf" list={estados} value={this.state.uf} onChange={this.handleChange}/>
                        <button type="reset">Cancelar</button>
                        <button type="submit">Gravar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Cidade;