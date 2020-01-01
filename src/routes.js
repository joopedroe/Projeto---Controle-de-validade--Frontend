import React from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import Login from './pages/Login';
import Inicio from './pages/Inicio';
import CadastroProduto from './pages/CadastroProduto';
import {logado} from './services/secao'

const PrivateRoute = ({component:Component, ...rest}) => (
    <Route {...rest} render={props => (
        logado() ? (
            <Component {... props}></Component>
        ) : (
            <Redirect to={{pathname:'/'}}></Redirect>
        )
    )} />
)
export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <PrivateRoute path="/inicio" component={Inicio} />
            <PrivateRoute path="/cadastro/produto" exact component={CadastroProduto} />
        </BrowserRouter>
    );
}