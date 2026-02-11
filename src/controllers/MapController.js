import { PLACES } from "../models/place";
import { initMap, addMarker } from "../services/MapService";

export function startMap(container) {
  const map = initMap(container);

  map.on("load", () => {
    PLACES.forEach((place) => {
      addMarker(map, place.lng, place.lat, place.name);
    });
  });

  return map;
}
