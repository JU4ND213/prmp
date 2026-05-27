import React, { useEffect, useRef, useState, useCallback } from "react";
import "../App.css";
import { startMap, CIRCUITOS_OBJ, DESTINOS } from "../mapLogic";
import { POINTS_BY_COLOR, CATEGORY_DETAILS } from "../constants/points";
import { useTranslation } from "react-i18next";

export default function MapView() {
  const [selectedPunto, setSelectedPunto] = useState(null);
  const [compassActive, setCompassActive] = useState(false);
  
  const toggleCompass = () => {
    if (mapRef.current?.toggleCompassMode) {
      const nuevoEstado = mapRef.current.toggleCompassMode();
      setCompassActive(nuevoEstado);
    }
  };

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const { t, i18n } = useTranslation();
  
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [mostrarMarcadoresBase, setMostrarMarcadoresBase] = useState(false);
  const [activeCircuito, setActiveCircuito] = useState(null);
  const [destinoId, setDestinoId] = useState("");
  const [idiomaMenuAbierto, setIdiomaMenuAbierto] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [rutaActiva, setRutaActiva] = useState(false);
  const [puntosVisibles, setPuntosVisibles] = useState([]);
  const [panelMinimizado, setPanelMinimizado] = useState(false);
  const [toolbarOpen, setToolbarOpen] = useState(false);
  
  // 👇 ESTADO PARA LA GALERÍA ESTILO GOOGLE MAPS 👇
  const [galeria, setGaleria] = useState({ activa: false, imagenes: [], indice: 0 });

  const cambiarIdioma = (lng) => {
    i18n.changeLanguage(lng);
    setIdiomaMenuAbierto(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  /* ===============================
     INICIALIZAR MAPA
  =============================== */
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapApi = startMap(mapContainerRef.current, t);
    if (!mapApi) return;

    const {
      dibujarCircuito,
      dibujarPuntos,
      toggleMarcadoresBase,
      dibujarRutaDesdeGps,
      limpiarRutaGps,
      toggleCompassMode,
      isCompassActive,
      actualizarIdiomaBase,
      centrarEnUsuario,
      flyTo,
      cleanup,
    } = mapApi;

    mapRef.current = {
      dibujarCircuito,
      dibujarPuntos,
      toggleMarcadoresBase,
      dibujarRutaDesdeGps,
      limpiarRutaGps,
      toggleCompassMode,
      isCompassActive,
      actualizarIdiomaBase,
      flyTo,
      centrarEnUsuario,
    };

    return () => cleanup?.();
  }, []);

  /* ===============================
     PUENTE PARA LA GALERÍA (Desde mapLogic.js)
  =============================== */
  useEffect(() => {
    // Definimos la función global que el popup del mapa va a llamar
    window.abrirGaleriaReact = (destinoId, index) => {
      const destino = DESTINOS.find(d => d.id === destinoId);
      if (destino && destino.imagenes) {
        setGaleria({ activa: true, imagenes: destino.imagenes, indice: index });
      }
    };

    return () => {
      delete window.abrirGaleriaReact;
    };
  }, []);

  // Funciones de navegación de la galería
  const galeriaSiguiente = () => {
    setGaleria(prev => ({ ...prev, indice: (prev.indice + 1) % prev.imagenes.length }));
  };

  const galeriaAnterior = () => {
    setGaleria(prev => ({ ...prev, indice: (prev.indice - 1 + prev.imagenes.length) % prev.imagenes.length }));
  };

  const cerrarGaleria = () => {
    setGaleria({ activa: false, imagenes: [], indice: 0 });
  };


  useEffect(() => {
    setSelectedPunto(null);
  }, [activeCategories, debouncedSearch]);

  /* ===============================
     CAMBIO DE IDIOMA
  =============================== */
  useEffect(() => {
    mapRef.current?.actualizarIdiomaBase?.(t);
  }, [i18n.language]);

  /* ===============================
     CIRCUITOS
  =============================== */
  const toggleCircuito = (key) => {
    setActiveCircuito((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    if (!mapRef.current) return;

    if (!activeCircuito) {
      mapRef.current.dibujarCircuito(null);
      return;
    }

    mapRef.current.dibujarCircuito(CIRCUITOS_OBJ[activeCircuito]);
  }, [activeCircuito]);

  /* ===============================
     CATEGORÍAS Y BÚSQUEDA
  =============================== */
  const toggleCategory = (key) => {
    setActiveCategories((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const handleResultClick = useCallback((punto) => {
    setSelectedPunto(punto);
    mapRef.current?.flyTo(punto.lng, punto.lat);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    let puntosParaDibujar = [];

    if (debouncedSearch.trim() !== "") {
      const termino = debouncedSearch.toLowerCase();
      const todosLosPuntos = Object.values(POINTS_BY_COLOR).flat();
      puntosParaDibujar = todosLosPuntos.filter((p) => {
        const nombreTraducido = p.id ? t(`points.${p.id}.name`, p.name).toLowerCase() : p.name.toLowerCase();
        const descTraducida = p.id && p.description ? t(`points.${p.id}.description`, p.description).toLowerCase() : (p.description || "").toLowerCase();
        let menuTraducido = p.menu || [];
        if (p.id) {
          const traduccion = t(`points.${p.id}.menu`, { returnObjects: true, defaultValue: p.menu });
          if (Array.isArray(traduccion)) menuTraducido = traduccion;
        }
        return (
          nombreTraducido.includes(termino) ||
          descTraducida.includes(termino) ||
          menuTraducido.some(plato => plato.toLowerCase().includes(termino))
        );
      });
    } else {
      puntosParaDibujar = activeCategories.flatMap(cat => POINTS_BY_COLOR[cat] || []);
    }

    const puntosTraducidos = puntosParaDibujar.map(p => ({
      ...p,
      name: p.id ? t(`points.${p.id}.name`, p.name) : p.name,
      description: p.id ? t(`points.${p.id}.description`, p.description) : p.description,
      menu: p.id && p.menu ? t(`points.${p.id}.menu`, { returnObjects: true, defaultValue: p.menu }) : p.menu
    }));

    mapRef.current.dibujarPuntos(puntosTraducidos, handleResultClick, selectedPunto?.id);
    setPuntosVisibles(puntosTraducidos);
  }, [activeCategories, debouncedSearch, i18n.language, t, selectedPunto, handleResultClick]);

  /* ===============================
     RUTA GPS
  =============================== */
  const irAlDestino = () => {
    if (!destinoId) return;

    const destino = DESTINOS.find((d) => d.id === Number(destinoId));
    if (!destino) return;

    mapRef.current?.dibujarRutaDesdeGps(destino);
    setRutaActiva(true);
  };

  const limpiarRuta = () => {
    mapRef.current?.limpiarRutaGps();
    setRutaActiva(false);
  };

  const handleCambioDestino = (e) => {
    setDestinoId(e.target.value);

    if (rutaActiva) {
      limpiarRuta();
    }
  };

  /* ===============================
     CENTRAR CÁMARA EN USUARIO
  =============================== */
  const centrarCamara = () => {
    if (mapRef.current?.centrarEnUsuario) {
      mapRef.current.centrarEnUsuario();
    }
  };

  /* ===============================
     UI
  =============================== */
  return (
    <div className="map-view">
      <div ref={mapContainerRef} className="map-container" />

      {/* ===== BUSCADOR FLOTANTE (ESTILO MOCKUP) ===== */}
      <div className="floating-search-container">
        <input
          type="text"
          className="search-input"
          placeholder={t("searchPlaceholder", "Busca lugar, plato o servicio...")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
        />

        <div className="search-icon-wrapper">
          {searchTerm ? (
            <button
              className="search-clear-btn"
              onClick={() => setSearchTerm("")}
              title={t("clearSearch", "Limpiar búsqueda")}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          ) : (
            <span className="material-symbols-outlined">search</span>
          )}
        </div>
      </div>
      
      {/* 🌟 NUEVO: PANEL DE LISTA DE PUNTOS VISIBLES */}
      {(activeCategories.length > 0 || debouncedSearch.trim() !== "") && (
        <div className={`results-panel ${panelMinimizado ? "minimized" : ""}`}>
          <div className="results-header">
            <h3>{t("listTitle", "Lugares")} ({puntosVisibles.length})</h3>
            <button
              className="panel-minimize-btn"
              onClick={() => setPanelMinimizado(!panelMinimizado)}
              title={panelMinimizado ? "Expandir" : "Minimizar"}
            >
              <span className="material-symbols-outlined">
                {panelMinimizado ? "expand_more" : "expand_less"}
              </span>
            </button>
          </div>
          {!panelMinimizado && (
            <div className="results-list">
              {puntosVisibles.length > 0 ? (
                puntosVisibles.map((punto, index) => (
                  <div key={index} className="result-card" onClick={() => handleResultClick(punto)}>
                    <h4>{punto.name}</h4>
                    {punto.description && <p>{punto.description}</p>}
                  </div>
                ))
              ) : (
                <p className="no-results">{t("noResults", "No se encontraron lugares.")}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* PANEL DE DETALLES FLOTANTE */}
      {selectedPunto && (
        <div className={`detail-floating-panel ${menuAbierto ? "panel-open" : ""}`}>
          <button
            className="detail-close-btn"
            onClick={() => setSelectedPunto(null)}
            title="Cerrar"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <h4>{selectedPunto.name}</h4>
          {selectedPunto.description && <p>{selectedPunto.description}</p>}
          {selectedPunto.menu && selectedPunto.menu.length > 0 && (
            <>
              <strong>Menú:</strong>
              <ul>
                {selectedPunto.menu.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
      
      {/* ===== BARRA LATERAL DERECHA (HERRAMIENTAS) ===== */}
      <div className={`sidebar-toolbar ${toolbarOpen ? "open" : ""}`}>
        <button
          className="settings-btn"
          onClick={() => setToolbarOpen(!toolbarOpen)}
          title="Herramientas"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        
        <div className="sidebar-items">
          <div style={{ position: "relative" }}>
            <button 
              className="sidebar-icon icon-lang" 
              onClick={() => setIdiomaMenuAbierto(!idiomaMenuAbierto)} 
              title="Idioma"
            >
              <span className="material-symbols-outlined">g_translate</span>
            </button>
            {idiomaMenuAbierto && (
              <div className="language-menu">
                <button onClick={() => cambiarIdioma("es")}>Español</button>
                <button onClick={() => cambiarIdioma("en")}>English</button>
              </div>
            )}
          </div>

          <button 
            className={`sidebar-icon icon-compass ${compassActive ? "active" : ""}`} 
            onClick={toggleCompass} 
            title={t("compassMode", "Modo brújula")}
          >
            <span className="material-symbols-outlined">explore</span>
          </button>

          <button 
            className="sidebar-icon icon-location" 
            onClick={centrarCamara} 
            title={t("centerLocation", "Centrar en mi ubicación")}
          >
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>
      </div>

      {/* ===== BOTÓN PANEL ===== */}
      <button
        className="toggle-btn"
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        <span className="material-symbols-outlined">
          {menuAbierto ? "close" : "menu"}
        </span>
      </button>

      {/* ===== PANEL ===== */}
      <div className={`controls-panel ${menuAbierto ? "open" : "closed"}`}>
        <div className="panel-header">
          <h3>{t("controlPanel")}</h3>
        </div>

        <div className="gps-row">
          <button
            className="circle"
            onClick={() => {
              const nuevo = !mostrarMarcadoresBase;
              setMostrarMarcadoresBase(nuevo);
              mapRef.current?.toggleMarcadoresBase(nuevo);
            }}
            title="Puntos base"
          >
            <span className="material-symbols-outlined">
              {mostrarMarcadoresBase ? "location_on" : "check"}
            </span>
          </button>

          <select
            className="route-select"
            value={destinoId}
            onChange={handleCambioDestino}
          >
            <option value="">{t("selectPlace")}</option>
            {DESTINOS.map((d) => (
              <option key={d.id} value={d.id}>
                {t(`destinos.${d.id}`)}
              </option>
            ))}
          </select>

          <button
            className={`circle ${rutaActiva ? "cancelar-btn" : "ir-btn"}`}
            onClick={rutaActiva ? limpiarRuta : irAlDestino}
            disabled={!destinoId && !rutaActiva}
          >
            {rutaActiva ? (
              <span className="material-symbols-outlined">close</span>
            ) : (
              t("go")
            )}
          </button>
        </div>

        <div className="divider"></div>

        <label>{t("pointsOfInterest")}</label>
        <div className="categories-grid">
          {Object.entries(CATEGORY_DETAILS).map(([key, config]) => {
            const isActive = activeCategories.includes(key);

            return (
              <button
                key={key}
                className={`chip chip--pill category-chip ${isActive ? "active" : ""}`}
                style={{ backgroundColor: config.color }}
                onClick={() => toggleCategory(key)}
              >
                {t(`categories.${key}`)}{" "}
                {isActive && (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px", marginLeft: "4px", verticalAlign: "text-bottom" }}
                  >
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="divider"></div>

        <label>{t("touristCircuits")}</label>
        <div className="circuits-grid">
          {[
            { key: "PACHA", class: "ruta-pacha" },
            { key: "INTI", class: "ruta-inti" },
            { key: "KILLA", class: "ruta-killa" },
          ].map(({ key, class: cls }) => {
            const isActive = activeCircuito === key;

            return (
              <button
                key={key}
                className={`control-btn ${cls} ${isActive ? "active" : ""}`}
                onClick={() => toggleCircuito(key)}
              >
                {t(`circuits.${key}`)}{" "}
                {isActive && (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px", marginLeft: "4px", verticalAlign: "text-bottom" }}
                  >
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== 🌟 GALERÍA DE IMÁGENES ESTILO GOOGLE MAPS ===== */}
      {galeria.activa && galeria.imagenes.length > 0 && (
        <div className="lightbox-overlay">
          {/* Header con contador y botón cerrar */}
          <div className="lightbox-header">
            <span className="lightbox-counter">
              {galeria.indice + 1} / {galeria.imagenes.length}
            </span>
            <button className="lightbox-close" onClick={cerrarGaleria}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Botón Anterior */}
          {galeria.imagenes.length > 1 && (
            <button className="lightbox-nav left" onClick={galeriaAnterior}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          )}

          {/* Imagen Principal */}
          <img 
            src={galeria.imagenes[galeria.indice]} 
            alt="Vista detallada del punto turístico" 
            className="lightbox-main-img" 
          />

          {/* Botón Siguiente */}
          {galeria.imagenes.length > 1 && (
            <button className="lightbox-nav right" onClick={galeriaSiguiente}>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
}