import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// --- 1. CONFIGURACIÓN DE ICONOS (Para que no salgan rotos) ---
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- 2. DATOS (Los ponemos aquí para evitar errores de importación) ---
const DATOS_SEGUROS = [
  { nombre: "Punto 1 Viviendas", lat: -0.0026339, lng: -78.4536447 },
  { nombre: "Punto 2 Museo Fiestas", lat: -0.00254709, lng: -78.45416508 },
  { nombre: "Punto 3 Tiangues", lat: -0.002408226, lng: -78.45456037 },
  { nombre: "Punto 4 Capilla", lat: -0.00217993, lng: -78.45443815 },
  { nombre: "Punto 5 Museo Cerveza", lat: -0.00172532, lng: -78.45456769 },
  { nombre: "Punto 6 Museo Cacao", lat: -0.00144343, lng: -78.45508843 },
  { nombre: "Punto 7 Monumento", lat: -0.0020218, lng: -78.4557291 },
  { nombre: "Punto 8 Tienda Pichincha", lat: -0.00194292, lng: -78.45494728 },
  { nombre: "Punto 9 Exp. Huevo", lat: -0.00210687, lng: -78.45492085 },
  { nombre: "Punto 10 Legado Virtual", lat: -0.00270064, lng: -78.45528725 },
  { nombre: "Punto 11 Pab. Ecuador", lat: -0.00295948, lng: -78.45520276 },
  { nombre: "Punto 12 Planetario", lat: -0.00287231, lng: -78.45505122 },
  { nombre: "Punto 13 Pab. Francia", lat: -0.00308018, lng: -78.45503877 },
  { nombre: "Punto 14 Pab. Guayasamín", lat: -0.0030547, lng: -78.45482457 },
  { nombre: "Punto 15 Av. Geodésicos", lat: -0.0031959, lng: -78.45422637 }
];

// --- 3. FUNCIÓN PRINCIPAL ---
export function startMap(container) {
  // A. Si el contenedor no existe, no hacemos nada
  if (!container) return;

  // B. Inicializamos el mapa
  const map = L.map(container).setView([-0.00251330383094658, -78.45494646190696], 16);
// --- AQUÍ ESTÁ LA TEXTURA SATELITAL (Copia esta parte) ---
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri'
  }).addTo(map);
  // ---------------------------------------------------------

  // C. Agregamos los marcadores (Usando los datos seguros de arriba)
  DATOS_SEGUROS.forEach(punto => {
    L.marker([punto.lat, punto.lng])
      .addTo(map)
      .bindPopup(punto.nombre);
  });

  // D. Marcador del Usuario (Círculo azul)
  const userMarker = L.circleMarker([0, 0], {
    radius: 10,
    color: "white",
    fillColor: "#01004d", // Azul material design
    fillOpacity: 1,
  }).addTo(map);

  console.log("Mapa iniciado correctamente. Esperando GPS...");

  // E. GPS (Lo activamos con protecciones)
  let watchId = null;
  if ("geolocation" in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("GPS VIVO:", latitude, longitude); // MIRA LA CONSOLA
        
        // Movemos el marcador azul
        userMarker.setLatLng([latitude, longitude]);
        
        // Opcional: Centrar mapa en el usuario
        // map.setView([latitude, longitude]); 
      },
      (error) => {
        console.error("Error de GPS:", error.message);
        alert("Error GPS: " + error.message); // Te avisará si está bloqueado
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert("Tu navegador no soporta GPS");
  }

  // F. FUNCIÓN DE LIMPIEZA (IMPORTANTE)
  return () => {
    console.log("Limpiando...");
    map.remove();
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
  };
}