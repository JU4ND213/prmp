function imgs(folder, files) {
  return files.map(file => `/images/${folder}/${file}`);
}

export const POINTS_BY_COLOR = {
  // Servicios 
  servicios: [
    { id: "centro_medico", name: "Centro Médico", description: "Asistencia médica", lat: -0.0024711, lng: -78.4541513, color: "#fe0000", icon: "local_hospital" },
    { id: "lactario", name: "Lactario", description: "Lactario para lactantes", lat: -0.0024388, lng: -78.4541916, color: "#ffd600", icon: "stroller" },
    { id: "cajero_bg", name: "Cajero banco Guayaquil", description: "Cajero automático del banco Guayaquil", lat: -0.0024103, lng: -78.4545376, color: "#c90b77", icon: "account_balance" },
    { id: "Hotel_Mitad_del_Mundo", name: "Hotel Mitad del Mundo", description: "Sumérgete en el encanto del Hotel Boutique Mitad del Mundo, donde tradiciones ecuatorianas y confort contemporáneo se unen en un lujoso oasis. Experimenta lo mejor de Ecuador en un único destino", lat: -0.002392598709234328, lng: -78.45463179284593, color: "#041a78", icon: "/images/log-foot.PNG" , imagenes: imgs("18.HOTEL", ["HOTEL.png"]) },
  ],

  // Baños
  banos: [
    { id: "bano_1", name: "Baño", description: "Lugar para hacer necesidades biológicas", lat: -0.002868, lng: -78.4540173, color: "#00e1ff", icon: "wc" },
    { id: "bano_2", name: "Baño", description: "Lugar para hacer necesidades biológicas", lat: -0.0025649, lng: -78.4555165, color: "#00e1ff", icon: "wc" },
    { id: "bano", name: "Baño", description: "Lugar para hacer necesidades biológicas", lat: -0.0018595, lng: -78.45485, color: "#00e1ff", icon: "wc" },
    { id: "bano_3", name: "Baño", description: "Lugar para hacer necesidades biológicas", lat: -0.0015322, lng: -78.4557687, color: "#00e1ff", icon: "wc" }, 
    { id: "bano_4", name: "Baño", description: "Lugar para hacer necesidades biológicas", lat:-0.0021758358447320275, lng: -78.45399906875143, color: "#00e1ff", icon: "wc" },
    { id: "bano_5", name: "Baño", description: "Lugar para hacer necesidades biológicas", lat:-0.002682773343595662, lng: -78.45421029270598, color: "#00e1ff", icon: "wc" },
  ],

  // Atracciones y Museos
  atracciones_museos: [
    { id: "boleteria", name: "Boletería Mitad del Mundo", description: "Boletería del monumento", lat: -0.0032344, lng: -78.4538643, color: "#ffc800", icon: "attractions" },
    { id: "pab_guayasamin", name: "Pabellón Guayasamin", description: "Descubre las obras del famoso pintor y escultor ecuatoriano Oswaldo Guayasamín", lat: -0.0030775, lng: -78.454844, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("10.PAVELLON GUAYASAMIN", ["IMG_8825.png", "IMG_8827.png", "IMG_8828.png", "IMG_8829.png", "IMG_8830.png", "IMG_8831.png", "IMG_8832.png", "IMG_8833.png", "IMG_8834.png"]) 
    },
    { id: "planetario",name: "Planetario", description: "Sumérgete en un fascinante viaje a través de las maravillas del universo y descubre el cosmos de una manera única", lat: -0.002893, lng: -78.4550475, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("11.PLANETARIO", ["20260413_211934886_iOS 1.png", "20260413_211951202_iOS 1.png", "20260413_212237656_iOS.png", "20260413_212249254_iOS.png", "20260413_212658167_iOS.png", "IMG_8835.png", "IMG_8840.png", "IMG_8842.png", "Planetario.png"]) 
    },
    { id: "museo_cacao", name: "Museo del cacao", description: "Conoce la historia de uno de los productos más exportados y valorados del Ecuador y prueba el mejor chocolate del mundo", lat: -0.001614, lng: -78.4551451, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("1.MUSEO CHOCOLATE", ["IMG_8713.png", "IMG_8714.png", "IMG_8715.png", "IMG_8716.png", "IMG_8717.png", "IMG_8718.png", "IMG_8719.png", "IMG_8720.png", "IMG_8721.png", "Muiseo cacao.png"]) 
    },
    { id: "legado_virtual", name: "Legado Virtual", description: "Conoce la provincia de Pichincha a través de gafas de realidad virtual", lat: -0.0026843, lng: -78.4552738, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("7.LEGADO VIERTUAL", ["IMG_8778.png", "IMG_8781.png", "IMG_8783.png", "IMG_8791.png", "Legado Virtual.png"]) 
    },
    { id: "experimento_huevo", name: "Experimento del Huevo", description: "Actividad lúdica sobre el huevo", lat: -0.0021183, lng: -78.4550887, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("3.EXPE.HUEVO", ["Exp Huevo.png", "IMG_8728.png", "IMG_8729.png", "IMG_8730.png", "IMG_8731.png", "IMG_8732.png", "IMG_8733.png", "IMG_8735.png", "IMG_8736.png"]) 
    },
    { id: "museo_cerveza", name: "Museo Cerveza Artesanal", description: "Descubre una experiencia sensorial única en el centro del planeta Adéntrate en el fascinante mundo de la cerveza artesanal y conoce su proceso de elaboración, desde los ingredientes ancestrales hasta los aromas y sabores inspirados en la riqueza natural del Ecuador", lat: -0.0017324, lng: -78.4545912, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("14.MUSEO CERVEZA", ["IMG_8874.png", "IMG_8873.png", "IMG_8872.png", "IMG_8875.png", "IMG_8876.png", "IMG_8877.png", "IMG_8878.png", "IMG_8879.png", "IMG_8880.png", "IMG_8881.png", "IMG_8882.png", "IMG_8883.png", "IMG_8884.png", "IMG_8885.png", "IMG_8886.png", "IMG_8887.png", "IMG_8888.png", "IMG_8889.png", "Museo Cerveza.png"]) 
    },
    { id: "pabellon_francia", name: "Pabellón de Francia", description: "Conoce los principales aportes de la primera y segunda Misión Geodésica Hispano-Francesa", lat: -0.0031023, lng: -78.4550493, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("9.PABELLON FRANCIA", ["IMG_8813.png", "IMG_8815.png", "IMG_8816.png", "IMG_8817.png", "IMG_8818.png", "IMG_8819.png", "IMG_8820.png", "IMG_8821.png", "IMG_8822.png", "IMG_8823.png", "IMG_8824.png"]) 
    },
    { id: "pabellon_ecuador", name: "Pabellón Ecuador", description: "Información turística y gastronómica de las provincias del Ecuador", lat: -0.0029697, lng: -78.4552645, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("8.PABELLON ECUADOR", ["IMG_8801.png", "IMG_8802.png", "IMG_8803.png", "IMG_8804.png", "IMG_8805.png", "IMG_8806.png", "IMG_8807.png", "IMG_8808.png", "IMG_8809.png", "IMG_8810.png", "IMG_8811.png", "IMG_8812.png"]) 
    },
    { id: "iglesia_mitad_mundo", name: "Capilla Mitad del Mundo", description: "Conoce la única capilla de estilo colonial atravesada por la línea ecuatorial", lat: -0.0021777, lng: -78.4543686, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("17.CAPILLA", ["CAPILLA.png"]) 
    },
    { id: "tiangues",name: "Tiangues", description: "Área de tiangues con exhibiciones culturales", lat: -0.002409, lng: -78.4545765, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("4.TIANGUES", ["IMG_8739.png", "IMG_8742.png", "IMG_8743.png", "IMG_8744.png", "IMG_8745.png", "IMG_8746.png", "IMG_8747.png", "IMG_8756.png", "IMG_8757.png", "IMG_8758.png", "IMG_8759.png"]) 
    },
    { id: "zona_llamas", name: "Zona de llamas", description: "Observa de cerca a estos amigables habitantes de los Andes y aprende más sobre ellos", lat: -0.0016606417341177837, lng: -78.4564242259298, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("6.ZONA DE LLAMAS", ["IMG_8768.png", "IMG_8769.png", "IMG_8770.png", "IMG_8771.png", "IMG_8772.png", "IMG_8773.png", "IMG_8774.png", "IMG_8775.png", "IMG_8776.png", "IMG_8777.png"]) 
    },
    { id: "tren_mitad_mundo", name: "Tren Mitad del Mundo", description: "Embárcate en una experiencia única a bordo del Tren Turístico Ciudad Mitad del Mundo Disfruta de recorridos continuos de 15 minutos por trayecto y descubre, de una manera diferente, la magia del centro del planeta", lat: -0.0016097, lng: -78.4541643, color: "#ffc800", icon: "attractions" },
    { id: "viviendas_ancestrales", name: "Viviendas ancestrales", description: "Explora y descubre los métodos constructivos de las viviendas ancestrales de la Costa del Pacífico, los Andes y la Amazonía", lat: -0.0026562, lng: -78.4537317, color: "#ffc800", icon: "attractions", 
      imagenes: imgs("13.VIVI.ANCESTRALES", ["Viviendas.png", "IMG_8852.png", "IMG_8854.png", "IMG_8856.png", "IMG_8857.png", "IMG_8861.png", "IMG_8862.png", "IMG_8865.png", "IMG_8867.png", "IMG_8871.png"]) 
    },
    { id: "inti_raymi", name: "Inti Raymi Fiesta del sol", description: "Fiesta del sol celebrada en el monumento", lat: -0.0029441, lng: -78.454315, color: "#ffc800", icon: "attractions" },
    { id: "Monumento", name: "Monumento a la Mitad del Mundo", description: "Visita el emblemático monumento construido en honor a la primera y segunda Misión Geodésica Hispano-Francesa", lat: -0.0021191507224225577, lng: -78.45583279786655 , color: "#ffc800", icon: "attractions", 
      imagenes: imgs("15.MONUMENRO E INTERIOR", ["Mitad_del_Mundo_01.png", "IMG_9046.png", "IMG_9085.png", "IMG_9087.png"]) 
    },
  ],

  // Restaurantes
  restaurantes: [
    { id: "nuca_llacta", name: "Ñuca Llacta Restaurant", description: "Comida tradicional ecuatoriana", lat: -0.0024445, lng: -78.4543661, color: "#583700", icon: "restaurant", menu: ["cuy", "fritada", "locro de papa", "empanadas"] },
    { id: "restaurante", name: "RESTAURANTE", description: "Restaurante general con variedad de platos", lat: -0.0020385, lng: -78.4544344, color: "#583700", icon: "restaurant", menu: ["humitas", "caldo de gallina", "crema de zanahoria", "pristiños"]},
    { id: "calima", name: "Calima", description: "Restaurante con menú regional", lat: -0.0015815, lng: -78.4549402, color: "#583700", icon: "restaurant", menu: ["seco de chivo", "arroz con menestra", "canelazo", "morocho"] },
    { id: "cafe_sinchi_warmi", name: "Café Sinchi Warmi", description: "Cafetería con ambiente cálido", lat: -0.0017107, lng: -78.4552719, color: "#583700", icon: "restaurant", menu: ["café", "té", "smoothies"] },
    { id: "raqeri_cacao", name: "raqeri cacao", description: "Cafetería especializada en cacao", lat: -0.0015384, lng: -78.4553481, color: "#583700", icon: "restaurant", menu: ["cacao", "chocolate", "postres"] },
    { id: "restaurante_balcon_al_mundo", name: "Restaurante Balcon al Mundo", description: "Vista panorámica al monumento", lat: -0.0024231, lng: -78.4547545, color: "#583700", icon: "restaurant", menu: ["platos principales", "ensaladas", "bebidas"] },
    { id: "el_orgánico_star_coffee", name: "El Orgánico Star Coffee", description: "Cafetería especializada en café orgánico", lat: -0.0018819, lng: -78.4545454, color: "#583700", icon: "restaurant", menu: ["café orgánico", "tés", "smoothies"] },
    { id: "cafe_guayasamin", name: "Café Guayasamin", description: "Cafetería con productos locales", lat: -0.0022184, lng: -78.4550409, color: "#583700", icon: "restaurant", menu: ["café local", "postres", "bebidas"] },
    { id: "tienda_delicatessen_rosita", name: "Tienda Delicatessen Rosita", description: "Tienda de productos gourmet", lat: -0.0022465, lng: -78.4540331, color: "#583700", icon: "restaurant", menu: ["productos gourmet", "quesos", "vinos"] },
  ],

  // Tiendas
  tiendas_artesanias: [
    { id: "piel_y_cuero", name: "Piel y Cuero", description: "Productos de piel y cuero", lat: -0.0019065, lng: -78.4543313, color: "#9c27b0", icon: "local_convenience_store" },
    { id: "local_27_native_crafts", name: "Local 27 - Native Crafts", description: "Tienda de artesanías nativas", lat: -0.0019129, lng: -78.4546417, color: "#9c27b0", icon: "local_convenience_store" },
    { id: "amor_n83", name: "Amor (n°83)", description: "Artesanías locales y productos regionales", lat: -0.0019516, lng: -78.4542599, color: "#9c27b0", icon: "local_convenience_store" },
    { id: "warmi", name: "Warmi", description: "Artesanías tradicionales andinas", lat: -0.0015892, lng: -78.4548581, color: "#9c27b0", icon: "local_convenience_store" },
    { id: "local_42_maki_rurashka", name: "Local 42 - Maki Rurashka", description: "Productos rurales y artesanías locales", lat: -0.0020194, lng: -78.4543927, color: "#9c27b0", icon: "local_convenience_store" },
    { id: "local_26_claya", name: "Local 26 - Claya", description: "Productos locales y artesanías tradicionales", lat: -0.0019348, lng: -78.454693, color: "#9c27b0", icon: "local_convenience_store" },
    { id: "origenes_ecuador", name: "Origenes Ecuador", description: "Productos locales y artesanías tradicionales", lat: -0.0017468, lng: -78.4551706, color: "#9c27b0", icon: "local_convenience_store" },
    { id: "ricon_musical", name: "Ricon Musical", description: "Productos musicales locales", lat: -0.0017475, lng: -78.4549667, color: "#9c27b0", icon: "local_convenience_store" },
    { id: "local_95a_huiñay", name: "Local 95A - Huiñay", description: "Artesanías locales y productos regionales", lat: -0.0019342, lng: -78.4544108, color: "#9c27b0", icon: "local_convenience_store" },
    { id: "haku_andean_chick", name: "Haku Andean Chick", description: "Productos andinos y artesanías tradicionales", lat: -0.0018487, lng: -78.4549573, color: "#9c27b0", icon: "local_convenience_store" },
    { id: "tienda_pichincha", name: "Tienda Pichincha", description: "Productos locales y artesanías tradicionales", lat: -0.0019104, lng: -78.4550271, color: "#9c27b0", icon: "local_convenience_store", 
      imagenes: imgs("2.TIENDA PICHINCHA", ["IMG_8722.png", "IMG_8723.png", "IMG_8724.png", "IMG_8725.png", "IMG_8726.png", "Tienda pichincha.png"]) 
    },
  ],

  // Plazas
  plazas: [
    { id: "plaza_cultura", name: "Plaza Cultural", description: "Escenario para diversos espectáculos culturales y artísticos", lat: -0.0021539, lng: -78.4537988, color: "#2bb446", icon: "park" },
    { id: "plaza_central", name: "Plaza Central", description: "El corazón de la Ciudad Mitad del Mundo, donde la cultura, la historia y los principales espectáculos culturales cobran vida justo en el centro del planeta", lat: -0.0021901, lng: -78.4546825, color: "#2bb446", icon: "park" },
    { id: "plaza_de_colores", name: "Plaza de colores", description: "Plaza con elementos decorativos de colores", lat: -0.00217, lng: -78.4541609, color: "#2bb446", icon: "park" },
    { id: "arena_top", name: "Arena top", description: "Arena de eventos especiales", lat: -0.0013358, lng: -78.4569879, color: "#2bb446", icon: "park" },
  ],

  // Estacionamiento
  estacionamiento: [
    { id: "estacionamiento_principal", name: "Estacionamiento Principal", description: "Estacionamiento del monumento", lat: -0.0026365, lng: -78.45301, color: "#0209d1", icon: "local_parking" },
    { id: "parking", name: "Parking", description: "Estacionamiento general", lat: -0.0014961, lng: -78.4536585, color: "#0209d1", icon: "local_parking" },
  ],
};

export const CATEGORY_DETAILS = {
  servicios: { label: "Servicios", color: "#ff0000", icon: "local_hospital" },
  banos: { label: "Baños", color: "#00e1ff", icon: "wc" },
  atracciones_museos: { label: "Atracciones", color: "#ffc800", icon: "attractions" },
  restaurantes: { label: "Comida", color: "#583700", icon: "restaurant" },
  tiendas_artesanias: { label: "Artesanías", color: "#9c27b0", icon: "local_convenience_store" },
  plazas: { label: "Plazas", color: "#2bb446", icon: "park" },
  estacionamiento: { label: "Parking", color: "#0209d1", icon: "local_parking" },
};