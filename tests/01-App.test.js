import * as data from "../db.json";

import { configure, mount } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "../src/App";
import CreateDeporte from "../src/components/CreateDeporte/CreateDeporte";
import DeporteCard from "../src/components/DeporteCard/DeporteCard";
import DeporteDetail from "../src/components/DeporteDetail/DeporteDetail";
import Home from "../src/components/Home/Home";
import { MemoryRouter } from "react-router-dom";
import Nav from "../src/components/Nav/Nav";
import { Provider } from "react-redux";
import React from "react";
import axios from "axios";
import configureStore from "redux-mock-store";
import nock from "nock";
import nodeFetch from "node-fetch";
import thunk from "redux-thunk";

axios.defaults.adapter = require("axios/lib/adapters/http");

configure({ adapter: new Adapter() });

// Mocks de los componentes, acá se pueden hardcodear para que funcionen SI o SI
// De esa manera sin importar si hay errores en alguno de ellos, nos fijamos de que sean montados en app.js
jest.mock("../src/components/DeporteDetail/DeporteDetail", () => () => <></>);
jest.mock("../src/components/DeporteCard/DeporteCard", () => () => <></>);
jest.mock("../src/components/Nav/Nav", () => () => <></>);
jest.mock("../src/components/CreateDeporte/CreateDeporte", () => () => <></>);
jest.mock("../src/components/Home/Home", () => () => <></>);

describe("<App />", () => {
  global.fetch = nodeFetch;

  let store;
  const routes = ["/", "/deportes/1", "/deportes/create"];
  const mockStore = configureStore([thunk]);
  const state = {
    deportes: data.deportes,
    deportesDetail: data.deportes[0],
  };

  beforeEach(async () => {
    // Se mockea las request a las API
    const apiMock = nock("http://localhost:3001").persist();

    // "/deportes" => Retorna la propiedad deportes del archivo "data.json".
    apiMock.get("/deportes").reply(200, data.deportes);

    // "/deportes/:id" => Retorna un deporte matcheado por su "id".
    let id = null;
    apiMock
      .get((uri) => {
        id = Number(uri.split("/").pop()); // Number('undefined') => NaN.
        return !!id;
      })
      .reply(200, (uri, requestBody) => {
        return data.deportes.find((deportes) => deportes.id === id) || {};
      });
  });

  store = mockStore(state);

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  describe("Nav:", () => {
    it('Debe ser renderizado en la ruta "/"', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(Nav)).toHaveLength(1);
    });

    it('Debe ser renderizado en la ruta "/deportes/:id"', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(Nav)).toHaveLength(1);
    });
    it('Debe ser renderizado en la ruta "/deportes/create"', () => {
      const app = mount(componentToUse(routes[2]));
      expect(app.find(Nav)).toHaveLength(1);
    });
  });

  describe("Home:", () => {
    it('El componente "Home" debe ser renderizado solamente en la ruta "/"', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(DeporteDetail)).toHaveLength(0);
      expect(app.find(CreateDeporte)).toHaveLength(0);
      expect(app.find(Home)).toHaveLength(1);
    });
    it('El componente "Home" no debería mostrarse en ninguna otra ruta', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(Home)).toHaveLength(1);

      const app2 = mount(componentToUse(routes[1]));
      expect(app2.find(Home)).toHaveLength(0);

      const app3 = mount(componentToUse(routes[2]));
      expect(app3.find(Home)).toHaveLength(0);
    });
  });

  describe("DeporteDetail:", () => {
    it('La ruta "/deportes/:id" debería mostrar solo el componente DeporteDetail', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(Home)).toHaveLength(0);
      expect(app.find(DeporteCard)).toHaveLength(0);
      expect(app.find(DeporteDetail)).toHaveLength(1);
    });
  });

  describe("CreateDeporte:", () => {
    it('La ruta "/deportes/create" debería mostrar solo el componente CreateDeporte', () => {
      const app = mount(componentToUse(routes[2]));
      expect(app.find(CreateDeporte)).toHaveLength(1);
      expect(app.find(DeporteCard)).toHaveLength(0);
      expect(app.find(Nav)).toHaveLength(1);
      expect(app.find(Home)).toHaveLength(0);
    });
  });
});
