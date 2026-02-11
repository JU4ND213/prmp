import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export function createMap(container) {
  const map = new maplibregl.Map({
    container,
    center: [-78.4547, -0.0023], // centro inicial
    zoom: 16,
    pitch: 45,
    style: {
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: [
            "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: "osm",
          type: "raster",
          source: "osm",
        },
      ],
    },
  });

  map.addControl(new maplibregl.NavigationControl(), "top-right");

  return map;
}
