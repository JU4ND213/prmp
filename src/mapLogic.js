import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// --- Icono base (TU CÓDIGO ORIGINAL) ---
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Datos y circuitos (TU CÓDIGO ORIGINAL) ---
export const DESTINOS = [
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

// Clase Circuito (TU CÓDIGO ORIGINAL)
export class Circuito {
  constructor(ids, color) {
    this.ids = ids;
    this.color = color;
  }
  getPuntos(destinos) {
    return this.ids.map(id => destinos.find(d => d.id === id));
  }
}

export const CIRCUITOS_OBJ = {
  PACHA: new Circuito([1, 2, 3, 4, 5, 6, 7], "#2b6cff"),
  INTI: new Circuito([1, 2, 5, 6, 8, 9, 7, 10, 11, 12, 13, 14], "#2ecc71"),
  KILLA: new Circuito([15, 14, 13, 12, 11, 10, 7], "#f39c12"),
};

// --- Función principal (AQUÍ INTEGRAMOS) ---
export function startMap(container) {
  if (!container) return;

  // 1. Inicializar mapa (TU CÓDIGO ORIGINAL)
  const map = L.map(container).setView([-0.0025133, -78.4549464], 16);

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { attribution: "Tiles © Esri" }
  ).addTo(map);

  // 2. Marcadores base (TU CÓDIGO ORIGINAL)
  const marcadores = {};
  DESTINOS.forEach(d => {
    marcadores[d.id] = L.marker([d.lat, d.lng], { icon: DefaultIcon })
      .addTo(map)
      .bindPopup(d.nombre);
  });

  // 3. Usuario y GPS (TU CÓDIGO ORIGINAL)
  const userMarker = L.circleMarker([0, 0], {
    radius: 10,
    color: "white",
    fillColor: "#01004d",
    fillOpacity: 1,
  }).addTo(map);

  let watchId = null;
  if ("geolocation" in navigator) {
    watchId = navigator.geolocation.watchPosition(
      pos => userMarker.setLatLng([pos.coords.latitude, pos.coords.longitude]),
      err => console.error("Error GPS:", err),
      { enableHighAccuracy: true }
    );
  }

  // 4. Lógica de Circuitos (TU CÓDIGO ORIGINAL)
  let lineaCircuito = null;

  function dibujarCircuito(circuito) {
    if (lineaCircuito) map.removeLayer(lineaCircuito);

    const puntos = circuito.getPuntos(DESTINOS).map(p => [p.lat, p.lng]);
    lineaCircuito = L.polyline(puntos, { color: circuito.color, weight: 5 }).addTo(map);
    map.fitBounds(lineaCircuito.getBounds(), { padding: [50, 50] });

    // Cambiar colores de marcadores (TU LÓGICA)
    DESTINOS.forEach(d => {
      if (circuito.ids.includes(d.id)) {
        marcadores[d.id].setIcon(L.icon({
          iconUrl: markerIcon,
          shadowUrl: markerShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          className: "marker-active", // Asegúrate de tener CSS para esto o usa filter
        }));
      } else {
        marcadores[d.id].setIcon(DefaultIcon);
      }
    });
  }

  // ---------------------------------------------------------
  // ✅ NUEVO: Lógica para Puntos de Categoría (Baños, etc.)
  // Usamos un LayerGroup para poder borrar todos los puntos de golpe fácilmente
  const categoryLayer = L.layerGroup().addTo(map);

  function dibujarPuntos(listaPuntos) {
    categoryLayer.clearLayers(); // Borra los anteriores

    listaPuntos.forEach(punto => {
      L.circleMarker([punto.lat, punto.lng], {
        radius: 8,
        fillColor: punto.color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      })
      .bindPopup(`<b>${punto.name}</b>`)
      .addTo(categoryLayer);
    });
  }
  // ---------------------------------------------------------

  return {
    map,
    dibujarCircuito,
    dibujarPuntos, // ✅ Exportamos la nueva función
    cleanup: () => {
      map.remove();
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    },
  };
}