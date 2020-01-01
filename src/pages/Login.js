import React, {useState} from 'react';
import './Login.css';
import api from '../services/api';
//import { isContainer } from 'postcss-selector-parser';

export default function Login({history}) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [login, setLogin] = useState(null);

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/login', {
                "username": usuario,
                "password":senha,
          },
        ).catch(function (error) { setLogin(null) });
        if(response === undefined){
          setLogin("Usuário ou senha inválidos!")
        }
        else{
      
        const token =response.data.token
        localStorage.setItem('token',token);
        
    
        history.push('/inicio');
        }
    }

  return (
      <div class="login-container">
          <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input 
            id="user"
            placeholder="Digite seu usuário"
            value={usuario}
            required name="user"
            onChange={e=> setUsuario(e.target.value) }
            
            />
          <input 
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            required name="senha"
            onChange={e=> setSenha(e.target.value) }
          />
          <button type="submit">Entrar</button>
          <div>
            <div role="alert">
             <font color="red">{ login }</font>
            </div>
            </div>
          </form>
          
      </div>

    
  );
}

//export default App;