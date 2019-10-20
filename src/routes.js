import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Login from './pages/Login';
import Inicio from './pages/Inicio';

export default function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/inicio/:id" component={Inicio} />
        </BrowserRouter>
    );
}