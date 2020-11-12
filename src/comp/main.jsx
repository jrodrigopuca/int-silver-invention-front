import React from 'react';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

import Nav from './nav';
import Login from './login';
import Galeria from './galeria';
import Publicaciones from './publicacion'


const Inicio = () => (
<section>
    <Nav/>
    <p>Bienvenido</p> 
</section>);


function Main(){
    return(
        <Router>
            <Switch> 
            <Route path="/" exact component={Inicio}/>
            <Route path="/login" component={Login}/>
            <Route path="/fotos" component={Galeria}/>
            <Route path="/posts" component={Publicaciones}/>
            </Switch>
        </Router>
    );
}

export default Main;