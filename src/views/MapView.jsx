import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import { startMap, CIRCUITOS_OBJ } from "../MapLogic";

export default function MapView() {
  const mapContainerRef = useRef(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const { dibujarCircuito, cleanup } = startMap(mapContainerRef.current);
    mapRef.current = dibujarCircuito; // Guardamos la función para los botones

    return () => cleanup();
  }, []);

  // Función que se pasa a los botones
  const seleccionarCircuito = circuito => {
    if (mapRef.current) mapRef.current(circuito);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

      <button className="toggle-btn" onClick={() => setMenuAbierto(!menuAbierto)}>
        {menuAbierto ? "✕" : "☰ Opciones"}
      </button>

      <div className={`controls-panel ${menuAbierto ? "open" : "closed"}`}>
        <div className="panel-header">
          <h3>Panel de Control</h3>
        </div>

        <div className="divider"></div>

        <label>Circuitos Turísticos:</label>
        <div className="circuits-grid">
          <button className="chip pacha" onClick={() => seleccionarCircuito(CIRCUITOS_OBJ.PACHA)}>Ruta Pacha</button>
          <button className="chip inti" onClick={() => seleccionarCircuito(CIRCUITOS_OBJ.INTI)}>Ruta Inti</button>
          <button className="chip killa" onClick={() => seleccionarCircuito(CIRCUITOS_OBJ.KILLA)}>Ruta Killa</button>
        </div>
      </div>
    </div>
  );
}
