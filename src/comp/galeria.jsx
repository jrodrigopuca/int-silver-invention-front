import React,{Component} from 'react';
import Nav from './nav.jsx';

class Galeria extends Component{
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
                    this.setState({
                        logeado:myJSON.res,
                        data: myJSON.res?myJSON.data:[{}]
                    })
                    if (!myJSON.res) alert(myJSON.data)
                })
    }

    render(){
        const {data, logeado}= this.state;
        return(
        <React.Fragment>
            <Nav/>
            <h1>Galeria</h1>
            {logeado ? (
                <ul>
                    {data.map(item=>(
                        <li key={item.id}>
                            {item.title}
                        </li>
                    ))}
                </ul>)
                : (<p> Aún no iniciaste sesión para ver este contenido </p>)
            }
        </React.Fragment>)
    }
}

export default Galeria;