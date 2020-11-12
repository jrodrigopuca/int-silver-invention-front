import React from 'react';
import {Link} from 'react-router-dom';

const style={
    listStyleType:'none',
    margin:10,
    padding:0,    
    display:'inline',
    backgroundColor: 'white'
}

const Nav = ()=>{
    return(
        <nav>
            <ul >
                <Link to="/"><li style={style}>Inicio</li></Link>
                <Link to="/login"><li style={style}>Login</li></Link>
                <Link to="/fotos"><li style={style}>Galeria</li></Link>
                <Link to="/posts"><li style={style}>Publicaciones</li></Link>
            </ul>
        </nav>
    )
}

export default Nav;
