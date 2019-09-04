import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import { isAuthenticated } from './services/Auth';

import Login from './components/Login/Login';
import Protocolo from './components/Protocolo/Protocolo';
import Loading from './components/Loading/Loading';

function PrivateRoutes({component: Component, ...rest}) {
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
                <Route path="/" exact component={Login} /> {/* Passa um component diretamente para o Route */}
                <Route path="/norecover" render={(props) => <Login norecover/>}/> {/* Passa o componente através do render melhor prática para passar props para o componente */}
                <PrivateRoutes path={"/teste"} component={Protocolo} />
                <Route path="/loading" render={(props) => <Loading visible />} />
                <Route path="*" component={ () => <h1>Página não encontrada</h1>} />
            </Switch>
        </BrowserRouter>
    );
}
