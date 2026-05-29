import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Asegúrate de que las rutas a tus imágenes coincidan con las de tu carpeta public/
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'images/**/*.png'], 
      manifest: {
        name: 'Mitad del Mundo Map',
        short_name: 'MitadMundo',
        description: 'Mapa interactivo y offline de la Ciudad Mitad del Mundo',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // Reemplaza con tus iconos reales cuando los tengas
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            // Intercepta las imágenes del satélite de ArcGIS
            urlPattern: /^https:\/\/server\.arcgisonline\.com\/ArcGIS\/rest\/services\/World_Imagery\/MapServer\/tile\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles-cache',
              expiration: {
                maxEntries: 1000, 
                maxAgeSeconds: 60 * 60 * 24 * 30 // Guardar por 30 días
              },
              cacheableResponse: {
                statuses: [0, 200] // Necesario para respuestas opacas (CORS)
              }
            }
          }
        ]
      }
    })
  ],
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