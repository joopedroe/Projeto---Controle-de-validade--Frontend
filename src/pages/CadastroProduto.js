import React, {useState} from 'react';
import axios from 'axios';
//import './CadastroProduto.css';
import api from '../services/api';
var moment = require('moment');
//import { isContainer } from 'postcss-selector-parser';
const secoes = ['1','2','3','4','5','6','7','8','9','10']

export default function CadastroProduto({match,history}) {
    const [codigo, setCodigo] = useState('');
    const [data, setData] = useState('');
    const [quantidade, setQuantidade] = useState(undefined);
    const [descricao, setDescricao] = useState('');
    const [secao,setSecao]=useState('');
    const [status,setStatus]=useState('');

    async function handleSubmit(e){
        e.preventDefault();
        var hora=" 08:00:00"
        const dados={
          "codigoEntrada": codigo,
          "name":descricao,
          "data_validadeEntrada":moment(data).format('YYYY-MM-DD')+hora,
          "quantidade":quantidade,
          "valor":secao,
          "status":true
    }
        const token= localStorage.getItem('token')
        await api.post('/produto',dados,{
          headers:{
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
          },
        }
        )
        history.push(`/inicio/`);
    }

    async function handleSubmitCOd(e){
      e.preventDefault();
      var config = {
        headers: {'X-Cosmos-Token': '8C4kNbESYhlxbs4J61L53w'}
      };
      const response =  await axios.get(`https://api.cosmos.bluesoft.com.br/gtins/${codigo}`,config).catch(error =>{
        // "Produto não encontrado, digite a descrição!"
         setStatus('');
        } );
        function verifica(dados){
          const {description:name}= dados.data;
          setDescricao(name);
        }
        if(response !== undefined){
          verifica(response);
        }else{
          setStatus('Produto não encontrado, acrecente descrição!');
          setDescricao('')
        }
      }

  return (
      <div className="login-container">
          <form onSubmit={handleSubmit}>
          <h1>Cadastrar Produto</h1>
          <br></br>
          <label >Código:
          <form onSubmit={handleSubmitCOd}>
          <input 
            type="Number"
            placeholder="Digite o código"
            value={codigo}
            onChange={e=> setCodigo(e.target.value) }
          />
            <button type="submit" className="btn btn-info">Pesquisar</button>
          </form>
          </label>
          <label >Descrição do Produto:
            <input 
            type="text"
            id="des"
            placeholder={status}
            value={descricao}
            required name="des"
            onChange={e=> setDescricao(e.target.value) }
          />
          </label>
        <label >Data de validade:
          <input 
          type="date"
            value={data}
            onChange={e=> setData(e.target.value) }
          />
          </label>
          <label> Seção:
            <select id='cbPais' 
              value={secao}
              onChange={e=> setSecao(e.target.value) }>
              {secoes.map(secaoI=>(
                <option >{secaoI}</option>
              ))}
              </select>
          </label>
          <label >Quantidade:
          <input 
            type="Number"
            placeholder="0"
            value={quantidade}
            onChange={e=> setQuantidade(e.target.value) }
          />
          </label>
          <button type="submit">Cadastrar</button>
          <a href="https://controle-validade-test.herokuapp.com/inicio" className="btn btn-danger" role="button">Voltar</a> 
          </form>
      </div>
  );
}