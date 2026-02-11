import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "TU_TOKEN_MAPBOX";

export function initMap(container) {
  return new mapboxgl.Map({
    container,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [-78.45572, -0.00202],
    zoom: 15,
  });
}

export function addMarker(map, lng, lat, label) {
  new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .setPopup(new mapboxgl.Popup().setText(label))
    .addTo(map);
}
