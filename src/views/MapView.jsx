import React, { useEffect, useRef, useState, useCallback, useMemo, useTransition } from "react";
import "../App.css";
import { startMap, CIRCUITOS_OBJ, DESTINOS } from "../mapLogic";
import { POINTS_BY_COLOR, CATEGORY_DETAILS } from "../constants/points";
import { useTranslation } from "react-i18next";

const LINEA_EQUINOCCIAL = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "coordinates": [
          [-78.4593326, -0.0020944],
          [-78.4541878, -0.0021865],
          [-78.4490476, -0.0023089]
        ],
        "type": "LineString"
      }
    }
  ]
};

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
  // FIX: ref para rastrear el inicio del gesto de swipe en la galería
  const touchStartX = useRef(null);
  // ref para enfocar el botón de cierre al abrir la galería (accesibilidad)
  const lightboxCloseRef = useRef(null);

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
  const [isPending, startTransition] = useTransition();
  
  const [galeria, setGaleria] = useState({ activa: false, imagenes: [], indice: 0 });

  const cambiarIdioma = (lng) => {
    i18n.changeLanguage(lng);
    setIdiomaMenuAbierto(false);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        setDebouncedSearch(searchTerm);
      });
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleResultClick = useCallback((punto) => {
    setSelectedPunto(punto);
    setPanelMinimizado(false); 
    mapRef.current?.flyTo(punto.lng, punto.lat);
  }, []);

  /* ===============================
     GALERÍA
  =============================== */

  // FIX: useCallback para que el useEffect del teclado no se recree en cada render
  const galeriaSiguiente = useCallback(() => {
    setGaleria(prev => ({ ...prev, indice: (prev.indice + 1) % prev.imagenes.length }));
  }, []);

  const galeriaAnterior = useCallback(() => {
    setGaleria(prev => ({ ...prev, indice: (prev.indice - 1 + prev.imagenes.length) % prev.imagenes.length }));
  }, []);

  const cerrarGaleria = useCallback(() => {
    setGaleria({ activa: false, imagenes: [], indice: 0 });
  }, []);

  // FIX: navegación por teclado cuando la galería está activa
  useEffect(() => {
    if (!galeria.activa) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') galeriaSiguiente();
      else if (e.key === 'ArrowLeft') galeriaAnterior();
      else if (e.key === 'Escape') cerrarGaleria();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [galeria.activa, galeriaSiguiente, galeriaAnterior, cerrarGaleria]);

  // FIX: enfocar el botón de cierre al abrir la galería para que el teclado funcione
  useEffect(() => {
    if (galeria.activa && lightboxCloseRef.current) {
      lightboxCloseRef.current.focus();
    }
  }, [galeria.activa]);

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
      dibujarLineaFija,
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

    if (dibujarLineaFija) {
      dibujarLineaFija(LINEA_EQUINOCCIAL, 'linea-equinoccial', '#FFFF00');
    }

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
    startTransition(() => {
      setActiveCategories((prev) =>
        prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
      );
    });
  };

  // FIX: eliminada `i18n.language` de las dependencias — `t` ya cambia
  // cuando el idioma cambia, por lo que incluir `i18n.language` causaba
  // un recálculo doble innecesario en cada cambio de idioma.
  const puntosVisiblesTraducidos = useMemo(() => {
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

    return puntosParaDibujar.map(p => ({
      ...p,
      name: p.id ? t(`points.${p.id}.name`, p.name) : p.name,
      description: p.id ? t(`points.${p.id}.description`, p.description) : p.description,
      menu: p.id && p.menu ? t(`points.${p.id}.menu`, { returnObjects: true, defaultValue: p.menu }) : p.menu
    }));
  }, [activeCategories, debouncedSearch, t]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.dibujarPuntos(puntosVisiblesTraducidos, handleResultClick, selectedPunto?.id);
    setPuntosVisibles(puntosVisiblesTraducidos);
  }, [puntosVisiblesTraducidos, selectedPunto, handleResultClick]);

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
          aria-label={t("searchPlaceholder", "Busca lugar, plato o servicio...")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
        />
        <div className="search-icon-wrapper">
          {searchTerm ? (
            <button
              className="search-clear-btn"
              onClick={() => setSearchTerm("")}
              aria-label={t("clearSearch", "Limpiar búsqueda")}
              title={t("clearSearch", "Limpiar búsqueda")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
          ) : (
            <span className="material-symbols-outlined" aria-hidden="true">search</span>
          )}
        </div>
      </div>
      
      {/* ===== PANEL UNIFICADO ===== */}
      {mostrarPanelIzquierdo && (
        <div className={`results-panel ${panelMinimizado ? "minimized" : ""}`}>
          
          {selectedPunto ? (
            <div className={`point-detail-view ${rutaActiva ? "modo-ruta" : ""}`}>
              
              {/* HEADER CON BOTÓN ATRÁS Y CONTROL PARA MINIMIZAR */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                {/* FIX: aria-label en botón de retroceso */}
                <button
                  className="back-btn"
                  onClick={() => setSelectedPunto(null)}
                  aria-label={t("back", "Volver al listado")}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
                </button>
                
                {/* FIX: div interactivo convertido a button para accesibilidad */}
                <button
                  onClick={() => setPanelMinimizado(!panelMinimizado)}
                  aria-label={panelMinimizado ? t("expand", "Expandir panel") : t("minimize", "Minimizar panel")}
                  aria-expanded={!panelMinimizado}
                  style={{
                    width: '35px',
                    height: '5px',
                    backgroundColor: '#cbd5e1',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    marginRight: '10px',
                    border: 'none',
                    padding: 0,
                  }}
                />
              </div>
              
              {/* EL CONTENIDO SE OCULTA SI ESTÁ MINIMIZADO */}
              {!panelMinimizado && (
                <>
                  {!rutaActiva && selectedPunto.imagenes && selectedPunto.imagenes.length > 0 && (
                    <div 
                      className="hero-image-container" 
                      onClick={() => setGaleria({ activa: true, imagenes: selectedPunto.imagenes, indice: 0 })}
                    >
                      <img src={selectedPunto.imagenes[0]} alt={selectedPunto.nombre || selectedPunto.name} />
                      <div className="hero-overlay">
                        <span className="material-symbols-outlined" aria-hidden="true">photo_library</span>
                        <span>{t("view", "Ver")} {selectedPunto.imagenes.length} {t("photos", "fotos")}</span>
                      </div>
                    </div>
                  )}

                  <div className="detail-body">
                    <div className="detail-header-text">
                      <h2 className="detail-title">
                        {selectedPunto.id 
                          ? t(`points.${selectedPunto.id}.name`, selectedPunto.nombre || selectedPunto.name) 
                          : (selectedPunto.nombre || selectedPunto.name)}
                      </h2>
                      
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
                            <span className="material-symbols-outlined" aria-hidden="true">directions</span>
                          </div>
                          <span>{t("howToGetThere", "¿Cómo llegar?")}</span>
                        </div>
                      ) : (
                        <div className="action-btn-wrapper" onClick={limpiarRuta}>
                          <div className="action-circle danger">
                            <span className="material-symbols-outlined" aria-hidden="true">close</span>
                          </div>
                          <span>{t("cancel", "Cancelar")}</span>
                        </div>
                      )}
                    </div>

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
                </>
              )}
            </div>
          ) : (
            <>
              <div className="results-header">
                <h3>{t("listTitle", "Lugares")} ({puntosVisibles.length})</h3>
                {/* FIX: aria-label en botón de minimizar */}
                <button
                  className="panel-minimize-btn"
                  onClick={() => setPanelMinimizado(!panelMinimizado)}
                  aria-label={panelMinimizado ? t("expand", "Expandir panel") : t("minimize", "Minimizar panel")}
                  aria-expanded={!panelMinimizado}
                  title={panelMinimizado ? t("expand", "Expandir") : t("minimize", "Minimizar")}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
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
        {/* FIX: aria-label en botón de configuración */}
        <button
          className="settings-btn"
          onClick={() => setToolbarOpen(!toolbarOpen)}
          aria-label={t("tools", "Herramientas")}
          aria-expanded={toolbarOpen}
          title={t("tools", "Herramientas")}
        >
          <span className="material-symbols-outlined" aria-hidden="true">settings</span>
        </button>
        
        <div className="sidebar-items">
          <div style={{ position: "relative" }}>
            {/* FIX: aria-label en botón de idioma */}
            <button
              className="sidebar-icon icon-lang"
              onClick={() => setIdiomaMenuAbierto(!idiomaMenuAbierto)}
              aria-label={t("language", "Idioma")}
              aria-expanded={idiomaMenuAbierto}
              title={t("language", "Idioma")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">g_translate</span>
            </button>
            {idiomaMenuAbierto && (
              <div className="language-menu" role="menu">
                <button role="menuitem" onClick={() => cambiarIdioma("es")}>Español</button>
                <button role="menuitem" onClick={() => cambiarIdioma("en")}>English</button>
              </div>
            )}
          </div>

          {/* FIX: aria-label en botón de brújula */}
          <button 
            className={`sidebar-icon icon-compass ${compassActive ? "active" : ""}`}
            onClick={toggleCompass}
            aria-label={t("compassMode", "Modo brújula")}
            aria-pressed={compassActive}
            title={t("compassMode", "Modo brújula")}
          >
            <span className="material-symbols-outlined" aria-hidden="true">explore</span>
          </button>

          {/* FIX: aria-label en botón de ubicación */}
          <button
            className="sidebar-icon icon-location"
            onClick={centrarCamara}
            aria-label={t("centerLocation", "Centrar en mi ubicación")}
            title={t("centerLocation", "Centrar en mi ubicación")}
          >
            <span className="material-symbols-outlined" aria-hidden="true">my_location</span>
          </button>
        </div>
      </div>

      {/* ===== BOTÓN MENÚ ===== */}
      {/* FIX: aria-label en botón de menú principal */}
      <button
        className="toggle-btn"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label={menuAbierto ? t("closeMenu", "Cerrar menú") : t("openMenu", "Abrir menú")}
        aria-expanded={menuAbierto}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          {menuAbierto ? "close" : "menu"}
        </span>
      </button>

      {/* ===== PANEL DE CONTROLES INFERIOR ===== */}
      <div className={`controls-panel ${menuAbierto ? "open" : "closed"}`}>
        
        <h3 className="panel-section-title">{t("whatAreYouLookingFor", "¿Qué buscas?")}</h3>
        
        <div className="categories-grid-comunicacion">
          {Object.entries(CATEGORY_DETAILS).map(([key, config]) => {
            const isActive = activeCategories.includes(key);
            return (
              <button
                key={key}
                className={`category-square-btn ${isActive ? "active" : ""}`}
                style={{ backgroundColor: config.color }}
                onClick={() => toggleCategory(key)}
                aria-pressed={isActive}
              >
                <div className="cat-icon-circle">
                  <span className="material-symbols-outlined" aria-hidden="true" style={{ color: config.color }}>
                    {config.icon || "place"}
                  </span>
                </div>
                <span className="cat-label">{t(`categories.${key}`)}</span>
                
                {isActive && (
                  <div className="cat-check-badge" aria-hidden="true">
                    <span className="material-symbols-outlined">check</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="divider" style={{ margin: "16px 0" }}></div>

        <h3 className="panel-section-title">{t("touristCircuits", "Rutas Turísticas")}</h3>
        
        <div className="circuits-column">
          {[
            { key: "PACHA", class: "ruta-pacha", icon: "landscape" },
            { key: "INTI", class: "ruta-inti", icon: "wb_sunny" },
            { key: "KILLA", class: "ruta-killa", icon: "nightlight" },
          ].map(({ key, class: cls, icon }) => {
            const isActive = activeCircuito === key;
            return (
              <button
                key={key}
                className={`circuit-card ${isActive ? "active" : ""}`}
                onClick={() => toggleCircuito(key)}
                aria-pressed={isActive}
              >
                <div className={`circuit-icon-block ${cls}`}>
                  <span className="material-symbols-outlined" aria-hidden="true">{icon}</span>
                </div>
                <div className="circuit-text">
                  <span className={`circuit-title ${cls}-text`}>
                    {t(`circuits.${key}`)}
                  </span>
                </div>
                <div className="circuit-chevron" aria-hidden="true">
                  <span className="material-symbols-outlined">chevron_right</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== GALERÍA ===== */}
      {galeria.activa && galeria.imagenes.length > 0 && (
        // FIX: role="dialog" + aria-modal para lectores de pantalla
        // FIX: onTouchStart / onTouchEnd para swipe en móvil
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t("gallery", "Galería de imágenes")}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            // umbral de 50 px para distinguir swipe de tap
            if (Math.abs(delta) > 50) {
              if (delta < 0) galeriaSiguiente();
              else galeriaAnterior();
            }
            touchStartX.current = null;
          }}
        >
          <div className="lightbox-header">
            <span className="lightbox-counter" aria-live="polite" aria-atomic="true">
              {galeria.indice + 1} / {galeria.imagenes.length}
            </span>
            {/* FIX: aria-label en botón de cerrar galería + ref para foco inicial */}
            <button
              className="lightbox-close"
              onClick={cerrarGaleria}
              ref={lightboxCloseRef}
              aria-label={t("close", "Cerrar galería")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">close</span>
            </button>
          </div>

          {galeria.imagenes.length > 1 && (
            // FIX: aria-label en botón de navegación anterior
            <button
              className="lightbox-nav left"
              onClick={galeriaAnterior}
              aria-label={t("previousPhoto", "Foto anterior")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">chevron_left</span>
            </button>
          )}

          <img
            src={galeria.imagenes[galeria.indice]}
            alt={t("photoOf", { defaultValue: `Foto {{num}} de {{total}}`, num: galeria.indice + 1, total: galeria.imagenes.length })}
            className="lightbox-main-img"
          />

          {galeria.imagenes.length > 1 && (
            // FIX: aria-label en botón de navegación siguiente
            <button
              className="lightbox-nav right"
              onClick={galeriaSiguiente}
              aria-label={t("nextPhoto", "Siguiente foto")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
}