import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import { startMap, CIRCUITOS_OBJ } from "../MapLogic";

// ✅ 1. NUEVOS IMPORTS
import CategoryButtons from "../components/CategoryButtons";
import { POINTS_BY_COLOR } from "../constants/points";

export default function MapView() {
  const mapContainerRef = useRef(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  // ✅ 2. NUEVO ESTADO PARA CATEGORÍAS
  const [activeCategories, setActiveCategories] = useState([]);

  // Referencia para guardar las funciones del mapa
  const mapRef = useRef(null); 

  useEffect(() => {
    // Obtenemos todas las funciones (incluida la nueva dibujarPuntos)
    const { dibujarCircuito, dibujarPuntos, cleanup } = startMap(mapContainerRef.current);
    
    // ✅ 3. GUARDAMOS EL OBJETO COMPLETO EN EL REF
    mapRef.current = { dibujarCircuito, dibujarPuntos };

    return () => cleanup();
  }, []);

  // ✅ 4. ADAPTAMOS ESTA FUNCIÓN (porque mapRef.current ahora es un objeto)
  const seleccionarCircuito = circuito => {
    if (mapRef.current && mapRef.current.dibujarCircuito) {
      mapRef.current.dibujarCircuito(circuito);
    }
  };

  // ✅ 5. NUEVA LÓGICA DE FILTRADO
  const toggleCategory = (category) => {
    setActiveCategories(prev => {
      if (prev.includes(category)) return prev.filter(c => c !== category);
      return [...prev, category];
    });
  };

  // ✅ 6. EFECTO PARA PINTAR PUNTOS AL TOCAR BOTONES
  useEffect(() => {
    if (mapRef.current && mapRef.current.dibujarPuntos) {
      // Aplanamos el array de puntos según categorías activas
      const puntos = activeCategories.flatMap(cat => POINTS_BY_COLOR[cat] || []);
      mapRef.current.dibujarPuntos(puntos);
    }
  }, [activeCategories]);

  const allCategories = Object.keys(POINTS_BY_COLOR);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

      {/* ✅ 7. AQUÍ AGREGAMOS LOS BOTONES FLOTANTES */}
      <CategoryButtons 
        categories={allCategories}
        activeCategories={activeCategories}
        toggleCategory={toggleCategory}
      />

      {/* --- TU INTERFAZ ORIGINAL INTACTA --- */}
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