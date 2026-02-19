import React, { useEffect, useRef, useState } from "react";
import "../App.css";

import { startMap, CIRCUITOS_OBJ, DESTINOS } from "../mapLogic";
import { POINTS_BY_COLOR, CATEGORY_DETAILS } from "../constants/points";

export default function MapView() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [mostrarMarcadoresBase, setMostrarMarcadoresBase] = useState(true);
  const [activeCircuitos, setActiveCircuitos] = useState([]);

  const [destinoId, setDestinoId] = useState("");

  /* ===============================
     INICIALIZAR MAPA
  =============================== */
  useEffect(() => {
    const {
      dibujarCircuito,
      dibujarPuntos,
      toggleMarcadoresBase,
      dibujarRutaDesdeGps,
      cleanup
    } = startMap(mapContainerRef.current);

    mapRef.current = {
      dibujarCircuito,
      dibujarPuntos,
      toggleMarcadoresBase,
      dibujarRutaDesdeGps
    };

    return () => cleanup();
  }, []);

  /* ===============================
     CIRCUITOS
  =============================== */
  const toggleCircuito = (circuitoKey) => {
    setActiveCircuitos(prev =>
      prev.includes(circuitoKey)
        ? prev.filter(c => c !== circuitoKey)
        : [...prev, circuitoKey]
    );
  };

  useEffect(() => {
    if (!mapRef.current) return;

    if (activeCircuitos.length === 0) {
      mapRef.current.dibujarCircuito(null);
      return;
    }

    activeCircuitos.forEach(key => {
      mapRef.current.dibujarCircuito(CIRCUITOS_OBJ[key]);
    });
  }, [activeCircuitos]);

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
     RUTA GPS → DESTINO
  =============================== */
  const irAlDestino = () => {
    if (!destinoId) return;

    const destino = DESTINOS.find(d => d.id === Number(destinoId));
    if (!destino) return;

    mapRef.current?.dibujarRutaDesdeGps(destino);
  };

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
          className="chip chip--circle"
          onClick={() => {
            const nuevoEstado = !mostrarMarcadoresBase;
            setMostrarMarcadoresBase(nuevoEstado);
            mapRef.current?.toggleMarcadoresBase(nuevoEstado);
          }}
          title="Puntos base"
        >
          {mostrarMarcadoresBase ? "📍" : "✕"}
        </button>

        {/* ===== NAVEGACIÓN GPS ===== */}
        <label>Ir a un lugar:</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <select
            value={destinoId}
            onChange={(e) => setDestinoId(e.target.value)}
            style={{ flex: 1, padding: "8px", borderRadius: "8px" }}
          >
            <option value="">Selecciona un lugar</option>
            {DESTINOS.map(d => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
          </select>

          <button
            className="chip chip--pill"
            onClick={irAlDestino}
            disabled={!destinoId}
          >
            Ir
          </button>
        </div>

        <div className="divider"></div>

        {/* ===== CATEGORÍAS ===== */}
        <label>Puntos de Interés:</label>
        <div className="categories-grid">
          {Object.entries(CATEGORY_DETAILS).map(([key, config]) => {
            const isActive = activeCategories.includes(key);

            return (
              <button
                key={key}
                className="chip chip--pill"
                onClick={() => toggleCategory(key)}
                style={{
                  backgroundColor: config.color,
                  color: "#fff",
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
          {[
            { key: "PACHA", label: "Ruta Pacha", class: "ruta-pacha" },
            { key: "INTI", label: "Ruta Inti", class: "ruta-inti" },
            { key: "KILLA", label: "Ruta Killa", class: "ruta-killa" }
          ].map(({ key, label, class: cls }) => {
            const isActive = activeCircuitos.includes(key);

            return (
              <button
                key={key}
                className={`control-btn ${cls}`}
                onClick={() => toggleCircuito(key)}
                style={{
                  opacity: isActive ? 1 : 0.6,
                  border: isActive ? "2px solid #000" : "2px solid transparent"
                }}
              >
                {label} {isActive && "✓"}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
