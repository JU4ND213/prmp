import { useEffect, useRef } from "react";
import { startMap } from "../controllers/MapController";

export default function MapView() {
  const mapContainerRef = useRef(null);
  // Usamos una ref para guardar la función de limpieza y evitar re-ejecuciones locas
  const cleanupRef = useRef(null);

  useEffect(() => {
    // Si ya hay un mapa o no hay contenedor, no hacemos nada
    if (!mapContainerRef.current) return;

    console.log("Montando mapa...");
    // Iniciamos y guardamos la función de limpieza que nos devuelve el controller
    cleanupRef.current = startMap(mapContainerRef.current);

    // Esto se ejecuta SOLO cuando el componente se desmonta (cierras la app o cambias de vista)
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []); // El array vacío [] asegura que solo pase 1 vez al inicio

  return (
    <div 
      ref={mapContainerRef} 
      style={{ width: "100vw", height: "100vh" }} 
      id="map-container"
    />
  );
}