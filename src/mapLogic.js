import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/* ---------------- ICONOS ---------------- */

const DefaultIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

/* ---------------- DATOS ---------------- */

export const DESTINOS = [
  {
  id: 7,
  nombre: "Punto 7 Monumento",
  imagen: "/images/Mitad_del_Mundo_01.jpg", 
  lat: -0.0020218,
  lng: -78.4557291
},

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

/* ---------------- CIRCUITOS ---------------- */

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

/* ---------------- MAPA ---------------- */

export function startMap(container) {
  if (!container) return;

  const map = L.map(container).setView([-0.0025133, -78.4549464], 16);

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { attribution: "Ciudad Mitad Del Mundo" }
  ).addTo(map);

  /* ---- MARCADORES BASE ---- */
  const baseLayer = L.layerGroup().addTo(map);
  const marcadores = {};

  DESTINOS.forEach(d => {
  const popupHTML = `
    <div style="text-align:center; max-width:180px">
      <h4 style="margin:4px 0">${d.nombre}</h4>

      ${d.imagen ? `
        <a href="${d.link}" target="_blank" rel="noopener noreferrer">
          <img 
            src="${d.imagen}" 
            alt="${d.nombre}"
            style="width:100%; border-radius:8px; margin-top:6px"
          />
        </a>
      ` : ""}
    </div>
  `;

  const marker = L.marker([d.lat, d.lng]).bindPopup(popupHTML);
  marcadores[d.id] = marker;
  baseLayer.addLayer(marker);
});


  function toggleMarcadoresBase(mostrar) {
    mostrar ? baseLayer.addTo(map) : map.removeLayer(baseLayer);
  }

  /* ---- GPS ---- */
  const userMarker = L.circleMarker([0, 0], {
    radius: 10,
    color: "white",
    fillColor: "#000",
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

  /* ---- CIRCUITOS ---- */
  let lineaCircuito = null;

  function dibujarCircuito(circuito) {
    if (lineaCircuito) map.removeLayer(lineaCircuito);

    const puntos = circuito
      .getPuntos(DESTINOS)
      .map(p => [p.lat, p.lng]);

    lineaCircuito = L.polyline(puntos, {
      color: circuito.color,
      weight: 5,
    }).addTo(map);

    map.fitBounds(lineaCircuito.getBounds(), { padding: [50, 50] });
  }

  /* ---- CATEGORÍAS ---- */
  const categoryLayer = L.layerGroup().addTo(map);

  function dibujarPuntos(listaPuntos) {
    categoryLayer.clearLayers();

    listaPuntos.forEach(p => {
      L.circleMarker([p.lat, p.lng], {
        radius: 8,
        fillColor: p.color,
        color: "#fff",
        weight: 2,
        fillOpacity: 0.9,
      })
        .bindPopup(`<b>${p.name}</b>`)
        .addTo(categoryLayer);
    });
  }

  /* ---- CLEANUP ---- */
  return {
    dibujarCircuito,
    dibujarPuntos,
    toggleMarcadoresBase,
    cleanup: () => {
      map.remove();
      if (watchId) navigator.geolocation.clearWatch(watchId);
    },
  };
}
