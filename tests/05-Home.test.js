import * as actions from "../src/redux/actions";
import * as data from "../db.json";

import HomeConnected, {
  Home,
  mapDispatchToProps,
  mapStateToProps,
} from "../src/components/Home/Home";
import { configure, mount, shallow } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DeporteCard from "../src/components/DeporteCard/DeporteCard";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import axios from "axios";
import configureStore from "redux-mock-store";
import isReact from "is-react";
import mainImage from "../src/img-cp2/main-image-cp2.jpg";
import nock from "nock";
import nodeFetch from "node-fetch";
import thunk from "redux-thunk";

axios.defaults.adapter = require("axios/lib/adapters/http");

configure({ adapter: new Adapter() });

// Acá se mockea la action para que el test pueda funcionar correctamente, sin importar si hay un bug en ese archivo
jest.mock("../src/redux/actions/index.js", () => ({
  getAllDeportes: () => ({
    type: "GET_ALL_DEPORTES",
  }),
}));

jest.mock("../src/components/DeporteCard/DeporteCard", () => () => <></>);

describe("<Home />", () => {
  let home, store, state, getAllDeportesSpy, componentDidMountSpy;
  global.fetch = nodeFetch;
  const mockStore = configureStore([thunk]);
  beforeEach(() => {
    // Se Mockea las request a las api
    const apiMock = nock("http://localhost:3001").persist();

    // "/DEPORTES" => Retorna la propiedad DEPORTES del archivo data.json
    apiMock.get("/deportes").reply(200, data.deportes);

    // "/deportes/:id" => Retorna un deporte matcheado por su id
    // "/deportes/:id" => Retorna un deporte matcheado por su id
    let id = null;

    apiMock
      .get((uri) => {
        id = Number(uri.split("/").pop()); // Number('undefined') => NaN
        return !!id;
      })
      .reply(200, (uri, requestBody) => {
        return data.deportes.find((deporte) => deporte.id === id) || {};
      });
    state = {
      deportes: [],
      deporteDetail: {},
    };
    store = mockStore(state);
    home = mount(<HomeConnected store={store} />);
    // Si o si vas a tener que usar class component! No van a pasar ninguno de los tests si no lo haces.
    expect(isReact.classComponent(Home)).toBeTruthy();

    store.clearActions();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('Debe rederizar un "h1" con el texto "Deportes"', () => {
    expect(home.find("h1").at(0).text()).toEqual("Deportes");
  });

  it('Debe renderizar un tag "img" con la imagen provista en la carpeta "img-cp2"', () => {
    // Tendrías que importar la img a tu archivo "Home.jsx" y luego usarla como source de img.
    // Podés ver como lo hacemos en este mismo archivo en la linea 16!
    expect(home.find("img").at(0).prop("src")).toEqual(mainImage);
  });

  it('La imagen debe tener un atributo "alt" con el texto "deporte-logo"', () => {
    expect(home.find("img").at(0).prop("alt")).toEqual("deporte-logo");
  });

  it('Debe rederizar un "h3" con el texto "Deportes:"', () => {
    expect(home.find("h3").at(0).text()).toEqual("Deportes:");
  });

  it('Debe rederizar un "h4" con el texto "Checkpoint M2"', () => {
    expect(home.find("h4").at(0).text()).toEqual("Checkpoint M2");
  });

  describe("connect Redux", () => {
    // 🚨IMPORTANTE TRABAJAMOS CON LA REFERENCIA DE LAS ACTIONS TE DEJAMOS COMENTARIOS PARA CADA USO LEER BIEN!!🚨
    it("Debe traer del estado global de Redux todos los deportes utilizando mapStateToProps", () => {
      // El estado Debe tener un nombre "deportes".
      expect(mapStateToProps(state)).toEqual({
        deportes: state.deportes,
      });
    });

    if (typeof mapDispatchToProps === "function") {
      // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UNA FUNCIÓN.
      // IMPORTANTE! SI LO HACES DE ESTA FORMA LA IMPORTACION DE LAS ACTIONS DEBE SER DE LA SIGUIENTE MANERA
      // import * as actions from "./../../redux/actions/index";
      it("Debe traer por props la action-creator 'getAllDeportes' de Redux utilizando mapDispatchToProps", () => {
        // Acá testeamos que hagas todo el proceso. Utilizas la funcion "mapDispatchToProps",
        // y con ella despachas la accion "getAllDeportes".
        const getAllDeportes = jest.spyOn(actions, "getAllDeportes");
        const dispatch = jest.fn();
        const props = mapDispatchToProps(dispatch);
        props.getAllDeportes();
        expect(dispatch).toHaveBeenCalled();
        expect(getAllDeportes).toHaveBeenCalled();
      });
    } else {
      // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UN OBJETO.
      // IMPORTANTE! SI LO HACES DE ESTA FORMA mapDispatchToProps TIENE QUE SER EL OBJETO
      // eslint-disable-next-line jest/no-identical-title
      it("Debe traer por props la action-creator 'getAllDeportes' de Redux utilizando mapDispatchToProps", () => {
        // Acá testeamos que hagas todo el proceso. Utilizas connect y el objeto "mapDispatchToProps",
        // traes la acción "getAllDeportes". Con esto podrás usarla luego en el componente.
        const getAllDeportes = jest.spyOn(actions, "getAllDeportes");
        getAllDeportes();
        expect(
          mapDispatchToProps.hasOwnProperty("getAllDeportes")
        ).toBeTruthy();
        expect(getAllDeportes).toHaveBeenCalled();
      });
    }
  });

  describe("React LifeCycles", () => {
    getAllDeportesSpy = jest.fn();
    let instance;
    beforeEach(async () => {
      state = {
        deportes: data.deportes,
        deporteDetail: {},
      };
      store = mockStore(state);
      home = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home"]}>
            <HomeConnected />
          </MemoryRouter>
        </Provider>
      );
    });

    beforeAll(() => {
      // Ojo acá. Antes que corran los demás tests, chequeamos que estés utilizando el lifeCycle correspondiente ( componentDidMount )
      // y que en él ejecutas la action creator "getAllDeportes" para traerte toda esa data.
      // Si no pasan estos tests, no pasan los demás!
      componentDidMountSpy = jest.spyOn(Home.prototype, "componentDidMount");
      instance = shallow(
        <Home getAllDeportes={getAllDeportesSpy} />
      ).instance();

      instance.componentDidMount();
      expect(componentDidMountSpy).toHaveBeenCalled();
      expect(getAllDeportesSpy).toHaveBeenCalled();
    });

    it("Debe mapear todos los deportes que hay en el estado global, y renderizar una <DeporteCard /> por cada una", () => {
      // Cuidado acá. Como realizamos una petición al back (código asincrónico), el componente se va a
      // renderizar más rápido. Hay un problema con esto, se va a intentar renderizar algunos datos que
      // no existen todavía, lo que es igual a un fatal error. Debes asegurarte que existen
      // jugadores y luego renderizarlos!
      // Pista: Usa un renderizado condicional.
      // IMPORTANTE: revisar el código arriba de este test, el beforeAll.
      // Ahí se está testeando el uso del lifecycle componentDidMount y que en él
      // traigas la data a renderizar.
      expect(home.find(DeporteCard)).toHaveLength(5);
    });

    it('Debe pasar a cada componente <DeporteCard /> las propiedades: "id", "nombre", "imagen" y "lugar_de_origen" de cada deporte', () => {
      // No olviden pasar la props KEY en el mappeo para mantener buenas prácticas.
      expect(home.find(DeporteCard).at(0).props().id).toEqual(1);
      expect(home.find(DeporteCard).at(0).props().nombre).toEqual("Fútbol");
      expect(home.find(DeporteCard).at(0).props().imagen).toEqual(
        "https://concepto.de/wp-content/uploads/2015/02/futbol-1-e1550783405750.jpg"
      );
      expect(home.find(DeporteCard).at(0).props().lugar_de_origen).toEqual(
        "El fútbol se originó en Inglaterra en el siglo XIX."
      );
    });
  });
});
