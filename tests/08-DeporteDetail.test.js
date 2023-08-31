import * as ReactRedux from 'react-redux';
import * as actions from '../src/redux/actions';
import * as data from '../db.json';

import { configure, mount } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DeporteDetail from '../src/components/DeporteDetail/DeporteDetail';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Router from 'react-router-dom';
import configureStore from 'redux-mock-store';
import isReact from 'is-react';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import thunk from 'redux-thunk';

configure({ adapter: new Adapter() });

jest.mock('../src/redux/actions/index.js', () => ({
   getDeporteDetail: () => ({
      type: 'GET_DEPORTE_DETAIL',
   }),
}));

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useParams: () => ({
      id: '12',
   }),
}));

describe('<DeporteDetail />', () => {
   global.fetch = nodeFetch;
   let deporteDetail, useSelectorStub, useSelectorFn, useEffect;
   const noProd = {
      id: 1,
      nombre: 'Natación',
      descripcion:
         'La natación es un deporte en el que los participantes se desplazan en el agua usando diversas técnicas de propulsión.',
      imagen:
         'https://concepto.de/wp-content/uploads/2019/06/natacion-e1562943144215.jpg',
      reglas:
         'Cada modalidad tiene sus propias reglas, pero en general se trata de recorrer una distancia en el menor tiempo posible. Las pruebas pueden ser en piscina o en aguas abiertas.',
      equipamiento:
         'Para la natación se necesitan trajes de baño, gorros, gafas de natación y en algunos casos aletas o tabla de flotación.',
      lugar_de_origen:
         'La natación era practicada por los antiguos griegos y romanos, aunque como deporte moderno se desarrolló en Inglaterra en el siglo XIX.',
      ligas_destacadas: [
         'Los Juegos Olímpicos',
         'El Campeonato Mundial de Natación',
         'La Liga de Natación de Estados Unidos',
         'El Gran Premio de Natación de Singapur',
         'La Copa del Mundo de Natación',
      ],
   };

   const match = (id) => ({
      params: { id },
      isExact: true,
      path: '/deportes/:id',
      url: `/deportes/${id}`,
   });
   const mockStore = configureStore([thunk]);

   const store = (id) => {
      let state = {
         deportes: data.deportes.concat(noProd),
         deporteDetail:
            id !== 10 ? data.deportes[id - 1] : data.deportes.concat(noProd),
      };
      return mockStore(state);
   };
   // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
   // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
   // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
   // cuando se hace destructuring de estos métodos === test no corren.
   beforeAll(() => expect(isReact.classComponent(DeporteDetail)).toBeFalsy());
   const mockUseEffect = () => useEffect.mockImplementation((fn) => fn());

   beforeEach(() => {
      // Se Mockea las request a las api
      const apiMock = nock('http://localhost:3001').persist();

      // "/deportes" => Retorna la propiedad deportes del archivo data.json
      apiMock.get('/deportes').reply(200, data.deportes);

      // "/deportes/:id" => Retorna un deporte matcheado por su id

      let id = null;
      apiMock
         .get((uri) => {
            id = Number(uri.split('/').pop()); // Number('undefined') => NaN
            return !!id;
         })
         .reply(200, (uri, requestBody) => {
            return data.deportes.find((deporte) => deporte.id === id) || {};
         });
      useSelectorStub = jest.spyOn(ReactRedux, 'useSelector');
      useSelectorFn = (id) =>
         useSelectorStub.mockReturnValue(store(id).getState().deporteDetail);
      useEffect = jest.spyOn(React, 'useEffect');
      deporteDetail = (id) =>
         mount(
            <ReactRedux.Provider store={store(id)}>
               <MemoryRouter initialEntries={[`/deportes/${id}`]}>
                  <DeporteDetail match={match(id)} />
               </MemoryRouter>
            </ReactRedux.Provider>
         );
      mockUseEffect();
      mockUseEffect();
   });

   afterEach(() => jest.restoreAllMocks());

   // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
   // import * as actions from "./../../redux/actions/index";

   it('Debe utilizar React.useEffect para que despache la acción "getDeporteDetail", pasándole como argumento el ID del deporte', async () => {
      // Nuevamente testeamos todo el proceso. Tenes que usar un useEffect, y despachar la acción "getDeporteDetail".
      const useDispatch = jest.spyOn(ReactRedux, 'useDispatch');
      const getDeporteDetail = jest.spyOn(actions, 'getDeporteDetail');
      deporteDetail(1);
      expect(useEffect).toHaveBeenCalled();
      expect(useDispatch).toHaveBeenCalled();
      expect(getDeporteDetail).toHaveBeenCalled();

      deporteDetail(2);
      expect(useEffect).toHaveBeenCalled();
      expect(useDispatch).toHaveBeenCalled();
      expect(getDeporteDetail).toHaveBeenCalled();
   });

   it('Debe llamar a la función useParams y obtener el id', async () => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
      deporteDetail();
      expect(Router.useParams).toHaveBeenCalled();
   });

   describe('Debe utilizar el "id" obtenido por params para despachar la action "getDeporteDetail" y renderizar los detalles del deporte', () => {
      const deportes = data.deportes[0];
      // Fijate que para traerte los datos desde Redux, vas a tener que usar el hook de Redux "useSelector"
      // para que los tests pasen!
      // Lo que se esta testeando aca, es que el componente renderice los detalles del todo correctamente,
      // no la estructura del componente asi que eres libre de diseñar la estructura, siempre y cuando se muestren los datos del todo.
      // Verificar la llegada del id proveniente de useParams, puede romper en el caso que no exista nada.
      it("Debe renderizar un tag 'h1' que muestre el nombre de cada 'deporte'", () => {
         useSelectorFn(1);
         expect(deporteDetail(1).text().includes(deportes.nombre)).toEqual(
            true
         );
         expect(deporteDetail(1).find('h1').at(0).text()).toBe(deportes.nombre);
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'img' donde su prop 'src' sea la imagen del deporte y la prop 'alt' el nombre del deporte.", () => {
         useSelectorFn(1);
         expect(deporteDetail(1).find('img').prop('src')).toBe(deportes.imagen);
         expect(deporteDetail(1).find('img').prop('alt')).toBe(deportes.nombre);
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'h3' que contenga el texto 'Descripcion: ' y la descripcion del deporte.", () => {
         useSelectorFn(1);
         expect(deporteDetail(1).text().includes(deportes.descripcion)).toEqual(
            true
         );
         expect(deporteDetail(1).find('h3').at(0).text()).toBe(
            `Descripcion: ${deportes.descripcion}`
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'h5' que contenga el texto 'Reglas: ' y las reglas del deporte.", () => {
         useSelectorFn(1);
         expect(deporteDetail(1).text().includes(deportes.reglas)).toEqual(
            true
         );
         expect(deporteDetail(1).find('h5').at(0).text()).toBe(
            'Reglas: ' + deportes.reglas
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'h5' que contenga el texto 'Equipamiento: ' y el equipamiento del deporte.", () => {
         useSelectorFn(1);
         expect(
            deporteDetail(1).text().includes(deportes.equipamiento)
         ).toEqual(true);
         expect(deporteDetail(1).find('h5').at(1).text()).toBe(
            'Equipamiento: ' + deportes.equipamiento
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });

      it("Debe renderizar una etiqueta 'h5' que contenga el texto 'Origen: ' y el lugar de origen del deporte.", () => {
         useSelectorFn(1);
         expect(
            deporteDetail(1).text().includes(deportes.lugar_de_origen)
         ).toEqual(true);
         expect(deporteDetail(1).find('h5').at(2).text()).toBe(
            'Origen: ' + deportes.lugar_de_origen
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });
      it("Debe renderizar una etiqueta 'h5' que contenga el texto 'Ligas destacadas: ' y las ligas destacadas del deporte.", () => {
         useSelectorFn(1);
         expect(
            deporteDetail(1).text().includes(deportes.ligas_destacadas.join(''))
         ).toEqual(true);
         expect(deporteDetail(1).find('h5').at(3).text()).toEqual(
            `Ligas destacadas: ${deportes.ligas_destacadas.join('')}`
         );
         expect(useSelectorStub).toHaveBeenCalled();
         expect(useEffect).toHaveBeenCalled();
      });
   });
});
