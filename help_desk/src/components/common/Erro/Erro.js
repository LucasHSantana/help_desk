import React from 'react';

import './Erro.css';

class Erro extends React.Component{

    render() {
        return (
            <div className="container-error">
                <div className="card-error">
                    <h2 className="title-error">{this.props.titulo || 'Houston, temos um problema'}</h2>                    
                    <h4 className="subtitle-error">{this.props.subtitulo || 'Os desenvolvedores estão em chamas'}</h4>
                    <hr className="hr-error"/>
                    <p className="error">{this.props.erro}</p>

                    <button className="button-error" onClick={this.props.onClick}>Fechar</button>
                </div>
            </div>
        );
    }
}

export default Erro;