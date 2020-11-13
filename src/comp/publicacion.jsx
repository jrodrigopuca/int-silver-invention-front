import React,{Component} from 'react';
import Nav from './nav.jsx';
import './publicacion.css';
class Publicacion extends Component{
    constructor(){
        super();
        this.state ={
            data: [{}],
            logeado:false
        }
    }

    componentDidMount(){
        const jwt = localStorage.getItem('jwt');

        fetch('http://localhost:3001/posts',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':jwt}
                })
                .then(response=>response.json())
                .then(myJSON=>{
                    if (!myJSON.res){
                        alert(myJSON.data);
                        localStorage.removeItem('jwt');
                    }

                    this.setState({
                        logeado:myJSON.res,
                        data: myJSON.res?myJSON.data:[{}]
                    })
                })
    }

    render(){
        const {data, logeado}= this.state;
        return(
        <React.Fragment>
            <Nav/>
            <>
                <h1>Publicaciones</h1>
                {logeado ? (
                    <ul>
                        {data.map(item=>(
                            <li className="publicacion" key={item.id}>
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                            </li>
                        ))}
                    </ul>)
                    : (<p> Aún no iniciaste sesión para ver este contenido </p>)
                }
            </>
        </React.Fragment>)
    }
}

export default Publicacion;