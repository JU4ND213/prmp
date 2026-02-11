import { Destino } from "../models/destino";
import { Circuito } from "../models/circuito";

export const DESTINOS = [
  new Destino(1, "Punto 1 Viviendas", -0.0026339, -78.4536447),
  new Destino(2, "Punto 2 Museo Fiestas", -0.00254709, -78.45416508),
  new Destino(3, "Punto 3 Tiangues", -0.002408226, -78.45456037),
  new Destino(4, "Punto 4 Capilla", -0.00217993, -78.45443815),
  new Destino(5, "Punto 5 Museo Cerveza", -0.00172532, -78.45456769),
  new Destino(6, "Punto 6 Museo Cacao", -0.00144343, -78.45508843),
  new Destino(7, "Punto 7 Monumento", -0.0020218, -78.4557291),
];

export const CIRCUITOS = {
  PACHA: new Circuito([1, 2, 3, 4, 5, 6, 7], "#2b6cff"),
  INTI: new Circuito([1, 2, 5, 6, 7], "#2ecc71"),
};
