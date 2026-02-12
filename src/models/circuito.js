// Clase Circuito
export class Circuito {
  constructor(ids, color) {
    this.ids = ids;       // IDs de los destinos que forman el circuito
    this.color = color;   // Color del circuito
  }

  // Método para obtener los puntos del circuito a partir del array de destinos
  getPuntos(destinos) {
    return this.ids.map(id => destinos.find(d => d.id === id));
  }
}

// --- Datos de destinos ---
const DESTINOS = [
  { id: 7, nombre: "Punto 7 Monumento", lat: -0.0020218, lng: -78.4557291 },
  { id: 1, nombre: "Punto 1 Viviendas", lat: -0.0026339, lng: -78.4536447 },
  { id: 2, nombre: "Punto 2 Museo Fiestas", lat: -0.00254709, lng: -78.45416508 },
  { id: 3, nombre: "Punto 3 Tiangues", lat: -0.002408226, lng: -78.45456037 },
  { id: 4, nombre: "Punto 4 Capilla", lat: -0.00217993, lng: -78.45443815 },
  { id: 5, nombre: "Punto 5 Museo Cerveza", lat: -0.00172532, lng: -78.45456769 },
  { id: 6, nombre: "Punto 6 Museo Cacao", lat: -0.00144343, lng: -78.45508843 },
  { id: 8, nombre: "Punto 8 Tienda Pichincha", lat: -0.00194292, lng: -78.45494728 },
  { id: 9, nombre: "Punto 9 Exp. Huevo", lat: -0.00210687, lng: -78.45492085 },
  { id: 10, nombre: "Punto 10 Legado Virtual", lat: -0.00270064, lng: -78.45528725 },
  { id: 11, nombre: "Punto 11 Pab. Ecuador", lat: -0.00295948, lng: -78.45520276 },
  { id: 12, nombre: "Punto 12 Planetario", lat: -0.00287231, lng: -78.45505122 },
  { id: 13, nombre: "Punto 13 Pab. Francia", lat: -0.00308018, lng: -78.45503877 },
  { id: 14, nombre: "Punto 14 Pab. Guayasamín", lat: -0.0030547, lng: -78.45482457 },
  { id: 15, nombre: "Punto 15 Av. Geodésicos", lat: -0.0031959, lng: -78.45422637 },
];

// --- Construcción de circuitos usando la clase ---
const CIRCUITOS_OBJ = {
  PACHA: new Circuito([1, 2, 3, 4, 5, 6, 7], "#2b6cff"),
  INTI: new Circuito([1, 2, 5, 6, 8, 9, 7, 10, 11, 12, 13, 14], "#2ecc71"),
  KILLA: new Circuito([15, 14, 13, 12, 11, 10, 7], "#f39c12"),
};

// --- Ejemplo de uso: obtener los puntos de cada circuito ---
console.log("Puntos Pacha:", CIRCUITOS_OBJ.PACHA.getPuntos(DESTINOS));
console.log("Puntos Inti:", CIRCUITOS_OBJ.INTI.getPuntos(DESTINOS));
console.log("Puntos Killa:", CIRCUITOS_OBJ.KILLA.getPuntos(DESTINOS));

export { DESTINOS, CIRCUITOS_OBJ };
