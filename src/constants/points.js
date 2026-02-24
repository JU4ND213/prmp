// src/constants/points.js

export const POINTS_BY_COLOR = {
  // Servicios 
  servicios: [
    { name: "Centro Médico", description: "Asistencia médica ", lat: -0.0024711, lng: -78.4541513, color: "#fe0000" },
    { name: "Lactario", description: "Lactario para lactantes", lat: -0.0024388, lng: -78.4541916, color: "#ffd600" },
    { name: "Cajero banco Guayaquil", description: "Cajero automático del banco Guayaquil", lat: -0.0024103, lng: -78.4545376, color: "#c90b77" },
  ],

  // Baños
  banos: [
    { name: "Baño", description: "Lugar para hacer necesidades biológicas", lat: -0.002868, lng: -78.4540173, color: "#00e1ff" },
    { name: "Baño", description: "Lugar para hacer necesidades biológicas", lat: -0.0025649, lng: -78.4555165, color: "#00e1ff" },
    { name: "Baño", description: "Lugar para hacer necesidades biológicas", lat: -0.0018595, lng: -78.45485, color: "#00e1ff" },
    { name: "Baño", description: "Lugar para hacer necesidades biológicas", lat: -0.0015322, lng: -78.4557687, color: "#00e1ff" }, 
  ],

  // Atracciones y Museos
  atracciones_museos: [
    { name: "Boletería Mitad del Mundo", description: "Boletería del monumento Mitad del Mundo", lat: -0.0032344, lng: -78.4538643, color: "#ffc800" },
    { name: "Pabellón Guayasamin", description: "Pabellón dedicado a la cultura Guayasamin", lat: -0.0030775, lng: -78.454844, color: "#ffc800" },
    { name: "Planetario", description: "Planetario con proyección de estrellas", lat: -0.002893, lng: -78.4550475, color: "#ffc800" },
    { name: "Museo del cacao", description: "Museo dedicado al cacao y su historia", lat: -0.001614, lng: -78.4551451, color: "#ffc800" },
    { name: "Legado Virtual", description: "Experiencia virtual sobre el legado cultural", lat: -0.0026843, lng: -78.4552738, color: "#ffc800" },
    { name: "Experimento del Huevo", description: "Laboratorio interactivo sobre el huevo", lat: -0.0021183, lng: -78.4550887, color: "#ffc800" },
    { name: "Museo Cerveza Artesanal", description: "Museo dedicado a la cerveza artesanal", lat: -0.0017324, lng: -78.4545912, color: "#ffc800" },
    { name: "Pabellón de Francia", description: "Pabellón dedicado a la cultura francesa", lat: -0.0031023, lng: -78.4550493, color: "#ffc800" },
    { name: "Pabellón Ecuador", description: "Pabellón dedicado a la cultura ecuatoriana", lat: -0.0029697, lng: -78.4552645, color: "#ffc800" },
    { name: "Iglesia Mitad del Mundo", description: "Iglesia ubicada en el monumento Mitad del Mundo", lat: -0.0021777, lng: -78.4543686, color: "#ffc800" },
    { name: "Tiangues", description: "Área de tiangues con exhibiciones culturales", lat: -0.002409, lng: -78.4545765, color: "#ffc800" },
    { name: "Zona de llamas", description: "Zona con exhibición de llamas y animales andinos", lat: -0.0014521, lng: -78.4567139, color: "#ffc800" },
    { name: "Tren Mitad del Mundo", description: "Tren que recorre el monumento Mitad del Mundo", lat: -0.0016097, lng: -78.4541643, color: "#ffc800" },
    { name: "Viviendas ancestrales", description: "Viviendas tradicionales ancestrales", lat: -0.0026562, lng: -78.4537317, color: "#ffc800" },
    { name: "Viviendas Ancestrales - Ciudad Mitad del Mundo", description: "Viviendas tradicionales ancestrales en la ciudad Mitad del Mundo", lat: -0.0026649, lng: -78.4536884, color: "#ffc800" },
    { name: "Inti Raymi Fiesta del sol", description: "Fiesta del sol celebrada en el monumento Mitad del Mundo", lat: -0.0029441, lng: -78.454315, color: "#ffc800" },
  ],

  // Restaurantes
  restaurantes: [
    { name: "Ñuca Llacta Restaurant", description: "Restaurante especializado en comida tradicional ecuatoriana", lat: -0.0024445, lng: -78.4543661, color: "#583700" },
    { name: "RESTAURANTE", description: "Restaurante general con variedad de platos", lat: -0.0020385, lng: -78.4544344, color: "#583700" },
    { name: "Calima", description: "Restaurante con menú regional y especialidades locales", lat: -0.0015815, lng: -78.4549402, color: "#583700" },
    { name: "Café Sinchi Warmi", description: "Cafetería con ambiente cálido y productos locales", lat: -0.0017107, lng: -78.4552719, color: "#583700" },
    { name: "raqeri cacao", description: "Cafetería especializada en cacao y productos derivados", lat: -0.0015384, lng: -78.4553481, color: "#583700" },
    { name: "Restaurante Balcon al Mundo", description: "Restaurante con vista panorámica al monumento Mitad del Mundo", lat: -0.0024231, lng: -78.4547545, color: "#583700" },
    { name: "El Orgánico Star Coffee", description: "Cafetería especializada en café orgánico", lat: -0.0018819, lng: -78.4545454, color: "#583700" },
    { name: "Café Guayasamin", description: "Cafetería con productos locales y tradicionales", lat: -0.0022184, lng: -78.4550409, color: "#583700" },
    { name: "Tienda Delicatessen Rosita", description: "Tienda especializada en productos gourmet y artesanías locales", lat: -0.0022465, lng: -78.4540331, color: "#583700" },
  ],

  // Tiendas
  tiendas_artesanias: [
    { name: "Piel y Cuero", description: "Tienda especializada en productos de piel y cuero", lat: -0.0019065, lng: -78.4543313, color: "#9c27b0" },
    { name: "Local 27 - Native Crafts", description: "Tienda de artesanías nativas", lat: -0.0019129, lng: -78.4546417, color: "#9c27b0" },
    { name: "Amor (n°83)", description: "Tienda de artesanías locales y productos regionales", lat: -0.0019516, lng: -78.4542599, color: "#9c27b0" },
    { name: "Warmi", description: "Tienda especializada en artesanías tradicionales andinas", lat: -0.0015892, lng: -78.4548581, color: "#9c27b0" },
    { name: "Local 42 - Maki Rurashka", description: "Tienda de productos rurales y artesanías locales", lat: -0.0020194, lng: -78.4543927, color: "#9c27b0" },
    { name: "Local 26 - Claya", description: "Tienda especializada en productos locales y artesanías tradicionales", lat: -0.0019348, lng: -78.454693, color: "#9c27b0" },
    { name: "Origenes Ecuador", description: "Tienda especializada en productos locales y artesanías tradicionales", lat: -0.0017468, lng: -78.4551706, color: "#9c27b0" },
    { name: "Ricon Musical", description: "Tienda especializada en productos musicales locales", lat: -0.0017475, lng: -78.4549667, color: "#9c27b0" },
    { name: "Local 95A - Huiñay", description: "Tienda de artesanías locales y productos regionales", lat: -0.0019342, lng: -78.4544108, color: "#9c27b0" },
    { name: "Haku Andean Chick", description: "Tienda especializada en productos andinos y artesanías tradicionales", lat: -0.0018487, lng: -78.4549573, color: "#9c27b0" },
    { name: "Tienda Pichincha", description: "Tienda de productos locales y artesanías tradicionales", lat: -0.0019104, lng: -78.4550271, color: "#9c27b0" },
  ],

  // Plazas
  plazas: [
    { name: "Plaza Cultura", description: "Plaza de eventos culturales", lat: -0.0021539, lng: -78.4537988, color: "#2bb446" },
    { name: "Plaza Central", description: "Plaza central del monumento", lat: -0.0021901, lng: -78.4546825, color: "#2bb446" },
    { name: "Plaza de colores", description: "Plaza con elementos decorativos de colores", lat: -0.00217, lng: -78.4541609, color: "#2bb446" },
    { name: "Arena top", description: "Arena de eventos especiales", lat: -0.0013358, lng: -78.4569879, color: "#2bb446" },
  ],

  // Estacionamiento
  estacionamiento: [
    { name: "Ciudad Mitad del mundo - Estacionamiento", description: "Estacionamiento del monumento", lat: -0.0026365, lng: -78.45301, color: "#0209d1" },
    { name: "Parking", description: "Estacionamiento general", lat: -0.0014961, lng: -78.4536585, color: "#0209d1" },
  ],
};

// MEJORA: Objeto de configuración para Títulos y Colores de botones
export const CATEGORY_DETAILS = {
  servicios: { label: "Servicios", color: "#ff0000" },
  banos: { label: "Baños", color: "#00e1ff" },
  atracciones_museos: { label: "Atracciones", color: "#ffc800" },
  restaurantes: { label: "Comida", color: "#583700" },
  tiendas_artesanias: { label: "Artesanías", color: "#9c27b0" },
  plazas: { label: "Plazas", color: "#2bb446" },
  estacionamiento: { label: "Parking", color: "#0209d1" }, // Cambié color para distinguir
};