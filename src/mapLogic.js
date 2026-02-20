import L from "leaflet";
import "leaflet-rotate-map";

/* ================= ICONO POR DEFECTO ================= */

const DefaultIcon = L.divIcon({
  html: "📍",
  className: "emoji-marker",
  iconSize: [45, 45],
  iconAnchor: [22, 45],
  popupAnchor: [0, -45]
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

/* ---------------- MAPA ---------------- */
export function startMap(container, initialT, maskOptions = {}) {
  if (!container) return;

  // Opciones de máscara con valores por defecto
  const {
    enabled = true,
    opacity = 0.7,
    color = '#aaaaaa',
  } = maskOptions;

  const map = L.map(container).setView([-0.0025133, -78.4549464], 16);

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    { attribution: "Ciudad Mitad Del Mundo" }
  ).addTo(map);

     /* ---- MÁSCARA (NEBLINA) ---- */
  let maskLayer = null;
  if (enabled) {
    // Tu GeoJSON con puntos y línea
    const MASK_GEOJSON = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -78.45619842943364,
              -0.0009609802142165336
            ],
            "type": "Point"
          },
          "id": 0
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -78.45678744736264,
              -0.001861989586245727
            ],
            "type": "Point"
          },
          "id": 1
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -78.45605907730108,
              -0.002690215677461083
            ],
            "type": "Point"
          },
          "id": 2
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -78.45461225653074,
              -0.004144236995173856
            ],
            "type": "Point"
          },
          "id": 3
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -78.45345335961741,
              -0.004057859585643087
            ],
            "type": "Point"
          },
          "id": 4
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -78.45305133366479,
              -0.0032438512667170016
            ],
            "type": "Point"
          },
          "id": 5
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -78.45299919684001,
              -0.0015707828534345936
            ],
            "type": "Point"
          },
          "id": 6
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              -78.45489226724959,
              -0.0012804953382925532
            ],
            "type": "Point"
          },
          "id": 7
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "coordinates": [
              [
                -78.45679157002252,
                -0.0018459378029831441
              ],
              [
                -78.45637152324308,
                -0.0024088433768696405
              ],
              [
                -78.45604350736448,
                -0.0027040576676569117
              ],
              [
                -78.45556460418155,
                -0.0028615052885641035
              ],
              [
                -78.45494966228148,
                -0.003432597058548481
              ],
              [
                -78.4546085257673,
                -0.004127990719680952
              ],
              [
                -78.45446306805397,
                -0.004385155274690078
              ],
              [
                -78.45342653787715,
                -0.004057139396550724
              ],
              [
                -78.45304844893724,
                -0.003241724006699087
              ],
              [
                -78.45297877995405,
                -0.001543425430227785
              ],
              [
                -78.45491219927924,
                -0.00127788736158152
              ],
              [
                -78.45620853235324,
                -0.0009425192923373515
              ],
              [
                -78.45679495750062,
                -0.00178707925299193
              ]
            ],
            "type": "LineString"
          }
        }
      ]
    };

    // Extraemos los puntos de la línea (son los que forman el perímetro)
    let polygonPoints = [];
    
    // Buscar el feature que es LineString (el último)
    MASK_GEOJSON.features.forEach(feature => {
      if (feature.geometry.type === 'LineString') {
        // Los puntos de la línea ya están en orden
        polygonPoints = feature.geometry.coordinates.map(coord => [coord[1], coord[0]]); // Leaflet usa [lat, lng]
      }
    });
    
    // Si no hay línea, intentamos con los puntos individuales (pero estarían desordenados)
    if (polygonPoints.length === 0) {
      console.warn('No se encontró un LineString en el GeoJSON');
      // Como fallback, usamos un círculo
      const centro = [-0.0025133, -78.4549464];
      polygonPoints = generarCirculo(centro, 190);
    }
    
    // Asegurarnos de que el polígono esté cerrado (primer punto = último punto)
    if (polygonPoints.length > 0) {
      const first = polygonPoints[0];
      const last = polygonPoints[polygonPoints.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        polygonPoints.push(first);
      }
    }
    
    // Polígono exterior que cubre todo el mundo (un rectángulo enorme)
    const exterior = [
      [-90, -180],
      [90, -180],
      [90, 180],
      [-90, 180],
      [-90, -180]
    ];
    
    // Creamos el polígono con agujero: exterior + el polígono personalizado como agujero
    maskLayer = L.polygon([exterior, polygonPoints], {
      color: 'none',
      fillColor: color,
      fillOpacity: opacity,
      interactive: false,
    }).addTo(map);
    
    maskLayer.bringToBack();
    
    // Opcional: dibujar el perímetro para verificar (solo para debug)
    // L.polyline(polygonPoints, { color: 'red', weight: 2 }).addTo(map);
  }

  /* ---------- MARCADORES BASE ---------- */
  const baseLayer = L.layerGroup().addTo(map);
  const marcadoresBase = {};

  function crearPopupBase(d, t) {
    const nombre = t ? t(`destinos.${d.id}`, d.nombre) : d.nombre;
    return `
      <div style="text-align:center; max-width:180px">
        <h4>${nombre}</h4>
        ${d.imagen ? `<img src="${d.imagen}" style="width:100%; border-radius:8px" />` : ""}
      </div>
    `;
  }

  DESTINOS.forEach(d => {
    const marker = L.marker([d.lat, d.lng])
      .bindPopup(crearPopupBase(d, initialT))
      .addTo(baseLayer);

    marcadoresBase[d.id] = marker;
  });

  function toggleMarcadoresBase(mostrar) {
    mostrar ? baseLayer.addTo(map) : map.removeLayer(baseLayer);
  }

  function actualizarIdiomaBase(nuevoT) {
    Object.entries(marcadoresBase).forEach(([id, marker]) => {
      const destino = DESTINOS.find(d => d.id === Number(id));
      if (destino) {
        marker.setPopupContent(crearPopupBase(destino, nuevoT));
      }
    });
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

  const circuitosLayer = L.layerGroup().addTo(map);

  function dibujarCircuito(circuito) {
    circuitosLayer.clearLayers();
    if (!circuito) return;

    const puntos = circuito.getPuntos(DESTINOS).map(p => [p.lat, p.lng]);
    L.polyline(puntos, { color: circuito.color, weight: 5 })
      .addTo(circuitosLayer);

    map.fitBounds(L.latLngBounds(puntos), { padding: [50, 50] });
  }

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

  /* ---------- CORRECCIÓN DE ROTACIÓN ---------- */
  function rotarMapa(grados) {
    // Leemos el bearing actual de las opciones de Leaflet (o 0 si no existe)
    const currentBearing = map.options.bearing || 0;
    const nuevoBearing = currentBearing + grados;
    
    // Aplicamos la rotación
    map.setBearing(nuevoBearing);
    
    // Guardamos el nuevo valor para la próxima vez que se presione el botón
    map.options.bearing = nuevoBearing % 360; 
  }

  function resetearNorte() {
    map.setBearing(0);
    map.options.bearing = 0;
  }
  /* -------------------------------------------- */

  return {
    dibujarCircuito,
    dibujarPuntos,
    toggleMarcadoresBase,
    dibujarRutaDesdeGps,
    rotarMapa,
    resetearNorte,
    actualizarIdiomaBase,
    // Devolvemos el bearing desde las opciones actualizadas
    getBearing: () => map.options.bearing || 0,
    cleanup: () => {
      map.remove();
      if (watchId) navigator.geolocation.clearWatch(watchId);
    }
  };
}