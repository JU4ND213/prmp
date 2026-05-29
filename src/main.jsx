import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./App.css";
import App from "./App";
import { registerSW } from 'virtual:pwa-register';

// Inicializamos el Service Worker
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);