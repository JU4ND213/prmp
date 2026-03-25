# ==========================================
# Etapa 1: Construcción (Build)
# ==========================================
# Usamos una imagen de Node.js ligera
FROM node:22-alpine AS build

# Creamos un directorio de trabajo dentro del contenedor
WORKDIR /app
 
# Copiamos los archivos de dependencias primero (para aprovechar el caché de Docker)
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código de tu proyecto prmp
COPY . .

# Construimos la aplicación de Vite (esto genera la carpeta /dist)
RUN npm run build

# ==========================================
# Etapa 2: Servidor Web (Producción)
# ==========================================
# Usamos Nginx, un servidor web rapidísimo y ligero
FROM nginx:alpine

# Copiamos la carpeta 'dist' generada en la Etapa 1 a la carpeta pública de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 (el puerto web por defecto)
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]