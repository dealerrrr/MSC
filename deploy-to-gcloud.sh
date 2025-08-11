#!/bin/bash

# Script para desplegar la aplicación en Google Cloud App Engine

echo "=== Iniciando despliegue en Google Cloud App Engine ==="

# Verificar que gcloud CLI esté instalado
if ! command -v gcloud &> /dev/null; then
    echo "Error: Google Cloud SDK (gcloud) no está instalado. Por favor, instálalo para continuar."
    echo "Visita: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Verificar que el usuario esté autenticado en gcloud
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
    echo "No se ha detectado una cuenta activa en gcloud. Iniciando proceso de autenticación..."
    gcloud auth login
fi

# Solicitar ID del proyecto
read -p "Ingresa el ID del proyecto de Google Cloud: " PROJECT_ID

# Verificar que el proyecto exista
if ! gcloud projects describe $PROJECT_ID &> /dev/null; then
    echo "Error: El proyecto $PROJECT_ID no existe o no tienes acceso a él."
    exit 1
fi

# Configurar el proyecto
echo "Configurando proyecto $PROJECT_ID..."
gcloud config set project $PROJECT_ID

# Verificar que App Engine esté habilitado
if ! gcloud services list --enabled | grep -q appengine.googleapis.com; then
    echo "Habilitando API de App Engine..."
    gcloud services enable appengine.googleapis.com
fi

# Verificar que los archivos necesarios existan
if [ ! -f "app.yaml" ]; then
    echo "Error: No se encuentra app.yaml. Este archivo es necesario para el despliegue."
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "Error: No se encuentra package.json. Este archivo es necesario para el despliegue."
    exit 1
fi

if [ ! -f "server.js" ]; then
    echo "Error: No se encuentra server.js. Este archivo es necesario para el despliegue."
    exit 1
fi

# Verificar que los archivos minificados existan
if [ ! -f "styles.min.css" ]; then
    echo "Error: No se encuentra styles.min.css. Asegúrate de haber minificado los archivos CSS."
    exit 1
fi

if [ ! -f "scripts.min.js" ]; then
    echo "Error: No se encuentra scripts.min.js. Asegúrate de haber minificado los archivos JavaScript."
    exit 1
fi

# Configurar variables de entorno para Twitter API
echo "Configurando variables de entorno para Twitter API..."
echo "Nota: Estas credenciales se configurarán en Google Cloud, no se guardarán localmente."

read -p "Twitter API Key: " TWITTER_API_KEY
read -p "Twitter API Key Secret: " TWITTER_API_KEY_SECRET
read -p "Twitter Access Token: " TWITTER_ACCESS_TOKEN
read -p "Twitter Access Token Secret: " TWITTER_ACCESS_TOKEN_SECRET
read -p "Twitter Client ID: " TWITTER_CLIENT_ID
read -p "Twitter Client Secret: " TWITTER_CLIENT_SECRET

# Actualizar app.yaml con las credenciales
echo "Actualizando app.yaml con las credenciales..."
sed -i "s/TWITTER_API_KEY: \"tu_api_key\"/TWITTER_API_KEY: \"$TWITTER_API_KEY\"/" app.yaml
sed -i "s/TWITTER_API_KEY_SECRET: \"tu_api_key_secret\"/TWITTER_API_KEY_SECRET: \"$TWITTER_API_KEY_SECRET\"/" app.yaml
sed -i "s/TWITTER_ACCESS_TOKEN: \"tu_access_token\"/TWITTER_ACCESS_TOKEN: \"$TWITTER_ACCESS_TOKEN\"/" app.yaml
sed -i "s/TWITTER_ACCESS_TOKEN_SECRET: \"tu_access_token_secret\"/TWITTER_ACCESS_TOKEN_SECRET: \"$TWITTER_ACCESS_TOKEN_SECRET\"/" app.yaml
sed -i "s/TWITTER_CLIENT_ID: \"tu_client_id\"/TWITTER_CLIENT_ID: \"$TWITTER_CLIENT_ID\"/" app.yaml
sed -i "s/TWITTER_CLIENT_SECRET: \"tu_client_secret\"/TWITTER_CLIENT_SECRET: \"$TWITTER_CLIENT_SECRET\"/" app.yaml

# Instalar dependencias
echo "Instalando dependencias..."
npm install

# Desplegar en App Engine
echo "Desplegando en App Engine..."
gcloud app deploy

# Abrir la aplicación en el navegador
echo "Abriendo la aplicación en el navegador..."
gcloud app browse

echo "=== Despliegue completado ==="
echo "Tu aplicación está ahora disponible en: https://$PROJECT_ID.appspot.com"
