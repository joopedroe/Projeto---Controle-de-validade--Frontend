import React,{useEffect,useState} from 'react';
import api from '../services/api';
var moment = require('moment');
//import api from '../services/api';
//import './Inicio.css';


export default function Inicio({history}){
 
  const [produtos,setProduto]=useState([]);
  useEffect(()=>{
    
    async function carregarProdutos(){
      const token= localStorage.getItem('token')
      const response = await api.get('/lista',{
        headers:{
          'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
        }
      })
      setProduto(response.data);
      console.log(response.data)
    }
    carregarProdutos();
  },[]);

  async function handleRetirar(e,id){
   
    const token= localStorage.getItem('token')
    const response = await api.post(`/retirar/produto/${id}`,{},{
      headers:{
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
      },
      
}
)
    
    console.log(response)
    

    history.go(`/inicio/`);
}

    return (
  <div className="container">
  <h2>Produtos próximos ao vencimento</h2>
  <a href="https://controle-validade-test.herokuapp.com/cadastro/produto" className="btn btn-info" role="button">Cadastrar</a>           
  <table className="table">
    <thead>
      <tr>
        <th>Data</th>
        <th>Código</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Ação</th>
        
      </tr>
    </thead>
    <tbody>
   
    {produtos.map(produto=>(
    
       <tr key={produtos._id}>
       <td>{moment(produto.data_validade).format('DD/MM/YYYY')}</td>
       <td>{produto.codigo}</td>
       <td>{produto.name}</td>
       <td>{produto.quantidade}</td>
       <td>
       <button type="button" className="btn btn-link" onClick={e=>handleRetirar(e,produto._id)}>Retirar</button> 
       </td>
     </tr>
    ))}
      
    </tbody>
  </table>
</div>

    )
}