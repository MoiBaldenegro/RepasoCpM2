/* 6️⃣ *** COMPONENTE CreateDeporte *** 6️⃣

Implementar el componente CreateDeporte. Este consistirá en un formulario controlado con estados de React.
📢¡Sigue las instrucciones de los TEST!📢

REQUISITOS
🟢 Aquí tendrás que renderizar una serie de elementos HTML con distintos atibutos e información dentro.
🟢 Debes manejar cada uno de los inputs de tu formulario mediante un estado local llamado "input".
🟢 La información del formulario se debe despachar al estado global cuando se hace un submit.
🟢 Debes manejar los errores que pueden tener los inputs del formulario.

IMPORTANTE
❗Importar las actions como Object Modules, ¡sino los test no funcionarán!
❗Este componente debe ser FUNCIONAL.
❗A fines practicos el input de ligas destacadas será solo un string y será nombra liga destacada.
❗¡Puedes implementar el manejo de errores como mejor prefieras! Sólo recuerda renderizar el error apropiado en cada caso.
❗NO hacer un destructuring de los hooks de React, debes utilizarlos con la siguiente forma:
      - 'React.useState'
      - 'React.useEffect'
*/

import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

const validation = (input) => {
  const error = {};
  if(input.nombre.length > 30 ){
    error.nombre="Nombre demasiado largo" 
  }else{
    error.nombre="";
  }
  if(input.descripcion.length < 100 ){
    error.descripcion ="Descripción demasiada corta"
  }else{
    error.descripcion = "";
  }
  if(input.reglas.length < 50){
    error.reglas ="El texto de las reglas deben ser más largas"
  }else{
    error.reglas = "";
  }


  return error;

 
};

const CreateDeporte = () => {

 

  const dispatch = useDispatch();

  function handleChange(event){
    setInput({
      ...input,
        [event.target.name] : event.target.value
    });

    setError(validation({
      ...input,
      [event.target.name] : event.target.value

    }))

  }


  function handleSubmit(event){
    event.preventDefault();
    if(Object.keys(error).length === 0){
      dispatch(actions.createDeporte(input))

    }
    
  }

  const [ input, setInput ] = React.useState(
    {
      nombre: '',
      descripcion: '',
      imagen: '',
      reglas: '',
      equipamiento: '',
      lugar_de_origen: '',
      liga_destacada: '',
   });

   const [ error, setError] = React.useState({ 
  
 });

    
 
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre: </label>
      <input type="text"
          value={input.nombre}
          name="nombre"
          onChange={handleChange}/>
          { error.nombre ? <p>{error.nombre}</p> : null}  
      <label htmlFor="descripcion">Descripción: </label>
      <textarea
          value={input.descripcion}
           name="descripcion"
           onChange={handleChange}/>
           { error.descripcion ? <p>{error.descripcion}</p> : null} 
      <label htmlFor="reglas">Reglas: </label>
      <input type="text"
      value={input.reglas}
           name="reglas"
           onChange={handleChange}/>
           { error.reglas ? <p>{error.reglas}</p> : null} 
       <label htmlFor="imagen">Imagen: </label>
      <input type="text"
          name="imagen"
          value={input.imagen}
          onChange={handleChange}/>
       
       <label htmlFor="equipamiento">Equipamiento: </label>
      <input type="text"
      value={input.equipamiento}
           name="equipamiento"
           onChange={handleChange}/>
       <label htmlFor="lugar_de_origen">Lugar de origen: </label>
      <input type="text"
      onChange={handleChange}
      value={input.lugar_de_origen}
          name="lugar_de_origen"/>
       <label htmlFor="liga_destacada">Liga destacada: </label>
      <input type="text"
      onChange={handleChange}
      value={input.liga_destacada}
          name="liga_destacada"/>
        <button type="submit">Crear deporte</button>

    </form>
  );
};

export default CreateDeporte;
