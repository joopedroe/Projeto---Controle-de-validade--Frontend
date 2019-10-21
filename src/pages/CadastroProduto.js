import React, {useState} from 'react';
//import './CadastroProduto.css';
import api from '../services/api';
var moment = require('moment');
//import { isContainer } from 'postcss-selector-parser';

export default function CadastroProduto({history}) {
    const [codigo, setCodigo] = useState('');
    const [data, setData] = useState('');
    const [quantidade, setQuantidade] = useState(0);

    async function handleSubmit(e){
        e.preventDefault();
        var hora=" 08:00:00"

        const response = await api.post('/produto',{
                "codigoEntrada": codigo,
                "data_validadeEntrada":moment(data).format('YYYY-MM-DD')+hora,
                "quantidade":quantidade,
                "valor":10,
                "status":true
                
          },
        )
        console.log(moment(data).format('YYYY-MM-DD'));
        console.log(response.data)

        history.push(`/inicio/`);
    }

  return (
      <div className="login-container">
          
          <form onSubmit={handleSubmit}>
          <h1>Cadastra Produto</h1>
          <br></br>
        
         
          <label >Código:
          <input 
            placeholder="Digite o código"
            value={codigo}
            onChange={e=> setCodigo(e.target.value) }
            />
            </label>
        <label >Data de validade:
          <input 
            placeholder="dd/mm/aaaa"
            value={data}
            onChange={e=> setData(e.target.value) }
          />
          </label>
          <label >Quantidade:
          <input 
            placeholder="0"
            value={quantidade}
            onChange={e=> setQuantidade(e.target.value) }
          />
          </label>

          <button type="submit">Cadastrar</button>
          
          <a href="http://localhost:3000/inicio" className="btn btn-danger" role="button">Voltar</a> 
          </form>
          
      </div>

    
  );
}