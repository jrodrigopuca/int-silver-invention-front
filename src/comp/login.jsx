import React,{Component} from 'react';
import Nav from './nav.jsx';

class Login extends Component{
    constructor(){
        super();
        this.state ={
            entradas: {user:false, pass:false},
            valido:false,
            terminado:false,
            terminadoConErrores:false
        }
    }

    /** validar que los campos fueron cargados */
    _onChange(e,input){
        let inputs = this.state.entradas;
        inputs[input] = e.target.checkValidity();

        let arrayB = Object.values(inputs);
        let validado = arrayB.every((v) => v === true)

        if (validado === true) { this.setState({ valido: true }) } else { this.setState({ valido: false }) }
    }

    /**
     * @description enviar al back
     * - si el login es correcto guardar token
     * - lo guardo en localStorage pero también podría encriptarlo para usarlo con cookie o bien en memoria 
     * - si el login es incorrecto mostrar alerta
     * @param {*} e evento
     */
    _onSubmit(e){
        e.preventDefault();
        let form = new FormData(e.target);
        form=JSON.stringify(Object.fromEntries(form));
        let link="http://localhost:3001/login";


        let myHeaders = new Headers({
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            "Content-type": "application/json"
        });

        let options = { method: 'POST', headers: myHeaders, mode: 'cors' };
        let nRequest = new Request(link, options);

        fetch(nRequest, {
            body: form,
        }).then(function (response) {
            return response.json();
        })
        .then(function (myJSON) {
            alert(!!myJSON.res?"login correcto":myJSON.data);
            if (myJSON.res) localStorage.setItem('jwt', myJSON.data);
        })
        
        e.target.reset();
    }


    render(){
        const {valido}= this.state;

        return(
            <React.Fragment>
            <Nav/>
            <form method="POST" onSubmit={(e)=>this._onSubmit(e)}>
                <input type="text"  id="user" name="user" placeholder="Usuario" required onChange={(e)=>this._onChange(e,"user")} />
                <input type="password" id="pass" name="pass" placeholder="Contraseña" required onChange={(e)=>this._onChange(e,"pass")} />
                {!!valido && <input type="submit" value="Enviar" />}
            </form>
            </React.Fragment>
        )
    }
}

export default Login;
