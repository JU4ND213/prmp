import { useEffect, useRef } from "react";
import { startMap } from "../controllers/MapController";

export default function MapView() {
  const mapRef = useRef(null);

  useEffect(() => {
    startMap(mapRef.current);
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
