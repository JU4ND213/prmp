import L from "leaflet";

// --- AGREGA ESTE BLOQUE ---
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
// ---------------------------

export function initMap(container) {
  // Verificamos si ya existe mapa para evitar error, aunque lo ideal es limpiar en el useEffect
  if (container._leaflet_id) return null; 

  const map = L.map(container).setView(
    [-0.00202, -78.45572],
    15
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  return map;
}

// ... (resto de funciones addMarker, addUserMarker, moveMarker igual que antes)