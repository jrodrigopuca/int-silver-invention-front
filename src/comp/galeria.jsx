import React,{Component} from 'react';
import Nav from './nav.jsx';
import {PaginatedList} from 'react-paginated-list';

class Login extends Component{

    constructor(){
        super();
        this.state ={
            data: [{}],
            estado:null
        }
    }

    componentDidMount(){
        const jwt = localStorage.getItem('jwt');

        fetch('http://localhost:3001/fotos',{
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
                <PaginatedList
                    list={data}
                    itemsPerPage={10}
                    renderList={(lista)=>(
                        <React.Fragment>
                            {lista.map((x)=>{
                                return(
                                    <div key={x.id}>
                                        {x.thumbnailUrl}
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    )}


                />
            )}
        </React.Fragment>)
    }
}

export default Login;