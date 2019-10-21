import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Login from './pages/Login';
import Inicio from './pages/Inicio';
import CadastroProduto from './pages/CadastroProduto';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/inicio" component={Inicio} />
            <Route path="/cadastro/produto" exact component={CadastroProduto} />
        </BrowserRouter>
    );
}