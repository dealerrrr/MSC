#!/bin/bash

# Script para probar la configuración localmente antes del despliegue en Google Cloud

echo "=== Iniciando prueba local de MetaSoccer Community ==="

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "Error: Node.js no está instalado. Por favor, instala Node.js para continuar."
    exit 1
fi

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    echo "Error: npm no está instalado. Por favor, instala npm para continuar."
    exit 1
fi

# Instalar dependencias
echo "Instalando dependencias..."
npm install

# Crear directorio de datos si no existe
if [ ! -d "data" ]; then
    echo "Creando directorio de datos..."
    mkdir data
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

# Verificar que los archivos HTML referencien los archivos minificados
if ! grep -q "styles.min.css" index.html; then
    echo "Advertencia: index.html no está referenciando styles.min.css."
fi

if ! grep -q "scripts.min.js" index.html; then
    echo "Advertencia: index.html no está referenciando scripts.min.js."
fi

if ! grep -q "styles.min.css" gracias.html; then
    echo "Advertencia: gracias.html no está referenciando styles.min.css."
fi

# Iniciar el servidor en modo desarrollo
echo "Iniciando servidor en modo desarrollo..."
echo "El servidor estará disponible en http://localhost:8080"
echo "Presiona Ctrl+C para detener el servidor"
NODE_ENV=development npm run dev

echo "=== Prueba local completada ==="
