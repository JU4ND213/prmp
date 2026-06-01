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
  const isMapInitialized = useRef(false);
  const { t, i18n } = useTranslation();
  
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeCircuito, setActiveCircuito] = useState(null);
  const [idiomaMenuAbierto, setIdiomaMenuAbierto] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [rutaActiva, setRutaActiva] = useState(false);
  const [puntosVisibles, setPuntosVisibles] = useState([]);
  const [panelMinimizado, setPanelMinimizado] = useState(false);
  const [toolbarOpen, setToolbarOpen] = useState(false);
  
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

  const handleResultClick = useCallback((punto) => {
    setSelectedPunto(punto);
    setPanelMinimizado(false); 
    mapRef.current?.flyTo(punto.lng, punto.lat);
  }, []);

/* ===============================
     INICIALIZAR MAPA
  =============================== */
  useEffect(() => {
    if (!mapContainerRef.current || isMapInitialized.current) return;

    isMapInitialized.current = true;

    const mapApi = startMap(mapContainerRef.current, {}, handleResultClick, i18n.language);
    if (!mapApi) return;

    const {
      dibujarCircuito,
      dibujarPuntos,
      dibujarRutaDesdeGps,
      limpiarRutaGps,
      toggleCompassMode,
      isCompassActive,
      centrarEnUsuario,
      actualizarImagenUsuario,
      flyTo,
      cleanup,
    } = mapApi;

    mapRef.current = {
      dibujarCircuito,
      dibujarPuntos,
      dibujarRutaDesdeGps,
      limpiarRutaGps,
      toggleCompassMode,
      isCompassActive,
      flyTo,
      centrarEnUsuario,
      actualizarImagenUsuario,
    };


    return () => {
      cleanup?.();
      isMapInitialized.current = false; 
    };
  }, []);
  
  useEffect(() => {
    if (mapRef.current?.actualizarImagenUsuario) {
      mapRef.current.actualizarImagenUsuario(i18n.language);
    }
  }, [i18n.language]);

  const galeriaSiguiente = () => {
    setGaleria(prev => ({ ...prev, indice: (prev.indice + 1) % prev.imagenes.length }));
  };

  const galeriaAnterior = () => {
    setGaleria(prev => ({ ...prev, indice: (prev.indice - 1 + prev.imagenes.length) % prev.imagenes.length }));
  };

  const cerrarGaleria = () => {
    setGaleria({ activa: false, imagenes: [], indice: 0 });
  };

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
  const limpiarRuta = () => {
    mapRef.current?.limpiarRutaGps();
    setRutaActiva(false);
  };

  const centrarCamara = () => {
    if (mapRef.current?.centrarEnUsuario) {
      mapRef.current.centrarEnUsuario();
    }
  };

  const mostrarPanelIzquierdo = activeCategories.length > 0 || debouncedSearch.trim() !== "" || selectedPunto;

  /* ===============================
     UI
  =============================== */
  return (
    <div className="map-view">
      <div ref={mapContainerRef} className="map-container" />

      {/* ===== BUSCADOR FLOTANTE ===== */}
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
      
      {/* ===== PANEL UNIFICADO ===== */}
      {mostrarPanelIzquierdo && (
        <div className={`results-panel ${panelMinimizado ? "minimized" : ""}`}>
          
          {selectedPunto ? (
            <div className={`point-detail-view ${rutaActiva ? "modo-ruta" : ""}`}>
              <button className="back-btn" onClick={() => setSelectedPunto(null)}>
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              
              {!rutaActiva && selectedPunto.imagenes && selectedPunto.imagenes.length > 0 && (
                <div 
                  className="hero-image-container" 
                  onClick={() => setGaleria({ activa: true, imagenes: selectedPunto.imagenes, indice: 0 })}
                >
                  <img src={selectedPunto.imagenes[0]} alt={selectedPunto.nombre || selectedPunto.name} />
                  <div className="hero-overlay">
                    <span className="material-symbols-outlined">photo_library</span>
                    {/* Interpolación básica para evitar problemas complejos en tu i18n */}
                    <span>{t("view", "Ver")} {selectedPunto.imagenes.length} {t("photos", "fotos")}</span>
                  </div>
                </div>
              )}

              <div className="detail-body">
                <div className="detail-header-text">
                  {/* Traducción en vivo del Título */}
                  <h2 className="detail-title">
                    {selectedPunto.id 
                      ? t(`points.${selectedPunto.id}.name`, selectedPunto.nombre || selectedPunto.name) 
                      : (selectedPunto.nombre || selectedPunto.name)}
                  </h2>
                  
                  {/* Traducción en vivo de la Descripción */}
                  {!rutaActiva && (
                    <p className="detail-subtitle">
                      {selectedPunto.id 
                        ? t(`points.${selectedPunto.id}.description`, selectedPunto.description) 
                        : (selectedPunto.description || t("pointOfInterest", "Punto de interés"))}
                    </p>
                  )}
                </div>
                
                <div className="action-buttons-row">
                  {!rutaActiva ? (
                    <div className="action-btn-wrapper" onClick={() => {
                      if (mapRef.current?.dibujarRutaDesdeGps) {
                        mapRef.current.dibujarRutaDesdeGps({ lat: selectedPunto.lat, lng: selectedPunto.lng });
                        setRutaActiva(true);
                      }
                    }}>
                      <div className="action-circle primary">
                        <span className="material-symbols-outlined">directions</span>
                      </div>
                      <span>{t("howToGetThere", "¿Cómo llegar?")}</span>
                    </div>
                  ) : (
                    <div className="action-btn-wrapper" onClick={limpiarRuta}>
                      <div className="action-circle danger">
                        <span className="material-symbols-outlined">close</span>
                      </div>
                      <span>{t("cancel", "Cancelar")}</span>
                    </div>
                  )}
                </div>

                {/* Traducción en vivo del Menú (si existe) */}
                {!rutaActiva && selectedPunto.menu && selectedPunto.menu.length > 0 && (
                  <div className="detail-menu">
                    <strong>{t("availableMenu", "Menú disponible:")}</strong>
                    <ul>
                      {(selectedPunto.id 
                        ? t(`points.${selectedPunto.id}.menu`, { returnObjects: true, defaultValue: selectedPunto.menu }) 
                        : selectedPunto.menu
                      ).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="results-header">
                <h3>{t("listTitle", "Lugares")} ({puntosVisibles.length})</h3>
                <button
                  className="panel-minimize-btn"
                  onClick={() => setPanelMinimizado(!panelMinimizado)}
                  title={panelMinimizado ? t("expand", "Expandir") : t("minimize", "Minimizar")}
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
            </>
          )}
        </div>
      )}
      
      {/* ===== BARRA LATERAL DERECHA ===== */}
      <div className={`sidebar-toolbar ${toolbarOpen ? "open" : ""}`}>
        <button className="settings-btn" onClick={() => setToolbarOpen(!toolbarOpen)} title={t("tools", "Herramientas")}>
          <span className="material-symbols-outlined">settings</span>
        </button>
        
        <div className="sidebar-items">
          <div style={{ position: "relative" }}>
            <button className="sidebar-icon icon-lang" onClick={() => setIdiomaMenuAbierto(!idiomaMenuAbierto)} title={t("language", "Idioma")}>
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

          <button className="sidebar-icon icon-location" onClick={centrarCamara} title={t("centerLocation", "Centrar en mi ubicación")}>
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>
      </div>

      {/* ===== BOTÓN MENÚ ===== */}
      <button className="toggle-btn" onClick={() => setMenuAbierto(!menuAbierto)}>
        <span className="material-symbols-outlined">
          {menuAbierto ? "close" : "menu"}
        </span>
      </button>

      {/* ===== PANEL DE CONTROLES INFERIOR ===== */}
      <div className={`controls-panel ${menuAbierto ? "open" : "closed"}`}>
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
                  <span className="material-symbols-outlined" style={{ fontSize: "16px", marginLeft: "4px", verticalAlign: "text-bottom" }}>
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
                  <span className="material-symbols-outlined" style={{ fontSize: "18px", marginLeft: "4px", verticalAlign: "text-bottom" }}>
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== GALERÍA ===== */}
      {galeria.activa && galeria.imagenes.length > 0 && (
        <div className="lightbox-overlay">
          <div className="lightbox-header">
            <span className="lightbox-counter">
              {galeria.indice + 1} / {galeria.imagenes.length}
            </span>
            <button className="lightbox-close" onClick={cerrarGaleria}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {galeria.imagenes.length > 1 && (
            <button className="lightbox-nav left" onClick={galeriaAnterior}>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
          )}

          <img src={galeria.imagenes[galeria.indice]} alt={t("detailedView", "Vista detallada")} className="lightbox-main-img" />

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