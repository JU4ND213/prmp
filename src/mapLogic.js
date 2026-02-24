import L from "leaflet";


/* ================= ICONO POR DEFECTO ================= */

const DefaultIcon = L.divIcon({
  html: "📍",
  className: "emoji-marker",
  iconSize: [25, 25],
  iconAnchor: [12.5, 25],
  popupAnchor: [0, -25]
});

L.Marker.prototype.options.icon = DefaultIcon;

/* ================= DATOS ================= */

export const DESTINOS = [
  { id: 7, nombre: "Punto 7 Monumento", imagen: "/images/Mitad_del_Mundo_01.png", lat: -0.0021191507224225577, lng: -78.45583279786655 },
  { id: 1, nombre: "Punto 1 Viviendas", imagen: "/images/Viviendas.png", lat: -0.0026339, lng: -78.4536447 },
  { id: 2, nombre: "Punto 2 Museo Fiestas", imagen: "/images/Museo Fiestas.png", lat: -0.00254709, lng: -78.45416508 },
  { id: 3, nombre: "Punto 3 Tiangues", imagen: "/images/Tiangues.png", lat: -0.002419977392211793,  lng: -78.45455274302334 },
  { id: 4, nombre: "Punto 4 Capilla", imagen: "/images/Iglesia.png", lat: -0.00217993, lng: -78.45443815 },
  { id: 5, nombre: "Punto 5 Museo Cerveza", imagen: "/images/Museo Cerveza.png", lat: -0.00172532, lng: -78.45456769 },
  { id: 6, nombre: "Punto 6 Museo Cacao", imagen: "/images/Muiseo cacao.png", lat: -0.0015001643185256258,  lng: -78.45516180961549 },
  { id: 8, nombre: "Punto 8 Tienda Pichincha", imagen: "/images/Tienda pichincha.png", lat: -0.0019201542192408055,  lng: -78.45507887340779 },
  { id: 9, nombre: "Punto 9 Exp. Huevo", imagen: "/images/Exp Huevo.png", lat: -0.002128299975813348,  lng: -78.45500898876774 },
  { id: 10, nombre: "Punto 10 Legado Virtual", imagen: "/images/Legado Virtual.png", lat: -0.0027321406845731214,  lng: -78.45531831507765 },
  { id: 11, nombre: "Punto 11 Pab. Ecuador", imagen: "/images/PabellonEcu.png", lat: -0.00295948, lng: -78.45520276 },
  { id: 12, nombre: "Punto 12 Planetario", imagen: "/images/Planetario.png", lat: -0.00287231, lng: -78.45505122 },
  { id: 13, nombre: "Punto 13 Pab. Francia", imagen: "/images/PabellonFrancia.png", lat: -0.00308018, lng: -78.45503877 },
  { id: 14, nombre: "Punto 14 Pab. Guayasamín", imagen: "/images/Pabellon Guayasamin.png", lat: -0.0030547, lng: -78.45482457 },
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

  const map = L.map(container, {
  maxZoom: 20,
  zoomSnap: 0.5,
  zoomDelta: 0.5
}).setView([-0.0025133, -78.4549464], 16);
 
  L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 20,        // hasta donde permites zoom
    maxNativeZoom: 19,  // hasta donde ArcGIS TIENE DATOS
    attribution: "Ciudad Mitad Del Mundo"
  }
).addTo(map);

map.setMaxZoom(20);
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
          -78.45626921980826,
          -0.0009701889351276805
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
          -78.4573014341726,
          -0.001968682639699182
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
          -78.45669215143164,
          -0.00192806379024546
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
          -78.45622097277798,
          -0.002594212919817096
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
          -78.45481556058816,
          -0.003715293162244393
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
          -78.457366424332,
          -0.0011563056515342396
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
          -78.45542484332954,
          -0.0012375433496600863
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
          -78.45490492205657,
          -0.0013269048189243904
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
          -78.45362136641481,
          -0.001359399898191782
        ],
        "type": "Point"
      },
      "id": 8
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.4529958361338,
          -0.00140814251793131
        ],
        "type": "Point"
      },
      "id": 9
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.45297958859416,
          -0.0022286432754157204
        ],
        "type": "Point"
      },
      "id": 10
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.45300395990361,
          -0.0028298022463815187
        ],
        "type": "Point"
      },
      "id": 11
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.45298771236398,
          -0.0030897628827375456
        ],
        "type": "Point"
      },
      "id": 12
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.45300395990361,
          -0.0036178079237885186
        ],
        "type": "Point"
      },
      "id": 13
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.45328016807997,
          -0.004088986576391562
        ],
        "type": "Point"
      },
      "id": 14
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.45373509919355,
          -0.003829025940248698
        ],
        "type": "Point"
      },
      "id": 15
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.45418190653689,
          -0.0036178079237885186
        ],
        "type": "Point"
      },
      "id": 16
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          -78.4546043425712,
          -0.004170224275128476
        ],
        "type": "Point"
      },
      "id": 17
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [
            -78.45735017679192,
            -0.0011238105713999857
          ],
          [
            -78.45750452841975,
            -0.001538122835768263
          ],
          [
            -78.45728518663297,
            -0.001911816250625975
          ],
          [
            -78.45683025551939,
            -0.0018874449407633165
          ],
          [
            -78.45670027520148,
            -0.00192806379024546
          ],
          [
            -78.45651342849398,
            -0.0021555293467088177
          ],
          [
            -78.45631845801665,
            -0.002504851451504919
          ],
          [
            -78.45600975476106,
            -0.0027404407780977635
          ],
          [
            -78.45561981380641,
            -0.0027973071671425487
          ],
          [
            -78.45505927368437,
            -0.0033740948280183147
          ],
          [
            -78.45479931304811,
            -0.0037477882423218034
          ],
          [
            -78.45462059011084,
            -0.004145852965379504
          ],
          [
            -78.45414128768736,
            -0.003609684154426418
          ],
          [
            -78.45369448034403,
            -0.003837149710449239
          ],
          [
            -78.45327204430971,
            -0.004080862806134178
          ],
          [
            -78.45302020744369,
            -0.0036259316939890596
          ],
          [
            -78.45302833121349,
            -0.0030491440333122455
          ],
          [
            -78.45301426295887,
            -0.00274930990684652
          ],
          [
            -78.45299265313656,
            -0.002199501418047589
          ],
          [
            -78.45297839862141,
            -0.0013727395483584814
          ],
          [
            -78.45362935480637,
            -0.001339479013367395
          ],
          [
            -78.45489716614796,
            -0.0012995494063261503
          ],
          [
            -78.45542884403778,
            -0.0012272412132432464
          ],
          [
            -78.45626251496955,
            -0.0009252481722370476
          ],
          [
            -78.45661554908851,
            -0.0011889604056705139
          ],
          [
            -78.45678993943656,
            -0.001180453559044281
          ],
          [
            -78.45706432681702,
            -0.0009634446093684801
          ],
          [
            -78.45720043635663,
            -0.0009634446093684801
          ],
          [
            -78.45736631985848,
            -0.001120821264123606
          ]
        ],
        "type": "LineString"
      }
    }
  ]
}

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


  return {
    dibujarCircuito,
    dibujarPuntos,
    toggleMarcadoresBase,
    dibujarRutaDesdeGps,
    actualizarIdiomaBase,
    // Devolvemos el bearing desde las opciones actualizadas
    getBearing: () => map.options.bearing || 0,
    cleanup: () => {
      map.remove();
      if (watchId) navigator.geolocation.clearWatch(watchId);
    }
  };
}