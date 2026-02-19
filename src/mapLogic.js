import L from "leaflet";

/* ================= ICONO POR DEFECTO ================= */

const DefaultIcon = L.divIcon({
  html: "📍",
  className: "emoji-marker",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24]
});

L.Marker.prototype.options.icon = DefaultIcon;

/* ================= DATOS ================= */

export const DESTINOS = [
  { id: 7, nombre: "Punto 7 Monumento", imagen: "/images/Mitad_del_Mundo_01.jpg", lat: -0.0020218, lng: -78.4557291 },
  { id: 1, nombre: "Punto 1 Viviendas", imagen: "/images/Viviendas.png", lat: -0.0026339, lng: -78.4536447 },
  { id: 2, nombre: "Punto 2 Museo Fiestas", imagen: "/images/Museo Fiestas.png", lat: -0.00254709, lng: -78.45416508 },
  { id: 3, nombre: "Punto 3 Tiangues", imagen: "/images/Tiangues.png", lat: -0.002408226, lng: -78.45456037 },
  { id: 4, nombre: "Punto 4 Capilla", imagen: "/images/Capilla.png", lat: -0.00217993, lng: -78.45443815 },
  { id: 5, nombre: "Punto 5 Museo Cerveza", lat: -0.00172532, lng: -78.45456769 },
  { id: 6, nombre: "Punto 6 Museo Cacao", imagen: "/images/Museo Cacao.png", lat: -0.00144343, lng: -78.45508843 },
  { id: 8, nombre: "Punto 8 Tienda Pichincha", imagen: "/images/Tienda Pichincha.png", lat: -0.00194292, lng: -78.45494728 },
  { id: 9, nombre: "Punto 9 Exp. Huevo", imagen: "/images/Exp. Huevo.png", lat: -0.00210687, lng: -78.45492085 },
  { id: 10, nombre: "Punto 10 Legado Virtual", imagen: "/images/Legado Virtual.png", lat: -0.00270064, lng: -78.45528725 },
  { id: 11, nombre: "Punto 11 Pab. Ecuador", imagen: "/images/Pab. Ecuador.png", lat: -0.00295948, lng: -78.45520276 },
  { id: 12, nombre: "Punto 12 Planetario", imagen: "/images/Planetario.png", lat: -0.00287231, lng: -78.45505122 },
  { id: 13, nombre: "Punto 13 Pab. Francia", imagen: "/images/Pab. Francia.png", lat: -0.00308018, lng: -78.45503877 },
  { id: 14, nombre: "Punto 14 Pab. Guayasamín", imagen: "/images/PabellónGuayasamín.png", lat: -0.0030547, lng: -78.45482457 },
  { id: 15, nombre: "Punto 15 Av. Geodésicos", imagen: "/images/Av. Geodésicos.png", lat: -0.0031959, lng: -78.45422637 }
];

/* ================= CIRCUITOS ================= */

export class Circuito {
  constructor(ids, color) {
    this.ids = ids;
    this.color = color;
  }
  getPuntos(destinos) {
    return this.ids.map(id => destinos.find(d => d.id === id)).filter(Boolean);
  }
}

export const CIRCUITOS_OBJ = {
  PACHA: new Circuito([1, 2, 3, 4, 5, 6, 7], "#2b6cff"),
  INTI: new Circuito([1, 2, 5, 6, 8, 9, 7, 10, 11, 12, 13, 14], "#2ecc71"),
  KILLA: new Circuito([15, 14, 13, 12, 11, 10, 7], "#f39c12")
};

/* ================= MAPA ================= */

export function startMap(container) {
  if (!container) return;

  const map = L.map(container).setView([-0.0025133, -78.4549464], 16);

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { attribution: "Ciudad Mitad Del Mundo" }
  ).addTo(map);

  /* ---------- MARCADORES BASE ---------- */
  const baseLayer = L.layerGroup().addTo(map);

  DESTINOS.forEach(d => {
    const popupHTML = `
      <div style="text-align:center; max-width:180px">
        <h4>${d.nombre}</h4>
        ${d.imagen ? `<img src="${d.imagen}" style="width:100%; border-radius:8px" />` : ""}
      </div>
    `;
    L.marker([d.lat, d.lng]).bindPopup(popupHTML).addTo(baseLayer);
  });

  function toggleMarcadoresBase(mostrar) {
    mostrar ? baseLayer.addTo(map) : map.removeLayer(baseLayer);
  }

  /* ---------- GPS ---------- */
  const userMarker = L.circleMarker([0, 0], {
    radius: 10,
    color: "#fff",
    fillColor: "#000",
    fillOpacity: 1
  }).addTo(map);

  let routeLine = null;
  let routePoints = [];

  /* ---------- DISTANCIA ---------- */
  function distanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  /* ---------- RUTA INTERPOLADA ---------- */
  function generarRutaInterpolada(origen, destino, pasos = 150) {
    const puntos = [];
    for (let i = 0; i <= pasos; i++) {
      const t = i / pasos;
      puntos.push([
        origen.lat + (destino.lat - origen.lat) * t,
        origen.lng + (destino.lng - origen.lng) * t
      ]);
    }
    return puntos;
  }

  /* ---------- ACTUALIZAR RUTA ---------- */
  function actualizarRutaConUsuario(lat, lng) {
    if (!routeLine || routePoints.length === 0) return;

    let closestIndex = 0;
    let minDist = Infinity;

    routePoints.forEach((p, i) => {
      const d = distanceMeters(lat, lng, p[0], p[1]);
      if (d < minDist) {
        minDist = d;
        closestIndex = i;
      }
    });

    routePoints = routePoints.slice(closestIndex);
    routeLine.setLatLngs(routePoints);
  }

  let watchId = null;
  if ("geolocation" in navigator) {
    watchId = navigator.geolocation.watchPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        userMarker.setLatLng([latitude, longitude]);
        actualizarRutaConUsuario(latitude, longitude);
      },
      err => console.error("GPS error:", err),
      { enableHighAccuracy: true }
    );
  }

  /* ---------- RUTA GPS → DESTINO ---------- */
  function dibujarRutaDesdeGps(destino) {
    if (!destino) return;

    const userLatLng = userMarker.getLatLng();
    if (!userLatLng) return;

    routePoints = generarRutaInterpolada(
      userLatLng,
      { lat: destino.lat, lng: destino.lng },
      150
    );

    if (routeLine) routeLine.remove();

    routeLine = L.polyline(routePoints, {
      color: "#000",
      weight: 4,
      dashArray: "8 6"
    }).addTo(map);

    map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });
  }

  /* ---------- CIRCUITOS ---------- */
  const circuitosLayer = L.layerGroup().addTo(map);

  function dibujarCircuito(circuito) {
    circuitosLayer.clearLayers();
    if (!circuito) return;

    const puntos = circuito.getPuntos(DESTINOS).map(p => [p.lat, p.lng]);
    L.polyline(puntos, { color: circuito.color, weight: 5 })
      .addTo(circuitosLayer);

    map.fitBounds(L.latLngBounds(puntos), { padding: [50, 50] });
  }

  /* ---------- CATEGORÍAS ---------- */
  const categoryLayer = L.layerGroup().addTo(map);

  function dibujarPuntos(lista) {
  categoryLayer.clearLayers();
  lista.forEach(p => {
    L.circleMarker([p.lat, p.lng], {
      radius: 8,
      fillColor: p.color,
      color: "#fff",
      weight: 2,
      fillOpacity: 0.9
    })
    .bindPopup(`
      <div style="max-width:200px">
        <strong>${p.name}</strong><br/>
        <small>${p.description ?? ""}</small>
      </div>
    `)
    .addTo(categoryLayer);
  });
}

  /* ---------- CLEANUP ---------- */
  return {
    dibujarCircuito,
    dibujarPuntos,
    toggleMarcadoresBase,
    dibujarRutaDesdeGps,
    cleanup: () => {
      map.remove();
      if (watchId) navigator.geolocation.clearWatch(watchId);
    }
  };
}
