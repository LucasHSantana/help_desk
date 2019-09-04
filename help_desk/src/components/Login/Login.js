import React from 'react';
import { login } from '../../services/Auth';

import './Login.css';
import confirmation_svg from '../../assets/confirmation.svg';

class Login extends React.Component{
    constructor(props){
        super(props);
       
        if (localStorage.getItem('loginData')) {
            this.state = JSON.parse(localStorage.getItem('loginData'));
        } else {
            this.state = {                
                username: '',
                password: '',
                email: '',
                error: '',
            };            
        };                
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;        

        this.setState({[name]: value}, () => console.log(this.state));
    }

    handleSubmit = (event) => {      
        event.preventDefault();          

        const { username, password } = this.state;

        if (!username || !password){
            this.setState({error: 'Preencha o usuário e a senha para continuar!'});
            return;
        } else {
            this.setState({error: ''});
        }

        try{
            // Função para verificiar se o login é valido

            // Se o login for válido, salva o token no local storage
            const token = 'teste'; // Trocar pelo response do server
            login(token);        
            this.props.history.push('/teste/'); 
        } catch (err) {
            this.setState({error: "Houve um problema com o login, verifique suas credenciais."});
        }
    }

    handleRecoverPassword = (event) => {
        // Enviar requisição para recuperação de senha
        //this.state.email

        event.preventDefault();          

        const { email } = this.state;

        if (!email){
            this.setState({error: 'Preencha o e-mail para continuar!'});
            return;
        } else {
            this.setState({error: ''});
        }

        try{
                    
            const confirmation = document.getElementById('confirmation-recover');
            const form_recover = document.getElementById('form-recover');

            confirmation.style.opacity = '1';
            confirmation.style.zIndex = '2';
            form_recover.style.zIndex = '1';
            form_recover.style.opacity = '0';            
        } catch (err) {
            this.setState({error: "Houve um problema com o login, verifique suas credenciais."});
        }
    }

    showRecover = async () => {        
        await this.setState({error: ''}); // Limpa o status de erro para não aparecer no outro container        

        const login_box = document.getElementById('login-box');
        const recover_box = document.getElementById('recover-box');
        const confirmation = document.getElementById('confirmation-recover');
        const form_recover = document.getElementById('form-recover');               

        confirmation.style.opacity = '0';
        form_recover.style.opacity = '1';
        confirmation.style.zIndex = '1';
        form_recover.style.zIndex = '2';                

        login_box.style.transform = 'perspective(600px) rotatey(-180deg)';
        recover_box.style.transform = 'perspective(600px) rotatey(0deg)';
    }

    hideRecover = async () => {
        await this.setState({error: ''}); // Limpa o status de erro para não aparecer no outro container

        const login_box = document.getElementById('login-box');
        const recover_box = document.getElementById('recover-box');        

        login_box.style.transform = '';
        recover_box.style.transform = '';        
    }

    render(){             
        return(
            <div className="login-container">           
                <div className="box">
                    <div id="login-box">
                        <strong>Faça o Login</strong>
                        { this.state.error && <p className="error">{this.state.error}</p> }
                        <form onSubmit={this.handleSubmit}>                          
                            <input type="text" name="username" placeholder="Nome de usuário" onChange={this.handleChange} autoFocus={true}/>                        
                            <input type="password" name="password" placeholder="Senha" onChange={this.handleChange}/>
                            <button type="submit">Login</button>                    
                        </form>
                        { !this.props.norecover &&
                            <button onClick={this.showRecover}>Esqueci minha senha > </button>
                        }
                    </div>
                    { !this.props.norecover &&
                        <div id="recover-box">
                            <div id="form-recover">
                                <strong>Recuperar senha</strong>
                                { this.state.error && <p className="error">{this.state.error}</p> }
                                <form onSubmit={this.handleRecoverPassword}>                          
                                    <input type="text" name="email" placeholder="Email registrado" onChange={this.handleChange} autoFocus={true}/>                                                    
                                    <button type="submit" id="recoverEnviar">Enviar</button>                    
                                </form>                        
                                <button onClick={this.hideRecover}>Voltar</button>
                            </div>
                            <div id="confirmation-recover">                                
                            <img src={confirmation_svg} alt="Confirmação de recuperação do email"/>
                                <strong>Enviamos um link para seu email.</strong>                                
                                <button onClick={this.hideRecover}>Voltar</button>
                            </div>
                        </div>
                    }
                </div>     
            </div>            
        );
    }
}

export default Login;