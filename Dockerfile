# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo en el contenedor
COPY . .

# Expone el puerto en el que la aplicación se ejecuta (si tu app usa un puerto específico, cámbialo)
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
