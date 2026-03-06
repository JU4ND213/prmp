import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true // Permite que Ngrok se conecte sin bloquear el host
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Empaqueta React y el DOM en su propio archivo
          'react-vendor': ['react', 'react-dom'],
          // Empaqueta el motor del mapa (el más pesado) por separado
          'maplibre': ['maplibre-gl'],
          // Empaqueta las herramientas de internacionalización
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-http-backend', 'i18next-browser-languagedetector']
        }
      }
    },
    // Opcional: Aumenta ligeramente el límite de advertencia 
    // ya que MapLibre por sí solo es grande, incluso minificado.
    chunkSizeWarningLimit: 800 
  }
})