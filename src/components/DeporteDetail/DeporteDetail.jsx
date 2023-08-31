/* 8️⃣ ***COMPONENTE DeporteDetail*** 8️⃣

Implementar el componente DeporteDetail. En este ejercicio tendrás que renderizar las diferentes propiedades del deporte.
📢¡Sigue las instrucciones de los tests!📢

REQUISITOS
🟢 Tendrás que despachar una action con el "id" del deporte cuando se monta el componente. Luego, traer esa 
información de tu estado global.
🟢 Tendrás que renderizar algunos datos del deporte correspondiente.

IMPORTANTE
❗Importar las actions como Object Modules, ¡sino los test no funcionarán!
❗Este componente debe ser FUNCIONAL.
❗Para obtener el "id" puedes utilizar useParams.
❗NO hacer un destructuring de los hooks de React, debes utilizarlos con la siguiente forma:
      - 'React.useState' 
      - 'React.useEffect'
*/

import './deporteDetail.css';
import React from 'react';
import * as actions from "../../redux/actions"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DeporteCard from '../DeporteCard/DeporteCard';



const DeporteDetail = (props) => {

      const deporteDetail = useSelector(state => state.deporteDetail)

      const dispatch = useDispatch();
      const {id} = useParams();
      React.useEffect(()=>{
            dispatch(actions.getDeporteDetail(id), []);
      })
      
   return <div className='detail' >

            {
            deporteDetail?.nombre && (
            <div> 
                  <h1>{deporteDetail.nombre}</h1>
                  <img src={deporteDetail.imagen} alt={deporteDetail.nombre} />
                  <h3>Descripcion: {deporteDetail.descripcion}</h3>
                  <h5>Reglas: {deporteDetail.reglas}</h5>
                  <h5>Equipamiento: {deporteDetail.equipamiento}</h5>
                  <h5>Origen: {deporteDetail.lugar_de_origen}</h5>
                  <h5>Ligas destacadas: {deporteDetail.ligas_destacadas}</h5>

            </div>
            
            ) 
       }
             
   </div>
   
};

export default DeporteDetail;
