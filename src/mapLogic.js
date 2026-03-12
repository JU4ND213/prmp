import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Geolocation } from "@capacitor/geolocation";
import { RUTAS_CAMINABLES } from "./constants/rutasCaminables";
import { Capacitor } from "@capacitor/core";
/* ================= DATOS ================= */
export const DESTINOS = [
  { 
    id: 7, 
    nombre: "Monumento", 
    imagen: "/images/Mitad_del_Mundo_01.png", 
    imagenes: [
      "/images/Mitad_del_Mundo_01.png", 
      "/images/turismo-ecuador.png", 
      "/images/monu.png"
    ],
    lat: -0.0021191507224225577, 
    lng: -78.45583279786655 
  },
  { id: 1, nombre: "Viviendas", imagen: "/images/Viviendas.png", imagenes: [
      "/images/Viviendas.png", 
      "/images/vivendass.png", 
      "/images/vivendassss.png"
    ], lat: -0.0026339, lng: -78.4536447 },
  { id: 2, nombre: "Museo Fiestas", imagen: "/images/Museo Fiestas.png", imagenes: [
      "/images/Museo Fiestas.png", 
      "/images/Mitad_del_Mundo_01.png", 
      "/images/Mitad_del_Mundo_01.png"
    ],lat: -0.00254709, lng: -78.45416508 },
  { id: 3, nombre: "Tiangues", imagen: "/images/Tiangues.png", imagenes: [
      "/images/Tiangues.png", 
      "/images/Mitad_del_Mundo_01.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.002419977392211793,  lng: -78.45455274302334 },
  { id: 4, nombre: "Capilla", imagen: "/images/Iglesia.png", imagenes: [
      "/images/Iglesia.png", 
      "/images/inglees.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.00217993, lng: -78.45443815 },
  { id: 5, nombre: "Museo Cerveza", imagen: "/images/Museo Cerveza.png", imagenes: [
      "/images/Museo Cerveza.png", 
      "/images/cervezzz.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.00172532, lng: -78.45456769 },
  { id: 6, nombre: "Museo Cacao", imagen: "/images/Muiseo cacao.png", imagenes: [
      "/images/Muiseo cacao.png", 
      "/images/museocc.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.0016318614649577512,  lng: -78.45513804232704 },
  { id: 8, nombre: "Tienda Pichincha", imagen: "/images/Tienda pichincha.png", imagenes: [
      "/images/Tienda pichincha.png", 
      "/images/Mitad_del_Mundo_01.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.0019201542192408055,  lng: -78.45507887340779 },
  { id: 9, nombre: "Exp. Huevo", imagen: "/images/Exp Huevo.png", imagenes: [
      "/images/Exp Huevo.png", 
      "/images/Mitad_del_Mundo_01.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.002128299975813348,  lng: -78.45500898876774 },
  { id: 10, nombre: "Legado Virtual", imagen: "/images/Legado Virtual.png", imagenes: [
      "/images/Legado Virtual.png", 
      "/images/Mitad_del_Mundo_01.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.0027321406845731214,  lng: -78.45531831507765 },
  { id: 11, nombre: "Pab. Ecuador", imagen: "/images/PabellonEcu.png", imagenes: [
      "/images/PabellonEcu.png", 
      "/images/Mitad_del_Mundo_01.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.00295948, lng: -78.45520276 },
  { id: 12, nombre: "Planetario", imagen: "/images/Planetario.png", imagenes: [
      "/images/Planetario.png", 
      "/images/planet.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.00287231, lng: -78.45505122 },
  { id: 13, nombre: "Pab. Francia", imagen: "/images/PabellonFrancia.png", imagenes: [
      "/images/PabellonFrancia.png", 
      "/images/Mitad_del_Mundo_01.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.00308018, lng: -78.45503877 },
  { id: 14, nombre: "Pab. Guayasamín", imagen: "/images/Pabellon Guayasamin.png", imagenes: [
      "/images/Pabellon Guayasamin.png", 
      "/images/Mitad_del_Mundo_01.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.0030547, lng: -78.45482457 },
  { id: 15, nombre: "Av. Geodésicos", imagen: "/images/Av. Geodésicos.png", imagenes: [
      "/images/Av. Geodésicos.png", 
      "/images/Mitad_del_Mundo_01.png", 
      "/images/Mitad_del_Mundo_01.png"
    ], lat: -0.0031959, lng: -78.45422637 }
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
/* ================= MOTOR DE ENRUTAMIENTO ================= */
const precision = 4;
const toKey = (lng, lat) => `${lng.toFixed(precision)},${lat.toFixed(precision)}`;

function construirGrafo(geojson) {
  const grafo = {};

  if (!geojson || !geojson.features) {
    console.error("El GeoJSON de rutas no es válido o está vacío.");
    return grafo;
  }

  geojson.features.forEach((feature, index) => {
    // Verificamos que sea un LineString (o lo adaptamos si no lo es)
    if (feature.geometry.type !== "LineString") {
      console.warn(`La feature en el índice ${index} no es un LineString. Tipo actual: ${feature.geometry.type}`);
      return; // Saltamos esta feature y continuamos con la siguiente
    }

    const coords = feature.geometry.coordinates;

    for (let i = 0; i < coords.length - 1; i++) {
      const lng1 = coords[i][0];
      const lat1 = coords[i][1];
      const lng2 = coords[i+1][0];
      const lat2 = coords[i+1][1];

      // Verificación de seguridad: Asegurarnos de que tenemos números válidos
      if (typeof lng1 !== 'number' || typeof lat1 !== 'number' || 
          typeof lng2 !== 'number' || typeof lat2 !== 'number') {
        console.warn(`Coordenadas inválidas encontradas en la feature ${index}`);
        continue;
      }

      const p1 = toKey(lng1, lat1);
      const p2 = toKey(lng2, lat2);
      
      const dist = distanceMetersMotor(lat1, lng1, lat2, lng2); 

      if (!grafo[p1]) grafo[p1] = { coord: [lng1, lat1], vecinos: {} };
      if (!grafo[p2]) grafo[p2] = { coord: [lng2, lat2], vecinos: {} };

      grafo[p1].vecinos[p2] = dist;
      grafo[p2].vecinos[p1] = dist;
    }
  });

  return grafo;
}

// Sacamos distanceMeters temporalmente aquí arriba para que el motor la pueda usar
function distanceMetersMotor(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const grafoCaminos = construirGrafo(RUTAS_CAMINABLES);

function encontrarNodoMasCercano(lat, lng) {
  let nodoMasCercano = null;
  let distMinima = Infinity;
  for (let key in grafoCaminos) {
    const [nLng, nLat] = grafoCaminos[key].coord;
    const d = distanceMetersMotor(lat, lng, nLat, nLng);
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
      let nuevaDistancia = distancias[nodoActual] + grafoCaminos[nodoActual].vecinos[vecino];
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
export function startMap(container, initialT, maskOptions = {}) {
  if (!container) return;

  const {
    enabled = true,
    opacity = 0.7,
    color = '#aaaaaa',
  } = maskOptions;

  // 1. Inicialización de MapLibre
  const map = new maplibregl.Map({
    container: container,
    center: [-78.454012, -0.003140], 
    zoom: 16,
    maxZoom: 19, 
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

  // Contenedores para marcadores
  let marcadoresBase = {};
  let marcadoresCategorias = [];
  
  // MARCADOR GPS IDÉNTICO A LEAFLET: circleMarker({radius:10, color:"#fff", fillColor:"#000"})
  const userEl = document.createElement("div");
  userEl.style.width = "20px";  // radio 10 = diametro 20
  userEl.style.height = "20px";
  userEl.style.backgroundColor = "#000"; // fillColor: "#000"
  userEl.style.border = "3px solid #fff"; // color: "#fff"
  userEl.style.borderRadius = "50%"; // Círculo perfecto
  userEl.style.boxSizing = "border-box";
  userEl.style.display = "none"; // Oculto hasta que haya señal

  // Lo agregamos inmediatamente al mapa para asegurar que MapLibre lo registre
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
          "fill-opacity": opacity
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
    
    // Inicializar marcadores base
    inicializarMarcadoresBase();
    
    // Iniciar el GPS
    iniciarGPS();
  }); 
 /* ---------- GPS CON CAPACITOR ----------- */
  let watchId = null;
  let primeraVez = true;
  // 👉 1. Agregamos esta variable para controlar el tiempo
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
          maximumAge: 0 
        },
        (position, err) => {
          if (err) {
            console.warn("Error GPS Capacitor:", err);
            return;
          }
          if (!position || !position.coords) return;
          
          const { latitude: lat, longitude: lng } = position.coords;

          // 1. El marcador del usuario SIEMPRE se actualiza rápido (es muy ligero)
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
          
          // 👉 2. LA MAGIA: Solo recalculamos la ruta cada 3 segundos (3000 ms)
          const ahora = Date.now();
          if (ahora - ultimoTiempoCalculo > 3000) {
            actualizarRutaConUsuario(lat, lng);
            verificarProximidad(lat, lng);   
            ultimoTiempoCalculo = ahora; // Actualizamos el cronómetro
          }
        }
      );
    } catch (error) {
      console.error("No se pudo iniciar el GPS", error);
    }
  }

  /* ---------- MARCADORES BASE ---------- */
  function crearPopupBase(d, t) {
    const nombre = t ? t(`destinos.${d.id}`, d.nombre) : d.nombre;
    
    let imagesHtml = "";
    if (d.imagenes && d.imagenes.length > 0) {
      const imgTags = d.imagenes.map(img => `<img src="${img}" alt="${nombre}" />`).join('');
      imagesHtml = `
        <div class="popup-carousel">
          ${imgTags}
        </div>
        ${d.imagenes.length > 1 ? '<small style="color: #888; font-size: 10px; display: block; margin-top: 4px;">Desliza para ver más ↔</small>' : ''}
      `;
    } else if (d.imagen) {
      imagesHtml = `<img src="${d.imagen}" style="width:100%; border-radius:8px" />`;
    }

    return `
      <div style="text-align:center; max-width: 200px; font-family: sans-serif;"> 
        <h4 style="margin-bottom: 8px; margin-top: 0;">${nombre}</h4>
        ${imagesHtml}
      </div>
    `;
  }

  /* ---------- MARCADORES BASE ---------- */
  function inicializarMarcadoresBase() {
    DESTINOS.forEach(d => {
      const el = document.createElement("div");
      
      // 👇 AQUÍ REEMPLAZAMOS EL EMOJI POR EL ÍCONO DE GOOGLE FONTS
      // Le puse color rojo (#ea4335) y una sombrita para que parezca un pin real
      el.innerHTML = '<span class="material-symbols-outlined" style="color: #ea4335; font-size: 32px; text-shadow: 0px 2px 4px rgba(0,0,0,0.5);">location_on</span>';
      el.style.cursor = "pointer";

      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(crearPopupBase(d, initialT));
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([d.lng, d.lat])
        .setPopup(popup)
        .addTo(map);

      marcadoresBase[d.id] = marker;
    });
  }
  
  function toggleMarcadoresBase(mostrar) {
    Object.values(marcadoresBase).forEach(marker => {
      const el = marker.getElement();
      if (el) {
        el.style.display = mostrar ? "block" : "none";
      }
    });
  }

  function actualizarIdiomaBase(nuevoT) {
    Object.entries(marcadoresBase).forEach(([id, marker]) => {
      const destino = DESTINOS.find(d => d.id === Number(id));
      if (destino) {
        marker.getPopup().setHTML(crearPopupBase(destino, nuevoT));
      }
    });
  }

  /* ---------- FUNCIONES INTERNAS RUTAS ---------- */
  function distanceMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  

  let routePointsMap = [];

  function actualizarRutaConUsuario(lat, lng) {
    if (routePointsMap.length === 0) return;

    let closestIndex = 0;
    let minDist = Infinity;

    routePointsMap.forEach((p, i) => {
      const d = distanceMeters(lat, lng, p[1], p[0]);
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

  function dibujarPuntos(lista, onMarkerClick,selectedId) {
    marcadoresCategorias.forEach(marker => marker.remove());
    marcadoresCategorias = [];

    lista.forEach(p => {
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
      el.style.cursor = "pointer";

      // ✅ RESALTAR SI ES EL SELECCIONADO
    if (p.id === selectedId) {
      el.classList.add("marker-selected");
    }
      
      if (p.icon) {
        el.innerHTML = `<span class="material-symbols-outlined" style="font-size: 16px;">${p.icon}</span>`;
      }
      if (onMarkerClick) {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onMarkerClick(p);
        });
      }
      const popup = new maplibregl.Popup({ offset: 15 }).setHTML(`
        <div style="max-width:200px; font-family: sans-serif;">
          <strong>${p.name}</strong><br/>
          <small>${p.description ?? ""}</small>
        </div>
      `);

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([p.lng, p.lat])
        .setPopup(popup)
        .addTo(map);

      marcadoresCategorias.push(marker);
    });
  }
  /* ---------- NUEVA FUNCIÓN PARA LIMPIAR LA RUTA GPS ---------- */
  function limpiarRutaGps() {
    // 1. Vaciamos la variable interna que guarda los puntos
    routePointsMap = [];

    // 2. Actualizamos el mapa enviando un LineString vacío
    if (map.getSource("gps-route-source")) {
      map.getSource("gps-route-source").setData({
        type: "Feature",
        geometry: { type: "LineString", coordinates: [] } // Coordenadas vacías borran la línea
      });
    }
  }
  /* ---------- NUEVA FUNCIÓN PARA CENTRAR EN EL USUARIO ---------- */
  function centrarEnUsuario() {
    if (!userMarker) return;
    
    const userLngLat = userMarker.getLngLat();
    
    // Validamos que el GPS ya haya capturado una coordenada válida
    if (!userLngLat || (userLngLat.lng === 0 && userLngLat.lat === 0)) {
      console.warn("Aún no tenemos tu ubicación exacta.");
      return; 
    }

    // Movemos la cámara hacia el usuario
    map.flyTo({
      center: [userLngLat.lng, userLngLat.lat],
      zoom: 18,         
      pitch: 50,        
      essential: true   
    });
  }
  // ========== DECLARACIONES DE BRÚJULA (ANTES DE USARLAS) ==========
let compassActive = false;
let orientationHandler = null;
let filteredHeading = null;
let animationFrame = null;
let userArrowContainer = null; // Referencia al contenedor de la flecha

const SMOOTHING_FACTOR = 0.2; // Suavizado
const DEAD_ZONE = 2;          // Grados mínimos de cambio

function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

// Obtiene el heading de la parte superior del dispositivo (0 = norte, 90 = este)
function getDeviceHeading(event) {
  if (event.webkitCompassHeading !== undefined) {
    // iOS
    return event.webkitCompassHeading;
  } else {
    // Android
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

  // Elige UNA de estas opciones (descomenta la que funcione):
  // let viewHeading = heading;                           // Opción 0: sin offset
  // let viewHeading = normalizeAngle(heading + 90);      // Opción 1: +90°
  // let viewHeading = normalizeAngle(heading - 90);      // Opción 2: -90°
  let viewHeading = normalizeAngle(heading + 180);     // Opción 3: +180° (ajústala)
  // let viewHeading = normalizeAngle(heading - 180);     // Opción 4: -180°
  // let viewHeading = normalizeAngle(-heading);          // Opción 5: inversión pura
  // let viewHeading = normalizeAngle(-heading + 90);     // Opción 6: inversión +90°

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
/* ---------- PROXIMIDAD AUTO-POPUP ---------- */
const RADIO_METROS = 10;          // distancia en metros para abrir popup
let ultimoPopupAbierto = null;    // evita abrir el mismo popup en bucle

function verificarProximidad(lat, lng) {
  DESTINOS.forEach(d => {
    const distancia = distanceMeters(lat, lng, d.lat, d.lng);

    if (distancia <= RADIO_METROS) {
      const marker = marcadoresBase[d.id];
      if (!marker) return;

      // Solo abre si no está ya abierto este popup
      if (ultimoPopupAbierto !== d.id) {
        ultimoPopupAbierto = d.id;
        marker.togglePopup();

        // Centra el mapa en el destino
        map.flyTo({
          center: [d.lng, d.lat],
          zoom: 18,
          pitch: 50,
          essential: true
        });
      }
    } else {
      // Si se aleja, resetea para que pueda volver a abrirse
      if (ultimoPopupAbierto === d.id) {
        ultimoPopupAbierto = null;
      }
    }
  });
}
  return {
    dibujarCircuito,
    dibujarPuntos,
    toggleMarcadoresBase,
    dibujarRutaDesdeGps,
    limpiarRutaGps,
    toggleCompassMode,
    isCompassActive,
    actualizarIdiomaBase,
    centrarEnUsuario, 
    flyTo: (lng,lat)=> {
     map.flyTo({ center: [lng,lat],zoom:40, pitch: 50, essential: true }); 
    },
    getBearing: () => map.getBearing(),
    cleanup: () => {
      map.remove();
      if (watchId) {
        Geolocation.clearWatch({ id: watchId }).catch(console.error);
      }
    }
  };
}