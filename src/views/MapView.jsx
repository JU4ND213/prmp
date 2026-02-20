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
  const [activeCircuitos, setActiveCircuitos] = useState([]);
  const [destinoId, setDestinoId] = useState("");
  const [idiomaMenuAbierto, setIdiomaMenuAbierto] = useState(false);

  const cambiarIdioma = (lng) => {
    i18n.changeLanguage(lng);
    setIdiomaMenuAbierto(false);
  };

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
      rotarMapa,
      resetearNorte,
      actualizarIdiomaBase,
      cleanup
    } = mapApi;

    mapRef.current = {
      dibujarCircuito,
      dibujarPuntos,
      toggleMarcadoresBase,
      dibujarRutaDesdeGps,
      rotarMapa,
      resetearNorte,
      actualizarIdiomaBase
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
    setActiveCircuitos((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  useEffect(() => {
    if (!mapRef.current) return;

    if (activeCircuitos.length === 0) {
      mapRef.current.dibujarCircuito(null);
      return;
    }

    activeCircuitos.forEach((key) => {
      mapRef.current.dibujarCircuito(CIRCUITOS_OBJ[key]);
    });
  }, [activeCircuitos]);

  /* ===============================
     CATEGORÍAS
  =============================== */
  const toggleCategory = (key) => {
    setActiveCategories((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const puntos = activeCategories.flatMap(
      (cat) => POINTS_BY_COLOR[cat] || []
    );

    mapRef.current.dibujarPuntos(puntos);
  }, [activeCategories]);

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
     UI
  =============================== */
  return (
    <div className="map-view">
      <div ref={mapContainerRef} className="map-container" />

      {/* ===== BOTONES ROTACIÓN ===== */}
      <div className="rotation-controls">
        <button
          className="chip chip--circle rotation-btn"
          onClick={() => mapRef.current?.rotarMapa(45)}
          title="Rotar 45°"
        >
          🔄
        </button>
        <button
          className="chip chip--circle rotation-btn"
          onClick={() => mapRef.current?.resetearNorte()}
          title="Resetear Norte"
        >
          🧭
        </button>
      </div>

      {/* ===== BOTÓN DE IDIOMA ===== */}
      <div className="language-wrapper">
        <button
          className="chip chip--circle language-icon"
          onClick={() => setIdiomaMenuAbierto(!idiomaMenuAbierto)}
          title="Idioma"
        >
          🌐
        </button>

        {idiomaMenuAbierto && (
          <div className="language-menu">
            <button onClick={() => cambiarIdioma("es")}>Español</button>
            <button onClick={() => cambiarIdioma("en")}>English</button>
          </div>
        )}
      </div>

      {/* ===== BOTÓN PANEL ===== */}
      <button
        className="toggle-btn"
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        {menuAbierto ? "✕" : "☰ Opciones"}
      </button>

      {/* ===== PANEL ===== */}
      <div className={`controls-panel ${menuAbierto ? "open" : "closed"}`}>
        <div className="panel-header">
          <h3>{t("controlPanel")}</h3>
        </div>

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

        {/* GPS */}
        <select
          className="route-select"
          value={destinoId}
          onChange={(e) => setDestinoId(e.target.value)}
        >
          <option value="">{t("selectPlace")}</option>
          {DESTINOS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre}
            </option>
          ))}
        </select>

        <button
          className="chip chip--circle"
          onClick={irAlDestino}
          disabled={!destinoId}
        >
          {t("go")}
        </button>

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
                {t(config.labelKey ?? config.label)} {isActive && "✓"}
              </button>
            );
          })}
        </div>

        <div className="divider"></div>

        {/* CIRCUITOS */}
        <label>{t("touristCircuits")}</label>
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
                className={`control-btn ${cls} ${
                  isActive ? "active" : ""
                }`}
                onClick={() => toggleCircuito(key)}
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