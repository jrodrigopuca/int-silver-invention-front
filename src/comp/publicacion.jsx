import React,{Component} from 'react';
import Nav from './nav.jsx';

class Publicacion extends Component{
    constructor(){
        super();
        this.state ={
            data: [{}],
            estado:null
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
                        estado:myJSON.res,
                        data: myJSON.res?myJSON.data:[{}]
                    })
                    if (!myJSON.res) alert(myJSON.data)
                })
    }

    render(){
        const {data, estado}= this.state;
        return(
        <React.Fragment>
            <Nav/>
            {estado && (
                <ul>
                    {data.map(item=>(
                        <li key={item.id}>
                            {item.title}
                        </li>
                    ))}
                </ul>)
            }
        </React.Fragment>)
    }
}

export default Publicacion;