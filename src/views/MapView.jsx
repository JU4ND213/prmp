import React, { useEffect, useRef, useState } from "react";
import "../App.css";

import { startMap, CIRCUITOS_OBJ } from "../MapLogic";
import { POINTS_BY_COLOR, CATEGORY_DETAILS } from "../constants/points";

export default function MapView() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);

  const [mostrarMarcadoresBase, setMostrarMarcadoresBase] = useState(true);

  /* ===============================
     INICIALIZAR MAPA (UNA SOLA VEZ)
  =============================== */
  useEffect(() => {
    const {
      dibujarCircuito,
      dibujarPuntos,
      toggleMarcadoresBase,
      cleanup
    } = startMap(mapContainerRef.current);

    mapRef.current = {
      dibujarCircuito,
      dibujarPuntos,
      toggleMarcadoresBase
    };

    return () => cleanup();
  }, []);

  /* ===============================
     CIRCUITOS
  =============================== */
  const seleccionarCircuito = (circuito) => {
    mapRef.current?.dibujarCircuito(circuito);
  };

  /* ===============================
     CATEGORÍAS
  =============================== */
  const toggleCategory = (categoryKey) => {
    setActiveCategories(prev =>
      prev.includes(categoryKey)
        ? prev.filter(c => c !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const puntos = activeCategories.flatMap(
      cat => POINTS_BY_COLOR[cat] || []
    );

    mapRef.current.dibujarPuntos(puntos);
  }, [activeCategories]);

  /* ===============================
     UI
  =============================== */
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

      <button
        className="toggle-btn"
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        {menuAbierto ? "✕" : "☰ Opciones"}
      </button>

      <div className={`controls-panel ${menuAbierto ? "open" : "closed"}`}>
        <div className="panel-header">
          <h3>Panel de Control</h3>
        </div>

        {/* ===== PUNTOS BASE ===== */}
        <button
          className="chip"
          onClick={() => {
            const nuevoEstado = !mostrarMarcadoresBase;
            setMostrarMarcadoresBase(nuevoEstado);
            mapRef.current?.toggleMarcadoresBase(nuevoEstado);
          }}
        >
          {mostrarMarcadoresBase
            ? "Ocultar puntos base"
            : "Mostrar puntos base"}
        </button>

        <div className="divider"></div>

        {/* ===== CATEGORÍAS ===== */}
        <label>Puntos de Interés:</label>
        <div className="categories-grid">
          {Object.entries(CATEGORY_DETAILS).map(([key, config]) => {
            const isActive = activeCategories.includes(key);

            return (
              <button
                key={key}
                className="chip"
                onClick={() => toggleCategory(key)}
                style={{
                  backgroundColor: config.color,
                  color: "#ffffff",
                  border: isActive ? "2px solid #000" : "2px solid transparent",
                  opacity: isActive ? 1 : 0.6
                }}
              >
                {config.label} {isActive && "✓"}
              </button>
            );
          })}
        </div>

        <div className="divider"></div>

        {/* ===== CIRCUITOS ===== */}
<label>Circuitos Turísticos:</label>

<div className="circuits-grid">
  <button
    className="control-btn ruta-pacha"
    onClick={() => seleccionarCircuito(CIRCUITOS_OBJ.PACHA)}
  >
    Ruta Pacha
  </button>

  <button
    className="control-btn ruta-inti"
    onClick={() => seleccionarCircuito(CIRCUITOS_OBJ.INTI)}
  >
    Ruta Inti
  </button>

  <button
    className="control-btn ruta-killa"
    onClick={() => seleccionarCircuito(CIRCUITOS_OBJ.KILLA)}
  >
    Ruta Killa
  </button>
      </div>
      </div>
    </div>
  );
}
