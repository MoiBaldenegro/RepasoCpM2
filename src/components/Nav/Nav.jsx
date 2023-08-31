/* 2️⃣ ***COMPONENTE NAV*** 2️⃣
Implementar el componente Nav. En este ejercicio tendrás que asociar dos etiquetas <Link to='' /> a 
distintos elementos.

REQUISITOS
🟢 El primer <Link> debe dirigir a "/" con el texto "Home".
🟢 El segundo <Link> debe dirigir a "/deportes/create" con el texto "Create Deporte".

IMPORTANTE
❗Este componente debe ser FUNCIONAL.
❗Asegurate de colocar bien la palabra 'deporte' o 'deportes' en los casos requeridos.
*/

import './nav.css';
import { Link } from 'react-router-dom';
import React from 'react';

const Nav = () => {
   return <div className='nav'>
      <Link to={"/"}>Home</Link>
      <Link to={"/deportes/create"}>Create Deporte</Link>
      
   </div>;
};

export default Nav;
