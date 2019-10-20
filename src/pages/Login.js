import React, {useState} from 'react';
import './Login.css';
import api from '../services/api';
//import { isContainer } from 'postcss-selector-parser';

export default function Login({history}) {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/login',{
                "username": usuario,
                "password":senha,
          },
        )
        console.log(response.data);
        const { _id }=response.data.user
        console.log(_id);
        history.push(`/inicio/${_id}`);
    }

  return (
      <div className="login-container">
          <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input 
            placeholder="Digite seu usuário"
            value={usuario}
            onChange={e=> setUsuario(e.target.value) }
            />
          <input 
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={e=> setSenha(e.target.value) }
          />
          <button type="submit">Entrar</button>
          

          </form>
          
      </div>

    
  );
}

//export default App;