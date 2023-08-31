/* 7️⃣ *** COMPONENTE DeporteCard *** 7️⃣

Implementar el componente DeporteCard.
📢¡Sigue las instrucciones de los tests!📢

REQUISITOS
🟢 Tendrás que renderizar una serie de etiquetas HTML que incluyan texto y propiedades.
🟢 Tendrás que despachar una action para eliminar un deporte específico.

IMPORTANTE
❗Este componente debe ser FUNCIONAL.
❗Importar las actions como Object Modules, ¡sino los test no funcionarán!
*/

import './deporteCard.css';
import React from 'react';
import * as actions from "../../redux/actions"
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const DeporteCard = (props) => {

   const dispatch = useDispatch();
   const { id, nombre, imagen, lugar_de_origen} = props;
   
   function handleSubmit(){
      dispatch(actions.deleteDeporte(id))
   }
  
   return <div className='card'>

      <button onClick={handleSubmit}>x</button>
      <h3>{nombre}</h3>
      <img src={imagen} alt={nombre} />
      <p>Origen: {lugar_de_origen}</p>
      <Link to={`/deportes/${id}`}>{nombre}</Link>







     
   </div>;
};

export default DeporteCard;
