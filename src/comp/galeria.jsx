import React,{Component} from 'react';
import Nav from './nav.jsx';
import ReactPaginate from 'react-paginate';
import './galeria.css';


/**
 * @method Lista: mostrar las imagenes
 * @param {data} props  
 */
function Lista (props){
    return (props.data.map(item=>(
        <figure className="card">
            <img src={item.thumbnailUrl} alt="imagen"/>
            <figcaption>{item.id}: {item.title}</figcaption>
        </figure>
    )))
}


/**
 * @class Galeria
 * @description Mostrar una galeria de imagenes con paginación
 */
class Galeria extends Component{
    constructor(){
        super();
        this.state ={
            data: [{}],
            mostrar:[{}],
            logeado:false,
            offset:0,
            limit:10,
            paginas:0,
            actualPagina:0
        }
        this.clickPaginacion= this.clickPaginacion.bind(this);
    }

    componentDidMount(){
        this.cargarDatos();
    }

    cargarDatos(){
        const jwt = localStorage.getItem('jwt');
        fetch('http://localhost:3001/fotos',{
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
                const mostrar=myJSON.res?myJSON.data.slice(this.state.offset, this.state.offset+this.state.limit):[];
                const data=myJSON.res?myJSON.data:[];

                this.setState({
                    logeado:myJSON.res,
                    data: data,
                    mostrar: mostrar,
                    paginas: Math.ceil(data.length/this.state.limit)
                })

            })
    }

    actualizarMostrar(){
        this.setState({
            mostrar: this.state.data.slice(this.state.offset, this.state.offset+this.state.limit)
        })
    }


    clickPaginacion = (e)=>{
        this.setState({
            actualPagina: e.selected,
            offset: e.selected * this.state.limit,
        })
        this.cargarDatos();
        //this.actualizarMostrar();
    }


    render(){
        const {logeado, mostrar, paginas}= this.state;
        return(
        <React.Fragment>
            <Nav/>
            <>
                <h1>Galeria</h1>
                {logeado?(
                    <>
                    <Lista data={mostrar} />
                    <ReactPaginate
                        previousLabel={'anterior'}
                        nextLabel={'siguiente'}
                        breakLabel={'...'}
                        breakClassName={"break-me"}
                        pageCount={paginas}
                        marginPageDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.clickPaginacion}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                    </>
                    ): (<p> Aún no iniciaste sesión para ver este contenido </p>)}
            </>

        </React.Fragment>)
    }
}

export default Galeria;