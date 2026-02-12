import React, { useEffect, useRef, useState } from "react";
import "../App.css";

import { startMap, CIRCUITOS_OBJ } from "../MapLogic"; 

import { POINTS_BY_COLOR, CATEGORY_DETAILS } from '../constants/points';



export default function MapView() {
  const mapContainerRef = useRef(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  
  // Estado para guardar las categorías seleccionadas (ej: ['banos', 'restaurantes'])
  const [activeCategories, setActiveCategories] = useState([]);

  // Referencia para guardar las funciones del mapa
  const mapRef = useRef(null); 

  useEffect(() => {
    // Iniciamos el mapa
    const { dibujarCircuito, dibujarPuntos, cleanup } = startMap(mapContainerRef.current);
    
    // Guardamos las funciones en la referencia para usarlas luego
    mapRef.current = { dibujarCircuito, dibujarPuntos };

    return () => cleanup();
  }, []);

  const seleccionarCircuito = (circuito) => {
    if (mapRef.current && mapRef.current.dibujarCircuito) {
      mapRef.current.dibujarCircuito(circuito);
    }
  };

  // Función para activar/desactivar categorías
  const toggleCategory = (categoryKey) => {
    setActiveCategories(prev => {
      // Si ya está activa, la quitamos
      if (prev.includes(categoryKey)) {
        return prev.filter(c => c !== categoryKey);
      }
      // Si no está, la agregamos
      return [...prev, categoryKey];
    });
  };

  // Efecto que se ejecuta cada vez que activeCategories cambia
  useEffect(() => {
    if (mapRef.current && mapRef.current.dibujarPuntos) {
      // Juntamos todos los puntos de las categorías activas en un solo array
      const puntos = activeCategories.flatMap(cat => POINTS_BY_COLOR[cat] || []);
      
      console.log("Pintando categorías:", activeCategories);
      mapRef.current.dibujarPuntos(puntos);
    }
  }, [activeCategories]);


  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Contenedor del Mapa */}
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

      {/* Botón para abrir/cerrar panel */}
      <button className="toggle-btn" onClick={() => setMenuAbierto(!menuAbierto)}>
        {menuAbierto ? "✕" : "☰ Opciones"}
      </button>

      {/* PANEL DE CONTROL */}
      <div className={`controls-panel ${menuAbierto ? "open" : "closed"}`}>
        
        <div className="panel-header">
          <h3>Panel de Control</h3>
        </div>

        {/* --- SECCIÓN PUNTOS DE INTERÉS --- */}
        <label>Puntos de Interés:</label>
        <div className="categories-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
          {Object.entries(CATEGORY_DETAILS).map(([key, config]) => {
            // Verificamos si esta categoría está activa para cambiarle el estilo
            const isActive = activeCategories.includes(key);

            return (
              <button 
                key={key} 
                className="chip"
                // USAMOS toggleCategory AQUÍ
                onClick={() => toggleCategory(key)}
                style={{
                  backgroundColor: config.color,
                  color: '#fff',
                  border: isActive ? '2px solid #000' : '2px solid transparent', // Borde negro si está activo
                  opacity: isActive ? 1 : 0.6, // Un poco transparente si NO está activo
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  textShadow: '0px 1px 2px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s ease'
                }}
              >
                {config.label} {isActive && "✓"}
              </button>
            );
          })}
        </div>

        <div className="divider"></div>

        {/* --- SECCIÓN CIRCUITOS --- */}
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