import React from 'react';
import isReact from 'is-react';
import thunk from 'redux-thunk';
import * as data from '../db.json';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as actions from '../src/redux/actions';
import { MemoryRouter } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CreateDeporte from '../src/components/CreateDeporte/CreateDeporte';

configure({ adapter: new Adapter() });

jest.mock('../src/redux/actions/index', () => ({
   CREATE_DEPORTE: 'CREATE_DEPORTE',
   createDeporte: (payload) => ({
      type: 'CREATE_DEPORTE',
      payload: {
         ...payload,
         id: 6,
      },
   }),
}));

describe('<CreateDeporte/>', () => {
   const state = { deportes: data.deportes };
   const mockStore = configureStore([thunk]);
   const { CREATE_DEPORTE } = actions;

   beforeAll(() => expect(isReact.classComponent(CreateDeporte)).toBeFalsy());

   // RECUERDEN USAR FUNCTIONAL COMPONENT EN LUGAR DE CLASS COMPONENT
   describe('Formulario de Creación de deportes', () => {
      let createDeporte;
      let store = mockStore(state);
      beforeEach(() => {
         createDeporte = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/deportes/create']}>
                  <CreateDeporte />
               </MemoryRouter>
            </Provider>
         );
      });

      it('Debe renderizar un formulario', () =>
         expect(createDeporte.find('form').length).toBe(1));

      it('Debe renderizar un label con el texto "Nombre: "', () => {
         expect(createDeporte.find('label').at(0).text()).toEqual('Nombre: ');
      });

      it('Debe renderizar un input de tipo text con el atributo "name" igual a "nombre"', () => {
         expect(createDeporte.find('input[name="nombre"]').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Descripción: "', () => {
         expect(createDeporte.find('label').at(1).text()).toBe('Descripción: ');
      });

      it('Debe renderizar un input de tipo textarea con el atributo "name" igual a "descripcion"', () => {
         expect(createDeporte.find('textarea[name="descripcion"]').length).toBe(
            1
         );
      });

      it('Debe renderizar un label con el texto "Reglas: "', () => {
         expect(createDeporte.find('label').at(2).text()).toBe('Reglas: ');
      });

      it('Debe renderizar un input de tipo number con el atributo "name" igual a "reglas"', () => {
         expect(createDeporte.find('input[name="reglas"]').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Imagen: "', () => {
         expect(createDeporte.find('label').at(3).text()).toBe('Imagen: ');
      });
      it('Debe renderizar un input de tipo text con el atributo name igual a "imagen"', () => {
         expect(createDeporte.find('input[name="imagen"]').length).toBe(1);
      });

      it('Debe renderizar un label con el texto "Equipamiento: "', () => {
         expect(createDeporte.find('label').at(4).text()).toBe(
            'Equipamiento: '
         );
      });

      it('Debe renderizar un input de tipo text con el atributo "name" igual a "equipamiento"', () => {
         expect(createDeporte.find('input[name="equipamiento"]').length).toBe(
            1
         );
      });

      it('Debe renderizar un label con el texto "Lugar de origen: "', () => {
         expect(createDeporte.find('label').at(5).text()).toEqual(
            'Lugar de origen: '
         );
      });
      it('Debe renderizar un input de tipo text con el atributo "name" igual a "lugar_de_origen"', () => {
         expect(
            createDeporte.find('input[name="lugar_de_origen"]').length
         ).toBe(1);
      });

      it('Debe renderizar un label con el texto "Liga destacada: "', () => {
         expect(createDeporte.find('label').at(6).text()).toEqual(
            'Liga destacada: '
         );
      });
      it('Debe renderizar un input de tipo text con el atributo "name" igual a "liga_destacada"', () => {
         expect(createDeporte.find('input[name="liga_destacada"]').length).toBe(
            1
         );
      });

      it('Debe renderizar un button de tipo submit con el texto "Crear deporte"', () => {
         expect(createDeporte.find('button[type="submit"]').length).toBe(1);
         expect(createDeporte.find('button[type="submit"]').text()).toBe(
            'Crear deporte'
         );
      });
   });

   describe('Manejo de estados locales', () => {
      let useState, useStateSpy, createDeporte;
      let store = mockStore(state);
      beforeEach(() => {
         useState = jest.fn();
         useStateSpy = jest.spyOn(React, 'useState');
         useStateSpy.mockImplementation((initialState) => [
            initialState,
            useState,
         ]);

         createDeporte = mount(
            <MemoryRouter>
               <Provider store={store}>
                  <CreateDeporte />
               </Provider>
            </MemoryRouter>
         );
      });

      it('Debe inicializar el estado local con las propiedades: "nombre", "descripcion", "imagen", "reglas", "equipamiento", "lugar_de_origen" y "liga_destacada"', () => {
         expect(useStateSpy).toHaveBeenCalledWith({
            nombre: '',
            descripcion: '',
            imagen: '',
            reglas: '',
            equipamiento: '',
            lugar_de_origen: '',
            liga_destacada: '',
         });
      });

      describe('Debe reconocer cuando hay un cambio de valor en los distintos inputs', () => {
         it('input "nombre"', () => {
            createDeporte.find('input[name="nombre"]').simulate('change', {
               target: { name: 'nombre', value: 'Voley' },
            });

            expect(useState).toHaveBeenCalledWith({
               nombre: 'Voley',
               descripcion: '',
               imagen: '',
               reglas: '',
               equipamiento: '',
               lugar_de_origen: '',
               liga_destacada: '',
            });

            createDeporte.find('input[name="nombre"]').simulate('change', {
               target: { name: 'nombre', value: 'Padel' },
            });

            expect(useState).toHaveBeenCalledWith({
               nombre: 'Padel',
               descripcion: '',
               imagen: '',
               reglas: '',
               equipamiento: '',
               lugar_de_origen: '',
               liga_destacada: '',
            });
         });

         it('input "descripcion"', () => {
            createDeporte
               .find('textarea[name="descripcion"]')
               .simulate('change', {
                  target: {
                     name: 'descripcion',
                     value: 'El pádel es un deporte de raqueta que se juega en una pista con paredes en todos los lados. Es similar al tenis, pero se juega con una pelota más pequeña y en una cancha más pequeña. El objetivo del juego es hacer que la pelota rebote en el lado opuesto de la pista sin que el oponente pueda devolverla correctamente. Se puede jugar en parejas o en individuales. El pádel requiere de una combinación de habilidad, estrategia y forma física, lo que lo convierte en un deporte emocionante y desafiante. Además, es una actividad social divertida y se puede jugar en una variedad de niveles de habilidad, desde principiantes hasta jugadores experimentados.',
                  },
               });

            expect(useState).toHaveBeenCalledWith({
               nombre: '',
               descripcion:
                  'El pádel es un deporte de raqueta que se juega en una pista con paredes en todos los lados. Es similar al tenis, pero se juega con una pelota más pequeña y en una cancha más pequeña. El objetivo del juego es hacer que la pelota rebote en el lado opuesto de la pista sin que el oponente pueda devolverla correctamente. Se puede jugar en parejas o en individuales. El pádel requiere de una combinación de habilidad, estrategia y forma física, lo que lo convierte en un deporte emocionante y desafiante. Además, es una actividad social divertida y se puede jugar en una variedad de niveles de habilidad, desde principiantes hasta jugadores experimentados.',
               imagen: '',
               reglas: '',
               equipamiento: '',
               lugar_de_origen: '',
               liga_destacada: '',
            });
         });

         it('input "reglas"', () => {
            createDeporte
               .find('textarea[name="descripcion"]')
               .simulate('change', {
                  target: {
                     name: 'reglas',
                     value: 'El voley es un deporte de equipo que se juega en una cancha dividida por una red. El objetivo es pasar el balón por encima de la red y hacer que toque el suelo en el campo del equipo contrario. Las reglas incluyen el límite de toques, la rotación de los jugadores, la prohibición de tocar la red, entre otras.',
                  },
               });

            expect(useState).toHaveBeenCalledWith({
               nombre: '',
               descripcion: '',
               imagen: '',
               reglas:
                  'El voley es un deporte de equipo que se juega en una cancha dividida por una red. El objetivo es pasar el balón por encima de la red y hacer que toque el suelo en el campo del equipo contrario. Las reglas incluyen el límite de toques, la rotación de los jugadores, la prohibición de tocar la red, entre otras.',
               equipamiento: '',
               lugar_de_origen: '',
               liga_destacada: '',
            });
         });

         it('input "imagen"', () => {
            createDeporte.find('input[name="imagen"]').simulate('change', {
               target: {
                  name: 'imagen',
                  value: 'https://www.elgrafico.com.ar/media/cache/pub_news_details_large/media/i/7b/3c/7b3c07e6c3716df97670f11e3ca2d958674e99e7.jpeg',
               },
            });

            expect(useState).toHaveBeenCalledWith({
               nombre: '',
               descripcion: '',
               imagen:
                  'https://www.elgrafico.com.ar/media/cache/pub_news_details_large/media/i/7b/3c/7b3c07e6c3716df97670f11e3ca2d958674e99e7.jpeg',
               reglas: '',
               equipamiento: '',
               lugar_de_origen: '',
               liga_destacada: '',
            });
         });

         it('input "equipamiento"', () => {
            createDeporte
               .find('input[name="equipamiento"]')
               .simulate('change', {
                  target: {
                     name: 'equipamiento',
                     value: 'Una red, pelotas de voley, y una cancha de voley. También se recomienda usar rodilleras y zapatos deportivos adecuados para reducir el riesgo de lesiones.',
                  },
               });

            expect(useState).toHaveBeenCalledWith({
               nombre: '',
               descripcion: '',
               imagen: '',
               reglas: '',
               equipamiento:
                  'Una red, pelotas de voley, y una cancha de voley. También se recomienda usar rodilleras y zapatos deportivos adecuados para reducir el riesgo de lesiones.',
               lugar_de_origen: '',
               liga_destacada: '',
            });
         });

         it('input "lugar_de_origen"', () => {
            createDeporte
               .find('input[name="lugar_de_origen"]')
               .simulate('change', {
                  target: {
                     name: 'lugar_de_origen',
                     value: 'El vóley, también conocido como voleibol, fue creado en 1895 en Estados Unidos por William G. Morgan.',
                  },
               });

            expect(useState).toHaveBeenCalledWith({
               nombre: '',
               descripcion: '',
               imagen: '',
               reglas: '',
               equipamiento: '',
               lugar_de_origen:
                  'El vóley, también conocido como voleibol, fue creado en 1895 en Estados Unidos por William G. Morgan.',
               liga_destacada: '',
            });
         });

         it('input "liga_destacada"', () => {
            createDeporte
               .find('input[name="liga_destacada"]')
               .simulate('change', {
                  target: {
                     name: 'liga_destacada',
                     value: 'Liga Mundial de Voleibol, una competición internacional masculina organizada por la Federación Internacional de Voleibol (FIVB) que se celebra anualmente desde 1990.',
                  },
               });

            expect(useState).toHaveBeenCalledWith({
               nombre: '',
               descripcion: '',
               imagen: '',
               reglas: '',
               equipamiento: '',
               lugar_de_origen: '',
               liga_destacada:
                  'Liga Mundial de Voleibol, una competición internacional masculina organizada por la Federación Internacional de Voleibol (FIVB) que se celebra anualmente desde 1990.',
            });
         });
      });
   });

   describe('Dispatch al store', () => {
      // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA🚨
      // import * as actions from "./../../redux/actions/index";

      let createDeporte, useState, useStateSpy;
      let store = mockStore(state);

      beforeEach(() => {
         useState = jest.fn();
         useStateSpy = jest.spyOn(React, 'useState');
         useStateSpy.mockImplementation((initialState) => [
            initialState,
            useState,
         ]);
         store = mockStore(state, actions.createDeporte);
         store.clearActions();
         createDeporte = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/deportes/create']}>
                  <CreateDeporte />
               </MemoryRouter>
            </Provider>
         );
      });

      afterEach(() => jest.restoreAllMocks());

      it('Debe despachar la action "CreateDeporte" con los datos del estado local cuando se haga submit del form.', () => {
         const createDeporteFn = jest.spyOn(actions, 'createDeporte');
         createDeporte.find('form').simulate('submit');
         expect(store.getActions()).toEqual([
            {
               type: CREATE_DEPORTE,
               payload: {
                  id: 6,
                  nombre: '',
                  descripcion: '',
                  imagen: '',
                  reglas: '',
                  equipamiento: '',
                  lugar_de_origen: '',
                  liga_destacada: '',
               },
            },
         ]);
         expect(CreateDeporte.toString().includes('useDispatch')).toBe(true);
         expect(createDeporteFn).toHaveBeenCalled();
      });

      it('Debe evitar que se refresque la página luego de hacer submit con el uso de "preventDefault"', () => {
         const event = { preventDefault: () => {} };
         jest.spyOn(event, 'preventDefault');
         createDeporte.find('form').simulate('submit', event);
         expect(event.preventDefault).toBeCalled();
      });
   });

   //-----------------------------------------------------
   describe('Manejo de errores', () => {
      let createDeporte;
      let store = mockStore(state);
      beforeEach(() => {
         createDeporte = mount(
            <Provider store={store}>
               <MemoryRouter initialEntries={['/deportes/create']}>
                  <CreateDeporte />
               </MemoryRouter>
            </Provider>
         );
      });

      it("Al ingresar un 'nombre' con una longitud mayor a 30 caracteres, debe renderizar un <p> indicando el error", () => {
         // Pueden implementar la lógica de validación de errores de la forma que mejor prefieran!
         // Los test verifican principalmente que muestres lo errores en la interfaz CORRECTAMENTE.
         jest.restoreAllMocks();
         expect(createDeporte.find('p').length).toEqual(0);
         createDeporte.find('input[name="nombre"]').simulate('change', {
            target: {
               name: 'nombre',
               value: 'Baskeeeeeeeeeeee tttttttttttt tttttttt ttttttttttttttttttttttttttttttttttttttttt tttttttttttttt',
            },
         });
         expect(createDeporte.find('p').at(0).text()).toEqual(
            'Nombre demasiado largo'
         );

         // Al insertar un valor correcto en el input, el "p" deberia desaparecer
         createDeporte.find('input[name="nombre"]').simulate('change', {
            target: { name: 'nombre', value: 'cricket' },
         });
         expect(createDeporte.find('p').length).toEqual(2);
      });

      it("Al ingresar una 'descripcion' con una longitud menor a 100 caracteres, debe renderizar un <p> indicando el error", () => {
         jest.restoreAllMocks();
         expect(createDeporte.find('p').length).toEqual(0);
         createDeporte.find('textarea[name="descripcion"]').simulate('change', {
            target: {
               name: 'descripcion',
               value: 'el basket es... continuará',
            },
         });
         expect(createDeporte.find('p').at(0).text()).toEqual(
            'Descripción demasiada corta'
         );
         createDeporte.find('textarea[name="descripcion"]').simulate('change', {
            target: {
               name: 'descripcion',
               value: "El baloncesto, basquetbol o básquetbol (del inglés basketball; de basket, 'canasta', y ball, 'pelota'), o simplemente básquet, es un deporte de equipo que se puede desarrollar tanto en pista cubierta como en descubierta, en el que dos conjuntos de cinco jugadores cada uno, intentan anotar puntos.",
            },
         });
         expect(createDeporte.find('p').length).toEqual(1);
      });

      it("Al escribir las 'reglas' con una longitud menor a 50 caracteres, debe renderizar un <p> indicando el error", () => {
         jest.restoreAllMocks();
         expect(createDeporte.find('p').length).toEqual(0);
         createDeporte.find('input[name="reglas"]').simulate('change', {
            target: { name: 'reglas', value: 'Se puede lanzar el balón' },
         });
         expect(createDeporte.find('p').at(1).text()).toEqual(
            'El texto de las reglas deben ser más largas'
         );
         // Al insertar un valor correcto en el input, el "p" deberia desaparecer
         createDeporte.find('input[name="reglas"]').simulate('change', {
            target: {
               name: 'reglas',
               value: 'Es permitido palmear el balón con una o ambas manos en cualquier dirección.El balón solo puede sujetarse con las manos, no con los brazos ni con el cuerpo.El partido se juega con un balón esférico y con las manos.',
            },
         });
         expect(createDeporte.find('p').length).toEqual(1);
      });

      it('Si hay errores, no debería despachar la action', () => {
         const dispatchSpy = jest.spyOn(actions, 'createDeporte');
         // Corrobora varias veces de que si hay algun error, no se despache la action
         createDeporte.find('input[name="nombre"]').simulate('change', {
            target: {
               name: 'nombre',
               value: 'Baskeeeeeeeeeeee tttttttttttt tttttttt ttttttttttttttttttttttttttttttttttttttttt tttttttttttttt',
            },
         });
         createDeporte.find('button').simulate('submit');
         expect(dispatchSpy).not.toHaveBeenCalled();

         createDeporte.find('textarea[name="descripcion"]').simulate('change', {
            target: {
               name: 'descripcion',
               value: 'Futbollll es...',
            },
         });
         createDeporte.find('button').simulate('submit');
         expect(dispatchSpy).not.toHaveBeenCalled();

         createDeporte.find('input[name="reglas"]').simulate('change', {
            target: { name: 'reglas', value: 'El partido dura...' },
         });
         createDeporte.find('button').simulate('submit');
         expect(dispatchSpy).not.toHaveBeenCalled();
      });
   });
});
