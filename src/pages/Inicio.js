import React from 'react';
//import api from '../services/api';
import './Inicio.css';


export default function Inicio(){
    return (
        <div className="inicio-container">
     <table className="table-container">       
    <thead>
      <tr>
        <th>Data</th>
        <th>Código</th>
        <th>Descrição</th>
        <th>Quantidade</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>07/10/2019</td>
        <td>789125463201</td>
        <td>Vinho camo largo 1L</td>
        <td>15</td>
      </tr>
    </tbody>
  </table>

    </div>
    )
}