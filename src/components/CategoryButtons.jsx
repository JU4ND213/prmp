import React from "react";
import { CATEGORY_DETAILS } from "../constants/points";
import "../App.css"; // Importamos estilos globales

const CategoryButtons = ({ categories, activeCategories, toggleCategory }) => {
  return (
    <div className="categories-container">
      <div className="categories-scroll">
        {categories.map((catKey) => {
          // Obtener detalles o valores por defecto
          const details = CATEGORY_DETAILS[catKey] || { label: catKey, color: "#333" };
          const isActive = activeCategories.includes(catKey);

          return (
            <button
              key={catKey}
              onClick={() => toggleCategory(catKey)}
              className={`category-chip ${isActive ? "active" : ""}`}
              style={{
                "--chip-color": details.color // Variable CSS para color dinámico
              }}
            >
              {/* Puntito de color visual */}
              <span 
                className="dot" 
                style={{ backgroundColor: isActive ? "#fff" : details.color }}
              />
              {details.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryButtons;