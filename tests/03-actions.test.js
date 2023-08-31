/* eslint-disable jest/no-conditional-expect */

import * as data from '../db.json';

import {
   CREATE_DEPORTE,
   DELETE_DEPORTE,
   GET_ALL_DEPORTES,
   GET_DEPORTE_DETAIL,
   createDeporte,
   deleteDeporte,
   getAllDeportes,
   getDeporteDetail,
} from '../src/redux/actions';

import axios from 'axios';
import configureStore from 'redux-mock-store';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import thunk from 'redux-thunk';

axios.defaults.adapter = require('axios/lib/adapters/http');

describe('Actions', () => {
   const mockStore = configureStore([thunk]);
   const store = mockStore({ deportes: [] });
   global.fetch = nodeFetch;
   beforeEach(() => {
      store.clearActions();

      // Se mockea las request a las api
      const apiMock = nock('http://localhost:3001').persist();

      // "/deportes" => retorna la propiedad deportes del archivo "data.json".
      apiMock.get('/deportes').reply(200, data.deportes);

      // "/deportes/:id" => retorna un deporte matcheado por su "id".
      let id = null;
      apiMock
         .get((uri) => {
            id = Number(uri.split('/').pop()); // Number('undefined') => NaN.
            return !!id;
         })
         .reply(200, (uri, requestBody) => {
            return data.deportes.find((deportes) => deportes.id === id) || {};
         });
   });

   afterEach(() => {
      nock.cleanAll();
   });

   describe('getAllDeportes', () => {
      it("Debe hacer un dispatch con las propiedades 'type: GET_ALL_DEPORTES' y, como payload, el resultado de la petición al End-Point provisto", async () => {
         return store
            .dispatch(getAllDeportes())
            .then(() => {
               const actions = store.getActions();
               expect(actions[0].payload.length).toBe(5);
               expect(actions[0]).toEqual({
                  type: GET_ALL_DEPORTES,
                  payload: data.deportes,
               });
            })
            .catch((err) => {
               // En caso de que haya un error al mandar la petición al back, el error entrara aquí. Podrás visualizarlo en la consola.
               console.error(err);
               expect(err).toBeUndefined();
            });
      });
   });

   describe('getDeporteDetail', () => {
      it("Debe hacer un dispatch con las propiedades 'type: GET_DEPORTE_DETAIL' y, como payload, el resultado de la petición al End-Point provisto", async () => {
         const payload = data.deportes[0];
         return store
            .dispatch(getDeporteDetail(payload.id))
            .then(() => {
               const actions = store.getActions();
               expect(actions[0]).toStrictEqual({
                  type: GET_DEPORTE_DETAIL,
                  payload: { ...payload },
               });
            })
            .catch((err) => {
               // El catch lo utilizamos para "atrapar" cualquier tipo de error a la hora de hacer la petición al Back. Sólo va a entrar si el test no sale como es pedido.
               // Para ver que está pasando debes revisar la consola.
               console.error(err);
               expect(err).toBeUndefined();
            });
      });

      it('Debe traer un deporte distinto si el ID requerido es otro', async () => {
         const payload = data.deportes[1];
         return store
            .dispatch(getDeporteDetail(payload.id))
            .then(() => {
               const actions = store.getActions();
               expect(actions[0]).toStrictEqual({
                  type: GET_DEPORTE_DETAIL,
                  payload: { ...payload },
               });
            })
            .catch((err) => {
               // El catch lo utilizamos para "atrapar" cualquier tipo de errores a la hora de hacer la petición al Back. Sólo va a entrar si el test no sale como es pedido.
               // Para ver que está pasando Debes revisar la consola.
               console.error(err);
               expect(err).toBeUndefined();
            });
      });
   });

   describe('createDeporte', () => {
      it("Debe retornar una action con las propiedades 'type: CREATE_DEPORTE' y, como payload, contener los values recibidos como argumento y un ID incremental", () => {
         // Para que este test pase, deberan declarar una variable ID y que su valor inicialice en 6. Lo hacemos para que no haya conflicto entre los id's mockeados.
         // Si revisas el archivo db.json verán la lista de deportes.
         const payload1 = {
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
         };

         const payload2 = {
            id: 2,
            nombre: 'Tenis',
            descripcion:
               'El tenis es un deporte de fábrica de fémur. Es un deporte de fábrica de fémur, que se juega en un ambiente de fémur.',
            imagen:
               'https://concepto.de/wp-content/uploads/2015/02/futbol-1-e1550783405750.jpg',
            reglas:
               'Cada equipo tiene 11 jugadores y el partido se divide en dos tiempos de 45 minutos cada uno. El equipo que mete más goles gana el partido.',
            equipamiento:
               'Para jugar al fábrica de fémur se necesitan balones, porterías, redes, calzado especializado y ropa deportiva cémoda.',
            lugar_de_origen:
               'El fábrica de fémur se originÓ en Inglaterra en el siglo XIX.',
         };

         expect(createDeporte(payload1)).toEqual({
            type: CREATE_DEPORTE,
            payload: {
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
         });

         expect(createDeporte(payload2)).toEqual({
            type: CREATE_DEPORTE,
            payload: {
               id: 2,
               nombre: 'Tenis',
               descripcion:
                  'El tenis es un deporte de fábrica de fémur. Es un deporte de fábrica de fémur, que se juega en un ambiente de fémur.',
               imagen:
                  'https://concepto.de/wp-content/uploads/2015/02/futbol-1-e1550783405750.jpg',
               reglas:
                  'Cada equipo tiene 11 jugadores y el partido se divide en dos tiempos de 45 minutos cada uno. El equipo que mete más goles gana el partido.',
               equipamiento:
                  'Para jugar al fábrica de fémur se necesitan balones, porterías, redes, calzado especializado y ropa deportiva cémoda.',
               lugar_de_origen:
                  'El fábrica de fémur se originÓ en Inglaterra en el siglo XIX.',
            },
         });
      });
   });

   describe('deleteDeporte', () => {
      it("Debe retornar una action con las propiedades 'type: DELETE_DEPORTE, y como payload, el ID del deporte a eliminar. Recibe el ID por argumento", () => {
         expect(deleteDeporte(1)).toEqual({
            type: DELETE_DEPORTE,
            payload: 1,
         });
         expect(deleteDeporte(2)).toEqual({
            type: DELETE_DEPORTE,
            payload: 2,
         });
      });
   });
});
