import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import { isAuthenticated } from './services/Auth';

import Login from './components/Login/Login';
import Protocolo from './components/Protocolo/Protocolo';
import Loading from './components/Loading/Loading';
import Cidade from './components/Cidade/Cidade';

function PrivateRoute
({component: Component, ...rest}) {
    /* Se estiver autenticado, vai para o component informado na rota,
        senão, é redirecionado para a rota raiz (pagina de login)
    */
    return(
        <Route
            {...rest}
            render = {props => 
                isAuthenticated() ? (                   
                    <Component {...props} /> 
                ) : (
                    <Redirect to={{pathname: "/", state: {from: props.location}}} />
                )
            }    
        />
    );
}

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/* Passa um component diretamente para o Route */}
                <Route path="/" exact component={Login} /> 
                {/* Passa o componente através do render melhor prática para passar props para o componente 
                    precisa passar o routeProps para o componente (são informações essenciais para roteamento)
                */}
                <Route path="/norecover" render={(routeProps) => <Login norecover {...routeProps}/>}/> 
                {/* Rota privada que precisa de autenticação para continuar */}
                <PrivateRoute path={"/teste"} component={Protocolo} />
                <PrivateRoute path={"/cidade"} component={Cidade} />
                <Route path="/loading" render={(routeProps) => <Loading visible {...routeProps}/>} />
                <Route path="*" component={ () => <h1>Página não encontrada</h1>} />
            </Switch>
        </BrowserRouter>
    );
}
