# MetaSoccer Community

Plataforma web para la comunidad de MetaSoccer, que permite a los usuarios registrarse en una lista de espera y desbloquear recursos compartiendo en Twitter.

## Requisitos

- Node.js 14 o superior
- Cuenta de Google Cloud
- Cuenta de desarrollador de Twitter (para las API de Twitter)

## Configuración Local

1. Clona este repositorio:

   ```
   git clone <url-del-repositorio>
   cd metasoccer-community
   ```

2. Instala las dependencias:

   ```
   npm install
   ```

3. Configura las credenciales de Twitter:

   - Edita el archivo `twitter-config.js` y reemplaza los valores predeterminados con tus propias credenciales para desarrollo local.

4. Inicia el servidor de desarrollo:

   ```
   npm run dev
   ```

5. Abre tu navegador en `http://localhost:8080`

## Despliegue en Google Cloud

### Preparación

1. Crea un proyecto en Google Cloud Platform:

   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Habilita la API de App Engine

2. Instala Google Cloud SDK:

   - Sigue las instrucciones en [cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install)

3. Configura las credenciales de Twitter en Google Cloud:

   - En la consola de Google Cloud, ve a "App Engine" > "Settings" > "Environment Variables"
   - Configura las siguientes variables de entorno con tus credenciales de Twitter:
     - `TWITTER_API_KEY`
     - `TWITTER_API_KEY_SECRET`
     - `TWITTER_ACCESS_TOKEN`
     - `TWITTER_ACCESS_TOKEN_SECRET`
     - `TWITTER_CLIENT_ID`
     - `TWITTER_CLIENT_SECRET`

   Alternativamente, puedes editar el archivo `app.yaml` y reemplazar los valores predeterminados antes del despliegue.

### Despliegue

1. Inicia sesión en Google Cloud desde la terminal:

   ```
   gcloud auth login
   ```

2. Configura el proyecto:

   ```
   gcloud config set project [ID-DEL-PROYECTO]
   ```

3. Despliega la aplicación:

   ```
   gcloud app deploy
   ```

4. Abre la aplicación en el navegador:
   ```
   gcloud app browse
   ```

## Estructura del Proyecto

- `index.html` - Página principal
- `gracias.html` - Página de agradecimiento después de compartir en Twitter
- `styles.css` - Estilos CSS
- `scripts.js` - JavaScript principal
- `twitter-api.js` - Integración con la API de Twitter
- `twitter-config.js` - Configuración de credenciales de Twitter
- `email-json-handler.js` - Manejo de emails
- `x-json-handler.js` - Manejo de datos de Twitter
- `server.js` - Servidor Express
- `app.yaml` - Configuración de Google Cloud App Engine
- `package.json` - Dependencias y scripts

## Mantenimiento

### Almacenamiento de Datos

Los datos de emails y tweets se almacenan en archivos JSON en el directorio `data/`:

- `data/email.json` - Emails registrados
- `data/x.json` - Datos de Twitter

En producción, considera migrar a una base de datos como Firestore para mayor escalabilidad.

### Actualización de Credenciales

Si necesitas actualizar las credenciales de Twitter:

1. En desarrollo local: Edita el archivo `twitter-config.js`
2. En producción: Actualiza las variables de entorno en Google Cloud Console o edita `app.yaml` y vuelve a desplegar

## Soporte

Para soporte o preguntas, contacta a [tu-email@ejemplo.com]
