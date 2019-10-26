import React,{useEffect,useState} from 'react';
import api from '../services/api';
var moment = require('moment');
//import api from '../services/api';
//import './Inicio.css';


export default function Inicio({match}){
 
  const [produtos,setProduto]=useState([]);
  useEffect(()=>{
    async function carregarProdutos(){
      const response = await api.get('/lista')
      setProduto(response.data);
      console.log(response.data)
    }
    carregarProdutos();
  },[]);

    return (
  <div className="container">
  <h2>Produtos próximos ao vencimento</h2>
  <a href="http://192.168.0.20:3000/cadastro/produto" className="btn btn-info" role="button">Cadastrar</a>           
  <table className="table">
    <thead>
      <tr>
        <th>Data</th>
        <th>Código</th>
        <th>Descrição</th>
        <th>Quantidade</th>
      </tr>
    </thead>
    <tbody>
   
    {produtos.map(produto=>(
    
       <tr>
       <td>{moment(produto.data_validade).format('DD/MM/YYYY')}</td>
       <td>{produto.codigo}</td>
       <td>{produto.name}</td>
       <td>{produto.quantidade}</td>
     </tr>
    ))}
      
    </tbody>
  </table>
</div>

    )
}