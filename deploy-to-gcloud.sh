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

# ID del proyecto
PROJECT_ID="starry-core-401213"

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

# Credenciales de Twitter
TWITTER_API_KEY="kVpOupfAGVL6AIlcsI70i4OZa"
TWITTER_API_KEY_SECRET="BTUN58AHIrtzOpvlGbgRXXQC7rdoxIczG73p7fl9RKGBjWpG94"
TWITTER_ACCESS_TOKEN="GzUdQ8NOtkcvFxa7wflaTrloPNQovqzVlnhkJMU6"
TWITTER_ACCESS_TOKEN_SECRET="X2NqzBvNCXbNRgAYSMZWCfC7rj9jw5atPRZuu10mtpEBp"
TWITTER_CLIENT_ID="Mm5XSl9SQWFVR1REZ0NRMVZvZ046MTpjaQ"
TWITTER_CLIENT_SECRET="l2Vgcul-_sIxLogK9MZoaQxeoZXv8GyKJgeCz-a07gCHsi3k5p"

# Actualizar app.yaml con las credenciales
echo "Actualizando app.yaml con las credenciales..."
sed -i "s/TWITTER_API_KEY: .*/TWITTER_API_KEY: '$TWITTER_API_KEY'/" app.yaml
sed -i "s/TWITTER_API_KEY_SECRET: .*/TWITTER_API_KEY_SECRET: '$TWITTER_API_KEY_SECRET'/" app.yaml
sed -i "s/TWITTER_ACCESS_TOKEN: .*/TWITTER_ACCESS_TOKEN: '$TWITTER_ACCESS_TOKEN'/" app.yaml
sed -i "s/TWITTER_ACCESS_TOKEN_SECRET: .*/TWITTER_ACCESS_TOKEN_SECRET: '$TWITTER_ACCESS_TOKEN_SECRET'/" app.yaml
sed -i "s/TWITTER_CLIENT_ID: .*/TWITTER_CLIENT_ID: '$TWITTER_CLIENT_ID'/" app.yaml
sed -i "s/TWITTER_CLIENT_SECRET: .*/TWITTER_CLIENT_SECRET: '$TWITTER_CLIENT_SECRET'/" app.yaml

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