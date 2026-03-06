import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import { startMap, CIRCUITOS_OBJ, DESTINOS } from "../mapLogic";
import { POINTS_BY_COLOR, CATEGORY_DETAILS } from "../constants/points";
import { useTranslation } from "react-i18next";

export default function MapView() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);
  const [mostrarMarcadoresBase, setMostrarMarcadoresBase] = useState(true);
  const [activeCircuito, setActiveCircuito] = useState(null);
  const [destinoId, setDestinoId] = useState("");
  const [idiomaMenuAbierto, setIdiomaMenuAbierto] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const cambiarIdioma = (lng) => {i18n.changeLanguage(lng); setIdiomaMenuAbierto(false);};
  
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
      actualizarIdiomaBase,
      centrarEnUsuario, // <--- Agregamos la función aquí
      cleanup
    } = mapApi;

    // Guardamos las funciones en la referencia para poder llamarlas desde los botones
    mapRef.current = {
      dibujarCircuito,
      dibujarPuntos,
      toggleMarcadoresBase,
      dibujarRutaDesdeGps,
      actualizarIdiomaBase,
      centrarEnUsuario // <--- Y la guardamos en la referencia
    };

    return () => cleanup?.();
  }, []);

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
  // Si vuelves a hacer clic en el mismo, se deselecciona (null)
  // Si haces clic en uno nuevo, ese se convierte en el único activo
  setActiveCircuito((prev) => (prev === key ? null : key));
};

  useEffect(() => {
  if (!mapRef.current) return;

  // Si no hay circuito activo, limpiamos la línea del mapa
  if (!activeCircuito) {
    mapRef.current.dibujarCircuito(null);
    return;
  }

  // Dibujamos el único circuito seleccionado
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

  // CAMBIO AQUÍ: Usamos debouncedSearch en lugar de searchTerm
  if (debouncedSearch.trim() !== "") {
    const termino = debouncedSearch.toLowerCase();
    const todosLosPuntos = Object.values(POINTS_BY_COLOR).flat();
    
    puntosParaDibujar = todosLosPuntos.filter((p) => {
      const nombreTraducido = p.id ? t(`points.${p.id}.name`, p.name).toLowerCase() : p.name.toLowerCase();
      const descTraducida = p.id && p.description 
        ? t(`points.${p.id}.description`, p.description).toLowerCase() 
        : (p.description || "").toLowerCase();

      let menuTraducido = p.menu || [];
      if (p.id) {
        const traduccion = t(`points.${p.id}.menu`, { returnObjects: true, defaultValue: p.menu });
        if (Array.isArray(traduccion)) {
          menuTraducido = traduccion;
        }
      }

      const coincideNombre = nombreTraducido.includes(termino);
      const coincideDesc = descTraducida.includes(termino);
      const coincideMenu = menuTraducido.some(plato => plato.toLowerCase().includes(termino));
      
      return coincideNombre || coincideDesc || coincideMenu;
    });
  } else {
    puntosParaDibujar = activeCategories.flatMap(
      (cat) => POINTS_BY_COLOR[cat] || []
    );
  }

  const puntosTraducidos = puntosParaDibujar.map((p) => ({
    ...p,
    name: p.id ? t(`points.${p.id}.name`, p.name) : p.name,
    description: p.id ? t(`points.${p.id}.description`, p.description) : p.description,
    menu: p.id && p.menu ? t(`points.${p.id}.menu`, { returnObjects: true, defaultValue: p.menu }) : p.menu
  }));

  mapRef.current.dibujarPuntos(puntosTraducidos);

// CAMBIO AQUÍ: Asegúrate de depender de debouncedSearch
}, [activeCategories, debouncedSearch, i18n.language, t]);
  /* ===============================
     RUTA GPS
  =============================== */
  const irAlDestino = () => {
    if (!destinoId) return;

    const destino = DESTINOS.find((d) => d.id === Number(destinoId));
    if (!destino) return;

    mapRef.current?.dibujarRutaDesdeGps(destino);
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

      {/* ===== BOTÓN DE IDIOMA ===== */}
      <div className="language-wrapper">
        <button
          className="chip chip--circle language-icon"
          onClick={() => setIdiomaMenuAbierto(!idiomaMenuAbierto)}
          title="Idioma"
        >
          {/* Reemplazamos el <img> por el icono de Google */}
          <span className="material-symbols-outlined">g_translate</span>
        </button>

        {idiomaMenuAbierto && (
          <div className="language-menu">
            <button onClick={() => cambiarIdioma("es")}>Español</button>
            <button onClick={() => cambiarIdioma("en")}>English</button>
          </div>
        )}
      </div>

     {/* ===== BOTÓN FLOTANTE "CENTRAR EN MI UBICACIÓN" (NUEVO) ===== */}
      <button 
        className="locate-btn" 
        onClick={centrarCamara}
        title={t("centerLocation", "Centrar en mi ubicación")}
      >
        {/* Reemplazamos el emoji por el nombre exacto del icono */}
        <span className="material-symbols-outlined">my_location</span>
      </button>
      {/* ===== BOTÓN PANEL ===== */}
      <button
        className="toggle-btn"
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        {menuAbierto ? "✕" : "☰"}
      </button>

      {/* ===== PANEL ===== */}
      <div className={`controls-panel ${menuAbierto ? "open" : "closed"}`}>
        <div className="panel-header">
          <h3>{t("controlPanel")}</h3>
        </div>

        <div className="gps-row">
      {/* ===== BUSCADOR ===== */}
        <div className="search-bar-container">
          <input 
            type="text" 
            className="search-input"
            placeholder={t("searchPlaceholder", "Ej: cuy, locro, museo...")} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {searchTerm && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchTerm("")}
              title={t("clearSearch", "Limpiar búsqueda")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>close</span>
            </button>
          )}
        </div>
        
        {/* Agregamos tu divider para separarlo de la fila del GPS */}
        <div className="divider"></div>
  {/* PUNTOS BASE */}
  <button
    className="chip chip--circle"
    onClick={() => {
      const nuevo = !mostrarMarcadoresBase;
      setMostrarMarcadoresBase(nuevo);
      mapRef.current?.toggleMarcadoresBase(nuevo);
    }}
    title="Puntos base"
  >
    {mostrarMarcadoresBase ? "📍" : "✔"}
  </button>

  {/* SELECTOR (Listbox) */}
  <select
    className="route-select"
    value={destinoId}
    onChange={(e) => setDestinoId(e.target.value)}
  >
    <option value="">{t("selectPlace")}</option>
    {DESTINOS.map((d) => (
      <option key={d.id} value={d.id}>
        {t(`destinos.${d.id}`)}
      </option>
    ))}
  </select>

  {/* BOTÓN IR */}
  <button
    className="chip chip--circle ir-btn"
    onClick={irAlDestino}
    disabled={!destinoId}
  >
    {t("go")}
  </button>
</div>

{/* MANTÉN EL DIVIDER AQUÍ PARA SEPARAR DE LAS CATEGORÍAS */}
<div className="divider"></div>

        {/* CATEGORÍAS */}
        <label>{t("pointsOfInterest")}</label>
        <div className="categories-grid">
          {Object.entries(CATEGORY_DETAILS).map(([key, config]) => {
            const isActive = activeCategories.includes(key);

            return (
              <button
                key={key}
                className={`chip chip--pill category-chip ${
                  isActive ? "active" : ""
                }`}
                style={{ backgroundColor: config.color }}
                onClick={() => toggleCategory(key)}
              >
                {t(`categories.${key}`)} {isActive && "✓"}
              </button>
            );
          })}
        </div>

        <div className="divider"></div>

        {/* CIRCUITOS */}
        <label>{t("touristCircuits")}</label>
        <div className="circuits-grid">
                  {[
          { key: "PACHA", class: "ruta-pacha" },
          { key: "INTI", class: "ruta-inti" },
          { key: "KILLA", class: "ruta-killa" }
        ].map(({ key, class: cls }) => {
          
          // CAMBIO: Ahora comparamos directamente (ya no usamos .includes)
          const isActive = activeCircuito === key; 

          return (
            <button
              key={key}
              className={`control-btn ${cls} ${isActive ? "active" : ""}`}
              onClick={() => toggleCircuito(key)}
            >
              {t(`circuits.${key}`)} {isActive && "✓"}
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}