import * as actions from "../src/redux/actions/index";
import * as data from "../db.json";

import { Link, MemoryRouter } from "react-router-dom";
import { configure, mount } from "enzyme";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DeporteCardConnected from "../src/components/DeporteCard/DeporteCard";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

configure({ adapter: new Adapter() });

jest.mock("../src/redux/actions/index", () => ({
  deleteDeporte: () => ({
    type: "DELETE_DEPORTE",
  }),
}));

describe("<DeporteCard />", () => {
  let deporteCard, state, store;
  const mockStore = configureStore([thunk]);
  let deportes = data.deportes;
  state = {
    deportes: [],
    deporteDetail: {},
  };
  store = mockStore(state);
  beforeEach(() => {
    deporteCard = (deporte) =>
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <DeporteCardConnected
              id={deporte.id}
              nombre={deporte.nombre}
              descripcion={deporte.descripcion}
              imagen={deporte.imagen}
              reglas={deporte.reglas}
              equipamiento={deporte.equipamiento}
              lugar_de_origen={deporte.lugar_de_origen}
              ligas_destacadas={deporte.ligas_destacadas}
            />
          </MemoryRouter>
        </Provider>
      );
  });

  afterEach(() => jest.restoreAllMocks());

  describe("Estructura", () => {
    it('Debe renderizar un botón con el texto "x"', () => {
      const wrapper = deporteCard(deportes[0]);
      expect(wrapper.find("button").text()).toBe("x");
    });

    it('Debe renderizar un "h3" que muestre la propiedad {nombre} de cada deporte', () => {
      expect(deporteCard(deportes[0]).find("h3").at(0).text()).toBe("Fútbol");
      expect(deporteCard(deportes[1]).find("h3").at(0).text()).toBe("Tenis");
      expect(deporteCard(deportes[2]).find("h3").at(0).text()).toBe(
        "Baloncesto"
      );
    });

    it('Debe renderizar la imagen de cada deporte y un atributo "alt" con el nombre del deporte', () => {
      expect(deporteCard(deportes[0]).find("img").prop("src")).toBe(
        deportes[0].imagen
      );
      expect(deporteCard(deportes[0]).find("img").prop("alt")).toBe(
        deportes[0].nombre
      );
      expect(deporteCard(deportes[1]).find("img").prop("src")).toBe(
        deportes[1].imagen
      );
      expect(deporteCard(deportes[1]).find("img").prop("alt")).toBe(
        deportes[1].nombre
      );
    });

    it('Debe renderizar un <p> que contenga el texto "Origen: " seguido de la propiedad {lugar_de_origen} de cada deporte', () => {
      expect(deporteCard(deportes[4]).find("p").at(0).text()).toBe(
        "Origen: La natación era practicada por los antiguos griegos y romanos, aunque como deporte moderno se desarrolló en Inglaterra en el siglo XIX."
      );
      expect(deporteCard(deportes[3]).find("p").at(0).text()).toBe(
        "Origen: El atletismo tiene su origen en la antigua Grecia, donde se realizaban competiciones como los Juegos Olímpicos."
      );
      expect(deporteCard(deportes[2]).find("p").at(0).text()).toBe(
        "Origen: El baloncesto se originó en Estados Unidos en el siglo XIX."
      );
    });

    it('Debe asociar una etiqueta <Link> con el "nombre" de cada deporte y redirigir a "/deportes/:id"', () => {
      expect(deporteCard(deportes[0]).find(Link)).toHaveLength(1);
      expect(deporteCard(deportes[0]).find(Link).at(0).prop("to")).toEqual(
        "/deportes/1"
      );
    });

    it('Debe hacer un dispatch al estado global utilizando la action "deleteDeporte" al hacer click en el botón "x". Debe pasarle el ID del deporte', () => {
      const deleteDeportespy = jest.spyOn(actions, "deleteDeporte");
      const deporteCard = mount(
        <Provider store={store}>
          <MemoryRouter>
            <DeporteCardConnected
              id={deportes[0].id}
              nombre={deportes[0].nombre}
              descripcion={deportes[0].descripcion}
              imagen={deportes[0].imagen}
              reglas={deportes[0].reglas}
              equipamiento={deportes[0].equipamiento}
              lugar_de_origen={deportes[0].lugar_de_origen}
              ligas_destacadas={deportes[0].ligas_destacadas}
            />
          </MemoryRouter>
        </Provider>
      );
      deporteCard.find("button").simulate("click");
      expect(deleteDeportespy).toHaveBeenCalled();
      expect(deleteDeportespy).toHaveBeenCalledWith(deportes[0].id);

      const deporteCard2 = mount(
        <Provider store={store}>
          <MemoryRouter>
            <DeporteCardConnected
              id={deportes[1].id}
              nombre={deportes[1].nombre}
              descripcion={deportes[1].descripcion}
              imagen={deportes[1].imagen}
              reglas={deportes[1].reglas}
              equipamiento={deportes[1].equipamiento}
              lugar_de_origen={deportes[1].lugar_de_origen}
              ligas_destacadas={deportes[1].ligas_destacadas}
            />
          </MemoryRouter>
        </Provider>
      );
      deporteCard2.find("button").simulate("click");
      expect(deleteDeportespy).toHaveBeenCalled();
      expect(deleteDeportespy).toHaveBeenCalledWith(deportes[1].id);
    });
  });
});
