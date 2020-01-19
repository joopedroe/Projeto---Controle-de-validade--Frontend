import React,{useEffect,useState} from 'react';
import api from '../services/api';
var moment = require('moment');
const secoes = ['1','2','3','4','5','6','7','8','9','10']
//import api from '../services/api';
//import './Inicio.css';


export default function Inicio({history}){
 
  const [produtos,setProduto]=useState([]);
  const [dataFilter,setDataFilter]= useState(null);
  const [secaoFilter,setSecaoFilter]=useState("Todos");
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
    }
    carregarProdutos();
  },[]);

  async function handleRetirar(e,id){
   
    const token= localStorage.getItem('token')
    await api.post(`/retirar/produto/${id}`,{},{
      headers:{
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
      },
}
)
    history.go(`/inicio/`);
}
async function handleFilter(e,data,secao){
    
    const token= localStorage.getItem('token')
    const responseFilter = await api.get('/filter',{
      headers:{
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
      "data_validadeEntrada": data,
      "secao":secao
        },
      
      }
    )
    setProduto(responseFilter.data);
}
    return (
  <div className="container">
  <h2>Produtos próximos ao vencimento</h2>
  <a href="https://controle-validade-test.herokuapp.com/cadastro/produto" className="btn btn-info" role="button">Cadastrar</a> 
  <br></br>          
  <div className="login-container-filter">
      <form >
        <label >Listar até:
          <input 
          id="data"
          type="date"
          value={dataFilter}
          required name="data"
          onChange={e=> setDataFilter(e.target.value) }
        />
         Seção :   
        <select id='cbPais' 
        value={secaoFilter}
        onChange={e=> setSecaoFilter(e.target.value) }>
        {secoes.map(secaoI=>(
        <option >{secaoI}</option>
          ))}
</select>

        <button type="button" className="btn btn-secondary" onClick={e=>handleFilter(e,dataFilter,secaoFilter)}>Filtar</button>
        </label>
          
         
          </form>
      </div>
 
  <table className="table">
    <thead>
      <tr>
        <th>Data</th>
        <th>Código</th>
        <th>Descrição</th>
        <th>Seção</th>
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
       <td>{produto.valor}</td>
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