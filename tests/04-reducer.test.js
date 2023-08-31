import * as data from '../db.json';

import {
   GET_ALL_DEPORTES,
   GET_DEPORTE_DETAIL,
   createDeporte,
   deleteDeporte,
} from '../src/redux/actions';

import rootReducer from '../src/redux/reducer';

// Acá se mockean las actions para que el test pueda funcionar correctamente, sin importar si hay un bug en ese archivo.
jest.mock('../src/redux/actions', () => ({
   __esmodules: true,
   GET_ALL_DEPORTES: 'GET_ALL_DEPORTES',
   DELETE_DEPORTE: 'DELETE_DEPORTE',
   GET_DEPORTE_DETAIL: 'GET_DEPORTE_DETAIL',
   CREATE_DEPORTE: 'CREATE_DEPORTE',
   createDeporte: (payload) => ({
      type: 'CREATE_DEPORTE',
      payload,
   }),
   deleteDeporte: (payload) => ({
      type: 'DELETE_DEPORTE',
      payload,
   }),
   getDeporteDetail: (payload) => ({
      type: 'GET_DEPORTE_DETAIL',
      payload,
   }),
}));

describe('Reducer', () => {
   const state = {
      deportes: [],
      deporteDetail: {},
   };

   it('Si no hay un action-type válido, debe retornar el estado inicial', () => {
      expect(rootReducer(undefined, [])).toEqual({
         deportes: [],
         deporteDetail: {},
      });
   });

   it('Cuando la action-type es "GET_ALL_DEPORTES", debe guardar en el estado "deportes" aquellos deportes obtenidos en el llamado al Back-End', () => {
      const result = rootReducer(state, {
         type: GET_ALL_DEPORTES,
         payload: data.deportes,
      });
      // Acuerdense que el state inicial no tiene que mutar!
      expect(result).not.toEqual(state);
      expect(result).toEqual({
         deportes: data.deportes, // Cuando ejecutes los tests, vas a ver bien lo que espera que le llegue a nuestro estado!
         deporteDetail: {},
      });
   });

   it('Cuando la action-type es "GET_DEPORTE_DETAIL", debe guardar en el estado "deporteDetail" aquel deporte obtenido en el llamado al Back-End', () => {
      const result = rootReducer(state, {
         type: GET_DEPORTE_DETAIL,
         payload: data.deportes,
      });
      // Acuerdense que el state inicial no tiene que mutar!
      expect(result).not.toEqual(state);
      expect(result).toEqual({
         deportes: [],
         deporteDetail: data.deportes,
      });
   });

   it('Cuando la action-type es "CREATE_DEPORTE", debe agregar un nuevo deporte al estado "deportes"', () => {
      const state = {
         deportes: data.deportes,
         deporteDetail: {},
      };

      const payload1 = {
         id: 6,
         nombre: 'Beisbol',
         descripcion:
            'El béisbol es un deporte en el que dos equipos compiten para marcar más carreras que el otro.',
         imagen:
            'https://concepto.de/wp-content/uploads/2019/06/beisbol-e1562943520104.jpg',
         reglas:
            'El objetivo es marcar carreras al recorrer las bases en el campo de juego y evitar que el equipo contrario haga lo mismo. El equipo defensivo intenta sacar a los bateadores del equipo contrario antes de que lleguen a la base.',
         equipamiento:
            'Los jugadores necesitan guantes, cascos, bates y pelotas para jugar al béisbol.',
         lugar_de_origen:
            'El béisbol se originó en Estados Unidos a mediados del siglo XIX.',
         ligas_destacadas: [
            'La Liga Mayor de Béisbol de Estados Unidos',
            'La Liga de Béisbol Profesional de Japón',
            'La Liga de Béisbol Profesional de Corea',
            'La Liga de Béisbol Profesional de Colombia',
            'La Serie del Caribe',
         ],
      };

      const payload2 = {
         id: 7,
         nombre: 'Fórmula 1',
         descripcion:
            'La Fórmula 1 es un deporte automovilístico en el que varios pilotos compiten en un circuito cerrado en carreras de alta velocidad.',
         imagen:
            'https://www.formula1.com/content/dam/fom-website/manual/Misc/Formula%201%20logo.png.transform/2col/image.png',
         reglas:
            'Los pilotos compiten para completar el mayor número de vueltas en el menor tiempo posible. Los equipos deben seguir las reglas de la Federación Internacional de Automovilismo (FIA) en cuanto a diseño y especificaciones del vehículo, límites de velocidad y seguridad.',
         equipamiento:
            'Los pilotos necesitan cascos, trajes ignífugos y otros equipos de seguridad para protegerse en caso de accidentes. Los equipos necesitan vehículos especialmente diseñados para las carreras de la Fórmula 1.',
         lugar_de_origen:
            'La Fórmula 1 se originó en Europa en la década de 1950 y se ha convertido en un deporte popular en todo el mundo.',
         ligas_destacadas: [
            'El Campeonato Mundial de Fórmula 1 de la FIA',
            'El Gran Premio de Mónaco',
            'El Gran Premio de Italia',
            'El Gran Premio de Gran Bretaña',
            'El Gran Premio de Australia',
         ],
      };

      const alldeportesType1 = [
         ...data.deportes,
         {
            id: 6,
            nombre: 'Beisbol',
            descripcion:
               'El béisbol es un deporte en el que dos equipos compiten para marcar más carreras que el otro.',
            imagen:
               'https://concepto.de/wp-content/uploads/2019/06/beisbol-e1562943520104.jpg',
            reglas:
               'El objetivo es marcar carreras al recorrer las bases en el campo de juego y evitar que el equipo contrario haga lo mismo. El equipo defensivo intenta sacar a los bateadores del equipo contrario antes de que lleguen a la base.',
            equipamiento:
               'Los jugadores necesitan guantes, cascos, bates y pelotas para jugar al béisbol.',
            lugar_de_origen:
               'El béisbol se originó en Estados Unidos a mediados del siglo XIX.',
            ligas_destacadas: [
               'La Liga Mayor de Béisbol de Estados Unidos',
               'La Liga de Béisbol Profesional de Japón',
               'La Liga de Béisbol Profesional de Corea',
               'La Liga de Béisbol Profesional de Colombia',
               'La Serie del Caribe',
            ],
         },
      ];
      const alldeportesType2 = [
         ...alldeportesType1,
         {
            id: 7,
            nombre: 'Fórmula 1',
            descripcion:
               'La Fórmula 1 es un deporte automovilístico en el que varios pilotos compiten en un circuito cerrado en carreras de alta velocidad.',
            imagen:
               'https://www.formula1.com/content/dam/fom-website/manual/Misc/Formula%201%20logo.png.transform/2col/image.png',
            reglas:
               'Los pilotos compiten para completar el mayor número de vueltas en el menor tiempo posible. Los equipos deben seguir las reglas de la Federación Internacional de Automovilismo (FIA) en cuanto a diseño y especificaciones del vehículo, límites de velocidad y seguridad.',
            equipamiento:
               'Los pilotos necesitan cascos, trajes ignífugos y otros equipos de seguridad para protegerse en caso de accidentes. Los equipos necesitan vehículos especialmente diseñados para las carreras de la Fórmula 1.',
            lugar_de_origen:
               'La Fórmula 1 se originó en Europa en la década de 1950 y se ha convertido en un deporte popular en todo el mundo.',
            ligas_destacadas: [
               'El Campeonato Mundial de Fórmula 1 de la FIA',
               'El Gran Premio de Mónaco',
               'El Gran Premio de Italia',
               'El Gran Premio de Gran Bretaña',
               'El Gran Premio de Australia',
            ],
         },
      ];
      const primerDeporte = rootReducer(state, createDeporte(payload1));
      const segundoDeporte = rootReducer(
         { ...state, deportes: alldeportesType1 },
         createDeporte(payload2)
      );

      // Acuerdense que el state inicial no tiene que mutar!
      expect(primerDeporte).not.toEqual(state);
      expect(segundoDeporte).not.toEqual(state);

      expect(primerDeporte).toEqual({
         deporteDetail: {},
         deportes: alldeportesType1,
      });
      expect(segundoDeporte).toEqual({
         deporteDetail: {},
         deportes: alldeportesType2,
      });
   });

   it('Cuando la action-type es "DELETE_DEPORTE", debe eliminar el deporte que posee el ID recibido del estado "deportes"', () => {
      // Caso 1
      const payload = 1;
      const state = {
         deportes: [
            {
               id: 1,
               nombre: 'Fútbol',
               descripcion:
                  'El fútbol es un deporte en el que dos equipos compiten por meter un balón en la portería contraria. Es uno de los deportes más populares en todo el mundo.',
               imagen:
                  'https://concepto.de/wp-content/uploads/2015/02/futbol-1-e1550783405750.jpg',
               reglas:
                  'Cada equipo tiene 11 jugadores y el partido se divide en dos tiempos de 45 minutos cada uno. El equipo que mete más goles gana el partido.',
               equipamiento:
                  'Para jugar al fútbol se necesitan balones, porterías, redes, calzado especializado y ropa deportiva cómoda.',
               lugar_de_origen:
                  'El fútbol se originó en Inglaterra en el siglo XIX.',
               ligas_destacadas: [
                  'La Liga española',
                  'La Premier League inglesa',
                  'La Serie A italiana',
                  'La Bundesliga alemana',
                  'La Liga MX mexicana',
               ],
            },
         ],
         deporteDetail: {},
      };

      expect(rootReducer(state, deleteDeporte(payload))).toEqual({
         deportes: [],
         deporteDetail: {},
      });

      //Caso 2
      const payload2 = 6;
      const state2 = {
         deportes: [
            {
               id: 6,
               nombre: 'Beisbol',
               descripcion:
                  'El béisbol es un deporte en el que dos equipos compiten para marcar más carreras que el otro.',
               imagen:
                  'https://concepto.de/wp-content/uploads/2019/06/beisbol-e1562943520104.jpg',
               reglas:
                  'El objetivo es marcar carreras al recorrer las bases en el campo de juego y evitar que el equipo contrario haga lo mismo. El equipo defensivo intenta sacar a los bateadores del equipo contrario antes de que lleguen a la base.',
               equipamiento:
                  'Los jugadores necesitan guantes, cascos, bates y pelotas para jugar al béisbol.',
               lugar_de_origen:
                  'El béisbol se originó en Estados Unidos a mediados del siglo XIX.',
               ligas_destacadas: [
                  'La Liga Mayor de Béisbol de Estados Unidos',
                  'La Liga de Béisbol Profesional de Japón',
                  'La Liga de Béisbol Profesional de Corea',
                  'La Liga de Béisbol Profesional de Colombia',
                  'La Serie del Caribe',
               ],
            },
            {
               id: 7,
               nombre: 'Fórmula 1',
               descripcion:
                  'La Fórmula 1 es un deporte automovilístico en el que varios pilotos compiten en un circuito cerrado en carreras de alta velocidad.',
               imagen:
                  'https://www.formula1.com/content/dam/fom-website/manual/Misc/Formula%201%20logo.png.transform/2col/image.png',
               reglas:
                  'Los pilotos compiten para completar el mayor número de vueltas en el menor tiempo posible. Los equipos deben seguir las reglas de la Federación Internacional de Automovilismo (FIA) en cuanto a diseño y especificaciones del vehículo, límites de velocidad y seguridad.',
               equipamiento:
                  'Los pilotos necesitan cascos, trajes ignífugos y otros equipos de seguridad para protegerse en caso de accidentes. Los equipos necesitan vehículos especialmente diseñados para las carreras de la Fórmula 1.',
               lugar_de_origen:
                  'La Fórmula 1 se originó en Europa en la década de 1950 y se ha convertido en un deporte popular en todo el mundo.',
               ligas_destacadas: [
                  'El Campeonato Mundial de Fórmula 1 de la FIA',
                  'El Gran Premio de Mónaco',
                  'El Gran Premio de Italia',
                  'El Gran Premio de Gran Bretaña',
                  'El Gran Premio de Australia',
               ],
            },
         ],
         deporteDetail: {},
      };

      expect(rootReducer(state2, deleteDeporte(payload2))).toEqual({
         deportes: [
            {
               id: 7,
               nombre: 'Fórmula 1',
               descripcion:
                  'La Fórmula 1 es un deporte automovilístico en el que varios pilotos compiten en un circuito cerrado en carreras de alta velocidad.',
               imagen:
                  'https://www.formula1.com/content/dam/fom-website/manual/Misc/Formula%201%20logo.png.transform/2col/image.png',
               reglas:
                  'Los pilotos compiten para completar el mayor número de vueltas en el menor tiempo posible. Los equipos deben seguir las reglas de la Federación Internacional de Automovilismo (FIA) en cuanto a diseño y especificaciones del vehículo, límites de velocidad y seguridad.',
               equipamiento:
                  'Los pilotos necesitan cascos, trajes ignífugos y otros equipos de seguridad para protegerse en caso de accidentes. Los equipos necesitan vehículos especialmente diseñados para las carreras de la Fórmula 1.',
               lugar_de_origen:
                  'La Fórmula 1 se originó en Europa en la década de 1950 y se ha convertido en un deporte popular en todo el mundo.',
               ligas_destacadas: [
                  'El Campeonato Mundial de Fórmula 1 de la FIA',
                  'El Gran Premio de Mónaco',
                  'El Gran Premio de Italia',
                  'El Gran Premio de Gran Bretaña',
                  'El Gran Premio de Australia',
               ],
            },
         ],
         deporteDetail: {},
      });
   });
});
