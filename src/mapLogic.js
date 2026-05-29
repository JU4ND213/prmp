import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Geolocation } from "@capacitor/geolocation";
import { RUTAS_CAMINABLES } from "./constants/rutasCaminables";
import { Capacitor } from "@capacitor/core";

function imgs(folder, files) {
  return files.map(file => `/images/${folder}/${file}`);
}

/* ================= DATOS ================= */
export const DESTINOS = [
  { 
    id: 7,
    nombre: "Monumento",
    imagenes: imgs("15.MONUMENRO E INTERIOR", [
      "Mitad_del_Mundo_01.png",
      "IMG_9046.png",
      "IMG_9085.png",
      "IMG_9087.png",
    ]),
    lat: -0.0021191507224225577,
    lng: -78.45583279786655
  },
  { 
    id: 1,
    nombre: "Viviendas",
    imagenes: imgs("13.VIVI.ANCESTRALES", [
      "Viviendas.png",
      "IMG_8852.png",
      "IMG_8854.png",
      "IMG_8856.png",
      "IMG_8857.png",
      "IMG_8861.png",
      "IMG_8862.png",
      "IMG_8865.png",
      "IMG_8867.png",
      "IMG_8871.png",
    ]),
    lat: -0.0026339,
    lng: -78.4536447
  },
  { 
    id: 2,
    nombre: "BALBANERA",
    imagenes: imgs("5.CAP.BALBANERA", [
      "IMG_8763.png",
      "IMG_8767.png",
    ]),
    lat: -0.0027890538128072626,
    lng: -78.45448036946725
  },
  { 
    id: 3,
    nombre: "Tiangues",
    imagenes: imgs("4.TIANGUES", [
      "IMG_8739.png",
      "IMG_8742.png",
      "IMG_8743.png",
      "IMG_8744.png",
      "IMG_8745.png",
      "IMG_8746.png",
      "IMG_8747.png",
      "IMG_8756.png",
      "IMG_8757.png",
      "IMG_8758.png",
      "IMG_8759.png",
    ]),
    lat: -0.002419977392211793,
    lng: -78.45455274302334
  },
  { 
    id: 4,
    nombre: "ZONA LLAMAS",
    imagenes: imgs("6.ZONA DE LLAMAS", [
      "IMG_8768.png",
      "IMG_8769.png",
      "IMG_8770.png",
      "IMG_8771.png",
      "IMG_8772.png",
      "IMG_8773.png",
      "IMG_8774.png",
      "IMG_8775.png",
      "IMG_8776.png",
      "IMG_8777.png",
    ]),
    lat: -0.0016606417341177837,
    lng: -78.4564242259298
  },
  { 
    id: 5,
    nombre: "Museo Cerveza",
    imagenes: imgs("14.MUSEO CERVEZA", [
      "IMG_8872.png",
      "IMG_8873.png",
      "IMG_8874.png",
      "IMG_8875.png",
      "IMG_8876.png",
      "IMG_8877.png",
      "IMG_8878.png",
      "IMG_8879.png",
      "IMG_8880.png",
      "IMG_8881.png",
      "IMG_8882.png",
      "IMG_8883.png",
      "IMG_8884.png",
      "IMG_8885.png",
      "IMG_8886.png",
      "IMG_8887.png",
      "IMG_8888.png",
      "IMG_8889.png",
      "Museo Cerveza.png",
    ]),
    lat: -0.00172532,
    lng: -78.45456769
  },
  { 
    id: 6,
    nombre: "Museo Cacao",
    imagenes: imgs("1.MUSEO CHOCOLATE", [
      "IMG_8713.png",
      "IMG_8714.png",
      "IMG_8715.png",
      "IMG_8716.png",
      "IMG_8717.png",
      "IMG_8718.png",
      "IMG_8719.png",
      "IMG_8720.png",
      "IMG_8721.png",
      "Muiseo cacao.png",
    ]),
    lat: -0.0016318614649577512,
    lng: -78.45513804232704
  },
  { 
    id: 8,
    nombre: "Tienda Pichincha",
    imagenes: imgs("2.TIENDA PICHINCHA", [
      "IMG_8722.png",
      "IMG_8723.png",
      "IMG_8724.png",
      "IMG_8725.png",
      "IMG_8726.png",
      "Tienda pichincha.png",
    ]),
    lat: -0.0019201542192408055,
    lng: -78.45507887340779
  },
  { 
    id: 9,
    nombre: "Exp. Huevo",
    imagenes: imgs("3.EXPE.HUEVO", [
      "Exp Huevo.png",
      "IMG_8728.png",
      "IMG_8729.png",
      "IMG_8730.png",
      "IMG_8731.png",
      "IMG_8732.png",
      "IMG_8733.png",
      "IMG_8735.png",
      "IMG_8736.png",
    ]),
    lat: -0.002128299975813348,
    lng: -78.45500898876774
  },
  { 
    id: 10,
    nombre: "Legado Virtual",
    imagenes: imgs("7.LEGADO VIERTUAL", [
      "IMG_8778.png",
      "IMG_8781.png",
      "IMG_8783.png",
      "IMG_8791.png",
      "Legado Virtual.png",
    ]),
    lat: -0.0027321406845731214,
    lng: -78.45531831507765
  },
  { 
    id: 11,
    nombre: "Pab. Ecuador",
    imagenes: imgs("8.PABELLON ECUADOR", [
      "IMG_8801.png",
      "IMG_8802.png",
      "IMG_8803.png",
      "IMG_8804.png",
      "IMG_8805.png",
      "IMG_8806.png",
      "IMG_8807.png",
      "IMG_8808.png",
      "IMG_8809.png",
      "IMG_8810.png",
      "IMG_8811.png",
      "IMG_8812.png",
    ]),
    lat: -0.00295948,
    lng: -78.45520276
  },
  { 
    id: 12,
    nombre: "Planetario",
    imagenes: imgs("11.PLANETARIO", [
      "20260413_211934886_iOS 1.png",
      "20260413_211951202_iOS 1.png",
      "20260413_212237656_iOS.png",
      "20260413_212249254_iOS.png",
      "20260413_212658167_iOS.png",
      "IMG_8835.png",
      "IMG_8840.png",
      "IMG_8842.png",
      "Planetario.png",
    ]),
    lat: -0.00287231,
    lng: -78.45505122
  },
  { 
    id: 13,
    nombre: "Pab. Francia",
    imagenes: imgs("9.PABELLON FRANCIA", [
      "IMG_8813.png",
      "IMG_8815.png",
      "IMG_8816.png",
      "IMG_8817.png",
      "IMG_8818.png",
      "IMG_8819.png",
      "IMG_8820.png",
      "IMG_8821.png",
      "IMG_8822.png",
      "IMG_8823.png",
      "IMG_8824.png",
    ]),
    lat: -0.00308018,
    lng: -78.45503877
  },
  { 
    id: 14,
    nombre: "Pab. Guayasamín",
    imagenes: imgs("10.PAVELLON GUAYASAMIN", [
      "IMG_8825.png",
      "IMG_8827.png",
      "IMG_8828.png",
      "IMG_8829.png",
      "IMG_8830.png",
      "IMG_8831.png",
      "IMG_8832.png",
      "IMG_8833.png",
      "IMG_8834.png",
    ]),
    lat: -0.0030547,
    lng: -78.45482457
  },
  { 
    id: 15,
    nombre: "Av. Geodésicos",
    imagenes: imgs("12.AV.GEODESICOS", [
      "Av. Geodésicos.png",
      "IMG_8843.png",
      "IMG_8844.png",
      "IMG_8845.png",
      "IMG_8846.png",
      "IMG_8847.png",
      "IMG_8848.png",
    ]),
    lat: -0.0031959,
    lng: -78.45422637
  },
  { 
    id: 17,
    nombre: "Capilla",
    imagenes: imgs("17.CAPILLA", [
      "CAPILLA.png",
    ]),
    lat: -0.002182081172006663,
    lng: -78.45446572853807
  },
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
  PACHA: new Circuito([1, 2, 3, 17, 5, 6, 7], "#2b6cff"),
  INTI: new Circuito([1, 2, 5, 6, 8, 9, 7, 10, 11, 12, 13, 14], "#2ecc71"),
  KILLA: new Circuito([15, 14, 13, 12, 11, 10, 7], "#f39c12")
};

/* ================= UTILIDADES ================= */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ================= MOTOR DE ENRUTAMIENTO ================= */
const precision = 4;
const toKey = (lng, lat) => `${lng.toFixed(precision)},${lat.toFixed(precision)}`;

function construirGrafo(geojson) {
  const grafo = {};

  if (!geojson || !geojson.features) {
    console.error("El GeoJSON de rutas no es válido o está vacío.");
    return grafo;
  }

  const soloRutas = geojson.features.filter(feature => feature.geometry.type === "LineString");

  soloRutas.forEach((feature, index) => {
    const coords = feature.geometry.coordinates;

    for (let i = 0; i < coords.length - 1; i++) {
      const lng1 = coords[i][0];
      const lat1 = coords[i][1];
      const lng2 = coords[i+1][0];
      const lat2 = coords[i+1][1];

      if (typeof lng1 !== 'number' || typeof lat1 !== 'number' || 
          typeof lng2 !== 'number' || typeof lat2 !== 'number') {
        console.warn(`Coordenadas inválidas encontradas en la ruta ${index}`);
        continue;
      }

      const p1 = toKey(lng1, lat1);
      const p2 = toKey(lng2, lat2);
      const dist = calculateDistance(lat1, lng1, lat2, lng2); 

      if (!grafo[p1]) grafo[p1] = { coord: [lng1, lat1], vecinos: {} };
      if (!grafo[p2]) grafo[p2] = { coord: [lng2, lat2], vecinos: {} };

      grafo[p1].vecinos[p2] = dist;
      grafo[p2].vecinos[p1] = dist;
    }
  });

  return grafo;
}

const grafoCaminos = construirGrafo(RUTAS_CAMINABLES);

function encontrarNodoMasCercano(lat, lng) {
  let nodoMasCercano = null;
  let distMinima = Infinity;
  for (let key in grafoCaminos) {
    const [nLng, nLat] = grafoCaminos[key].coord;
    const d = calculateDistance(lat, lng, nLat, nLng); // Actualizado aquí
    if (d < distMinima) {
      distMinima = d;
      nodoMasCercano = key;
    }
  }
  return nodoMasCercano;
}

function encontrarRutaMasCorta(inicioKey, finKey) {
  const distancias = {};
  const previos = {};
  const noVisitados = new Set(Object.keys(grafoCaminos));

  for (let nodo in grafoCaminos) distancias[nodo] = Infinity;
  distancias[inicioKey] = 0;

  while (noVisitados.size > 0) {
    let nodoActual = null;
    let distMinima = Infinity;
    for (let nodo of noVisitados) {
      if (distancias[nodo] < distMinima) {
        distMinima = distancias[nodo];
        nodoActual = nodo;
      }
    }
    if (nodoActual === null || nodoActual === finKey) break;
    noVisitados.delete(nodoActual);

    for (let vecino in grafoCaminos[nodoActual].vecinos) {
      const nuevaDistancia = distancias[nodoActual] + grafoCaminos[nodoActual].vecinos[vecino];
      if (nuevaDistancia < distancias[vecino]) {
        distancias[vecino] = nuevaDistancia;
        previos[vecino] = nodoActual;
      }
    }
  }

  const ruta = [];
  let u = finKey;
  if (distancias[u] !== Infinity || u === inicioKey) {
    while (u) {
      ruta.unshift(grafoCaminos[u].coord);
      u = previos[u];
    }
  }
  return ruta;
}

/* ---------------- MAPA ---------------- */
export function startMap(container, maskOptions = {}, onMarkerClickReact) {
  if (!container) return;

  const {
    enabled = true,
    opacity = 0.7,
    color = '#aaaaaa',
  } = maskOptions;

  const map = new maplibregl.Map({
    container: container,
    center: [-78.454012, -0.003140],
    zoom: 17.9,
    
    
    minZoom: 15, 
    maxZoom: 20,

    maxBounds: [
      [-78.45828782728766, -0.004058080652012074] ,
      [-78.4519053008872,  -0.0015405158945393312]  
    ],
    
    pitch: 50,
    style: {
      version: 8,
      sources: {
        satellite: {
          type: "raster",
          tiles: [
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          ],
          tileSize: 256,
          maxzoom: 19
        }
      },
      layers: [
        { id: "satellite", type: "raster", source: "satellite" }
      ]
    }
  });

  let marcadoresCategorias = [];

  const userEl = document.createElement("div");
  userEl.style.width = "85px";
  userEl.style.height = "250px";
  userEl.style.backgroundImage = "url('/images/Sin_título-removebg-preview.png')";
  userEl.style.backgroundSize = "contain";
  userEl.style.backgroundRepeat = "no-repeat";
  userEl.style.backgroundPosition = "center";
  userEl.style.backgroundColor = "transparent";
  userEl.style.display = "none";

  let userMarker = new maplibregl.Marker({ element: userEl })
    .setLngLat([-78.454012, -0.003140])
    .addTo(map);

  map.on("load", () => {
    /* ---- MÁSCARA (NEBLINA) ---- */
    if (enabled) {
      const polygonHole = [
        [-78.45735017679192, -0.0011238105713999857], [-78.45750452841975, -0.001538122835768263],
        [-78.45728518663297, -0.001911816250625975], [-78.45683025551939, -0.0018874449407633165],
        [-78.45670027520148, -0.00192806379024546], [-78.45651342849398, -0.0021555293467088177],
        [-78.45631845801665, -0.002504851451504919], [-78.45600975476106, -0.0027404407780977635],
        [-78.45561981380641, -0.0027973071671425487], [-78.45505927368437, -0.0033740948280183147],
        [-78.45479931304811, -0.0037477882423218034], [-78.45462059011084, -0.004145852965379504],
        [-78.45414128768736, -0.003609684154426418], [-78.45369448034403, -0.003837149710449239],
        [-78.45327204430971, -0.004080862806134178], [-78.45302020744369, -0.0036259316939890596],
        [-78.45302833121349, -0.0030491440333122455], [-78.45301426295887, -0.00274930990684652],
        [-78.45299265313656, -0.002199501418047589], [-78.45297839862141, -0.0013727395483584814],
        [-78.45362935480637, -0.001339479013367395], [-78.45489716614796, -0.0012995494063261503],
        [-78.45542884403778, -0.0012272412132432464], [-78.45626251496955, -0.0009252481722370476],
        [-78.45661554908851, -0.0011889604056705139], [-78.45678993943656, -0.001180453559044281],
        [-78.45706432681702, -0.0009634446093684801], [-78.45720043635663, -0.0009634446093684801],
        [-78.45736631985848, -0.001120821264123606], [-78.45735017679192, -0.0011238105713999857]
      ];

      const exteriorWorld = [
        [-180, -90], [180, -90], [180, 90], [-180, 90], [-180, -90]
      ];

      map.addSource("mask", {
        type: "geojson",
        tolerance: 0,
        lineMetrics: false,
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [exteriorWorld, polygonHole]
          }
        }
      });

      map.addLayer({
        id: "mask-layer",
        type: "fill",
        source: "mask",
        paint: {
          "fill-color": color,
          "fill-opacity": opacity,
          "fill-antialias": false
        }
      });
    }

    /* ---- PREPARACIÓN PARA RUTAS ---- */
    map.addSource("circuito-source", {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] }
    });

    map.addLayer({
      id: "circuito-layer",
      type: "line",
      source: "circuito-source",
      layout: { "line-join": "round", "line-cap": "round" },
      paint: { "line-color": ["get", "color"], "line-width": 5 }
    });

    map.addSource("gps-route-source", {
      type: "geojson",
      data: { type: "Feature", geometry: { type: "LineString", coordinates: [] } }
    });

    map.addLayer({
      id: "gps-route-layer",
      type: "line",
      source: "gps-route-source",
      layout: { "line-join": "round", "line-cap": "round" },
      paint: { "line-color": "#2200fe", "line-width": 8 }
    });

    iniciarGPS();
  });

  /* ---------- GPS CON CAPACITOR ----------- */
  let watchId = null;
  let primeraVez = true;
  let ultimoTiempoCalculo = 0;

  async function iniciarGPS() {
    try {
      if (Capacitor.isNativePlatform()) {
        const status = await Geolocation.checkPermissions();
        if (status.location !== 'granted') {
          const request = await Geolocation.requestPermissions();
          if (request.location !== 'granted') {
            console.error("El usuario denegó los permisos en el móvil");
            return;
          }
        }
      }

      watchId = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000
        },
        (position, err) => {
          if (err) {
            console.warn("Error GPS Capacitor:", err);
            return;
          }
          if (!position || !position.coords) return;

          const { latitude: lat, longitude: lng } = position.coords;

          userMarker.setLngLat([lng, lat]);
          userEl.style.display = "block";

          if (primeraVez) {
            map.flyTo({
              center: [lng, lat],
              zoom: 17,
              essential: true,
              pitch: 50
            });
            primeraVez = false;
          }

          const ahora = Date.now();
          if (ahora - ultimoTiempoCalculo > 3000) {
            actualizarRutaConUsuario(lat, lng);
            ultimoTiempoCalculo = ahora;
          }
        }
      );
    } catch (error) {
      console.error("No se pudo iniciar el GPS", error);
    }
  }

  /* ---------- FUNCIONES INTERNAS RUTAS ---------- */
  let routePointsMap = [];

  function actualizarRutaConUsuario(lat, lng) {
    if (routePointsMap.length === 0) return;

    let closestIndex = 0;
    let minDist = Infinity;

    routePointsMap.forEach((p, i) => {
      const d = calculateDistance(lat, lng, p[1], p[0]); // Actualizado aquí
      if (d < minDist) {
        minDist = d;
        closestIndex = i;
      }
    });

    routePointsMap = routePointsMap.slice(closestIndex);
    if (map.getSource("gps-route-source")) {
      map.getSource("gps-route-source").setData({
        type: "Feature",
        geometry: { type: "LineString", coordinates: routePointsMap }
      });
    }
  }

  /* ---------- FUNCIONES EXPUESTAS A REACT ---------- */
  function dibujarRutaDesdeGps(destino) {
    if (!destino || !userMarker || !userMarker.getLngLat()) return;

    const userLngLat = userMarker.getLngLat();

    if (!userLngLat || (userLngLat.lng === 0 && userLngLat.lat === 0)) {
      console.warn("Esperando señal GPS válida...");
      return;
    }

    const nodoInicio = encontrarNodoMasCercano(userLngLat.lat, userLngLat.lng);
    const nodoFin = encontrarNodoMasCercano(destino.lat, destino.lng);

    if (!nodoInicio || !nodoFin) {
      console.warn("No se pudo conectar a la red de caminos.");
      return;
    }

    let rutaCalculada = encontrarRutaMasCorta(nodoInicio, nodoFin);

    if (rutaCalculada.length > 0) {
      rutaCalculada.unshift([userLngLat.lng, userLngLat.lat]);
      rutaCalculada.push([destino.lng, destino.lat]);
    }

    routePointsMap = rutaCalculada;

    if (map.getSource("gps-route-source")) {
      map.getSource("gps-route-source").setData({
        type: "Feature",
        geometry: { type: "LineString", coordinates: routePointsMap }
      });

      const bounds = new maplibregl.LngLatBounds();
      routePointsMap.forEach(coord => bounds.extend(coord));
      map.fitBounds(bounds, { padding: 50 });
    }
  }

  function dibujarCircuito(circuito) {
    if (!map.getSource("circuito-source")) return;

    if (!circuito) {
      map.getSource("circuito-source").setData({ type: "FeatureCollection", features: [] });
      return;
    }

    const puntos = circuito.getPuntos(DESTINOS).map(p => [p.lng, p.lat]);

    map.getSource("circuito-source").setData({
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: { color: circuito.color },
        geometry: { type: "LineString", coordinates: puntos }
      }]
    });

    const bounds = new maplibregl.LngLatBounds();
    puntos.forEach(coord => bounds.extend(coord));
    map.fitBounds(bounds, { padding: 50 });
  }

  function dibujarPuntos(lista, onMarkerClickReact, selectedId) {
    marcadoresCategorias.forEach(marker => marker.remove());
    marcadoresCategorias = [];

    lista.forEach(p => {
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "center";
      container.style.cursor = "pointer";

      const el = document.createElement("div");
      el.style.width = "24px";
      el.style.height = "24px";
      el.style.backgroundColor = p.color;
      el.style.border = "2px solid #fff";
      el.style.borderRadius = "50%";
      el.style.boxShadow = "0 0 4px rgba(0,0,0,0.5)";
      el.style.display = "flex";
      el.style.justifyContent = "center";
      el.style.alignItems = "center";
      el.style.color = "#fff";

      if (p.id === selectedId) {
        el.classList.add("marker-selected");
      }

      if (p.icon) {
        el.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">${p.icon}</span>`;
      }

      container.appendChild(el);

      const textDiv = document.createElement("div");
      textDiv.className = "custom-text-marker";
      textDiv.style.marginTop = "2px";
      textDiv.innerText = p.name;
      container.appendChild(textDiv);

      if (onMarkerClickReact) {
        container.addEventListener("click", (e) => {
          e.stopPropagation();
          onMarkerClickReact(p);
        });
      }

      const marker = new maplibregl.Marker({ element: container })
        .setLngLat([p.lng, p.lat])
        .addTo(map);

      marcadoresCategorias.push(marker);
    });
  }

  function limpiarRutaGps() {
    routePointsMap = [];
    if (map.getSource("gps-route-source")) {
      map.getSource("gps-route-source").setData({
        type: "Feature",
        geometry: { type: "LineString", coordinates: [] }
      });
    }
  }

  function centrarEnUsuario() {
    if (!userMarker) return;

    const userLngLat = userMarker.getLngLat();

    if (!userLngLat || (userLngLat.lng === 0 && userLngLat.lat === 0)) {
      console.warn("Aún no tenemos tu ubicación exacta.");
      return;
    }

    map.flyTo({
      center: [userLngLat.lng, userLngLat.lat],
      zoom: 18,
      pitch: 50,
      essential: true
    });
  }

  /* ========== BRÚJULA ========== */
  let compassActive = false;
  let orientationHandler = null;
  let filteredHeading = null;
  let animationFrame = null;

  let userArrowContainer = userEl;

  const SMOOTHING_FACTOR = 0.2;
  const DEAD_ZONE = 2;

  function normalizeAngle(angle) {
    return ((angle % 360) + 360) % 360;
  }

  function getDeviceHeading(event) {
    if (event.webkitCompassHeading !== undefined) {
      return event.webkitCompassHeading;
    } else {
      const alpha = event.alpha;
      const beta = event.beta;
      const gamma = event.gamma;
      if (alpha === null || beta === null || gamma === null) return null;

      const a = alpha * Math.PI / 180;
      const b = beta * Math.PI / 180;
      const g = gamma * Math.PI / 180;

      let heading = Math.atan2(
        Math.sin(a) * Math.cos(g) + Math.cos(a) * Math.sin(b) * Math.sin(g),
        Math.cos(a) * Math.cos(g) - Math.sin(a) * Math.sin(b) * Math.sin(g)
      ) * 180 / Math.PI;

      if (window.orientation !== undefined) {
        heading += window.orientation;
      }
      heading = normalizeAngle(heading);
      return heading;
    }
  }

  function handleOrientation(event) {
    if (!compassActive) return;

    let heading = getDeviceHeading(event);
    if (heading === null || isNaN(heading)) return;

    let viewHeading = normalizeAngle(heading + 180);

    if (filteredHeading === null) {
      filteredHeading = viewHeading;
      map.setBearing(filteredHeading);
      if (userArrowContainer) {
        userArrowContainer.style.transform = `rotate(${filteredHeading}deg)`;
      }
      return;
    }

    let diff = viewHeading - filteredHeading;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    if (Math.abs(diff) < DEAD_ZONE) return;

    filteredHeading += diff * SMOOTHING_FACTOR;
    filteredHeading = normalizeAngle(filteredHeading);

    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(() => {
      map.setBearing(filteredHeading);
      if (userArrowContainer) {
        userArrowContainer.style.transform = `rotate(${filteredHeading}deg)`;
      }
      animationFrame = null;
    });
  }

  function startCompass() {
    if (!window.DeviceOrientationEvent) {
      console.warn("Este dispositivo no soporta eventos de orientación.");
      return;
    }
    const startListening = () => {
      window.addEventListener('deviceorientation', handleOrientation);
      orientationHandler = handleOrientation;
      compassActive = true;
      filteredHeading = null;
    };
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            startListening();
          } else {
            console.warn("Permiso de orientación denegado");
          }
        })
        .catch(console.error);
    } else {
      startListening();
    }
  }

  function stopCompass() {
    if (orientationHandler) {
      window.removeEventListener('deviceorientation', orientationHandler);
      orientationHandler = null;
    }
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    compassActive = false;
    filteredHeading = null;
  }

  function toggleCompassMode() {
    if (compassActive) {
      stopCompass();
    } else {
      startCompass();
    }
    return compassActive;
  }

  function isCompassActive() {
    return compassActive;
  }

  return {
    dibujarCircuito,
    dibujarPuntos,
    dibujarRutaDesdeGps,
    limpiarRutaGps,
    toggleCompassMode,
    isCompassActive,
    centrarEnUsuario,
    flyTo: (lng, lat) => {
      map.flyTo({
        center: [lng, lat],
        zoom: 18.5,
        pitch: 50,
        speed: 1.2,
        curve: 1.4,
        essential: true
      });
    },
    cleanup: () => {
      stopCompass();
      map.remove();
      if (watchId) {
        Geolocation.clearWatch({ id: watchId }).catch(console.error);
      }
    }
  }
}