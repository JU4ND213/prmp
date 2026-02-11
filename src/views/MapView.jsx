import { useEffect, useRef, useState } from "react";
import { createMap } from "../services/MapService";
import { startGps } from "../services/GpsService";
import maplibregl from "maplibre-gl";

export default function MapView() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [gps, setGps] = useState(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = createMap(mapContainer.current);

    markerRef.current = new maplibregl.Marker({ color: "#00ffff" })
      .setLngLat([-78.4547, -0.0023])
      .addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    startGps((coords) => {
      setGps(coords);

      if (markerRef.current) {
        markerRef.current.setLngLat(coords);
        mapRef.current?.easeTo({ center: coords, zoom: 18 });
      }
    });
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
