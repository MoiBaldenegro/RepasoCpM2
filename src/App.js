/* 1️⃣ ***COMPONENTE APP*** 1️⃣
Implementar el componente App. En este ejercicio tendrás que crear diferentes RUTAS para otros componentes. 
¡Ten en cuenta los nombres y las especificaciones de cada uno!

REQUISITOS
🟢 El componente Nav debe renderizarse en todas las rutas.
🟢 El componente Home debe renderizarse en la ruta "/".
🟢 El componente DeporteDetail debe renderizarse en la ruta "/deportes/:id".
🟢 El componente CreateDeporte debe renderizarse en la ruta "/deportes/create".
*/


import React from "react";
import Home from "./components/Home/Home"
import { Route, Router, Routes } from "react-router-dom";
import DeporteDetail from "./components/DeporteDetail/DeporteDetail";
import CreateDeporte from "./components/CreateDeporte/CreateDeporte";
import Nav from "./components/Nav/Nav"

const App = () => {
  return (
    
  <div>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/deportes/:id" element={<DeporteDetail/>}/> 
          <Route path="/deportes/create" element={<CreateDeporte/>}/> 
        </Routes>
    
   
  </div>
  )
};

export default App;
