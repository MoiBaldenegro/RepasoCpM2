/* 4️⃣ ***REDUCER*** 4️⃣ */
/* Importa las action-types aquí. */
import { DELETE_DEPORTE,
       CREATE_DEPORTE,
      GET_DEPORTE_DETAIL,
         GET_ALL_DEPORTES} from "../actions";

const initialState = {
   deportes: [],
   deporteDetail: {},
};

/*
En este ejercicio tendrás que crear los casos de un reducer para gestionar la información de tu estado global.

📢¡Sigue las instrucciones de los TEST!📢

REQUISITOS
🟢 Crea un caso default, que devuelva el estado global sin cambios.
🟢 Crea un caso en el que, dentro del estado "deportes", se guarden todos los deportes.
🟢 Crea un caso en el que, dentro del estado "deporteDetail", se guarde el detalle de un deporte.
🟢 Crea un caso en el que, dentro del estado "deportes", se agregue un nuevo deporte.
    [PISTA]: puedes utilizar el spread operator.
🟢 Crea un caso en el que, dentro del estado "deportes", se elimine aquel deporte cuyo ID es igual al recibido.
*/

const rootReducer = (state = initialState, action) => {
   // Tu código:
   switch(action.type){

      case DELETE_DEPORTE:
         return{
            ...state,
            deportes:  state.deportes.filter((deporte) => deporte.id !== action.payload)  
         }
      case CREATE_DEPORTE:
         return{
            ...state,
            deportes: [ ...state.deportes, action.payload ] 
         }

      case GET_DEPORTE_DETAIL:
         return{
            ...state,
            deporteDetail: action.payload
         }
      case GET_ALL_DEPORTES:

         return{
            ...state,
            deportes: action.payload
         }

       

      default: 
         return {
            ...state
      }
   }
   
};

export default rootReducer;
