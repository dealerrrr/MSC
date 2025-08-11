# Funcionalidad "Compartir en Twitter para Desbloquear"

Este proyecto implementa una funcionalidad que permite a los usuarios desbloquear contenido exclusivo al compartir un mensaje en Twitter.

## Características Principales

- Al hacer clic en el botón "Compartir en Twitter para Desbloquear", se realiza un post en Twitter automáticamente
- La información del usuario se guarda en un archivo x.json
- Después de compartir, se redirige a una página de agradecimiento con un enlace de descarga

## Archivos Principales

- `landing.html`: Página principal con los botones para compartir en Twitter
- `scripts.js`: Lógica principal del sitio, incluida la función para compartir en Twitter
- `twitter-api.js`: Maneja la interacción con la API de Twitter
- `twitter-config.js`: Configuración de la API de Twitter (claves, tokens, etc.)
- `x-json-handler.js`: Maneja el guardado de datos en x.json
- `gracias.html`: Página de agradecimiento después de compartir

## Configuración

Para configurar la API de Twitter, edita el archivo `twitter-config.js` con tus propias claves y tokens:

```javascript
const twitterConfig = {
  apiKey: 'TU_API_KEY',
  apiKeySecret: 'TU_API_KEY_SECRET',
  accessToken: 'TU_ACCESS_TOKEN',
  accessTokenSecret: 'TU_ACCESS_TOKEN_SECRET',
  clientId: 'TU_CLIENT_ID',
  clientSecret: 'TU_CLIENT_SECRET',

  // Texto predeterminado para compartir
  defaultShareText: 'Tu texto predeterminado aquí',

  // URL de redirección después de compartir
  redirectUrl: 'gracias.html',
};
```

## Cómo Funciona

1. El usuario hace clic en el botón "Compartir en Twitter para Desbloquear"
2. Se genera un nombre de usuario aleatorio (para evitar pedir datos al usuario)
3. Se abre una ventana popup con la interfaz de Twitter para que el usuario realice el post
4. Cuando el usuario completa el post y cierra la ventana, se detecta automáticamente
5. Se guarda la información en x.json (simulado con localStorage en esta implementación)
6. Se redirige a la página de agradecimiento con información sobre el recurso desbloqueado

## Implementación del Posteo en Twitter

La implementación actual utiliza la API Web Intent de Twitter, que abre una ventana popup donde el usuario puede realizar el post. Esta es la forma más sencilla de implementar la funcionalidad sin necesidad de configurar OAuth.

Para una implementación más avanzada usando la API oficial de Twitter:

1. Registra tu aplicación en el [Portal de Desarrolladores de Twitter](https://developer.twitter.com/en/portal/dashboard)
2. Obtén las claves y tokens necesarios (API Key, API Key Secret, Access Token, Access Token Secret)
3. Configura estos valores en el archivo `twitter-config.js`
4. Instala una biblioteca como `twitter-api-v2` para manejar la autenticación y las llamadas a la API
5. Modifica la función `sharePost` en `twitter-api.js` para usar esta biblioteca

## Implementación del Guardado en x.json

En un entorno de producción, el guardado en x.json se implementaría en el servidor. En esta implementación de demostración, se simula usando localStorage.

Para implementar el guardado real en un archivo x.json en el servidor:

1. Crea un endpoint en tu servidor que reciba los datos del usuario
2. El endpoint debe escribir los datos en un archivo x.json
3. Modifica la función `saveToXJson` en `x-json-handler.js` para enviar los datos al endpoint del servidor mediante una petición AJAX o fetch

Ejemplo de implementación en el servidor (Node.js):

```javascript
const fs = require('fs');

app.post('/api/save-to-x-json', (req, res) => {
  const userData = req.body;

  // Leer el archivo existente
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync('x.json', 'utf8'));
  } catch (error) {
    // El archivo no existe o está vacío
  }

  // Agregar el nuevo usuario
  existingData.push({
    ...userData,
    timestamp: new Date().toISOString(),
  });

  // Guardar el archivo actualizado
  fs.writeFileSync('x.json', JSON.stringify(existingData, null, 2));

  res.json({ success: true });
});
```

## Prueba de la Funcionalidad

Para probar la funcionalidad:

1. Abre `landing.html` en un navegador
2. Haz clic en uno de los botones "Compartir en Twitter para Desbloquear"
3. Verifica que se simule el post en Twitter (aparecerá en la consola del navegador)
4. Verifica que se redirija a la página de agradecimiento
5. Para verificar que los datos se guardaron correctamente, abre la consola del navegador y ejecuta:
   ```javascript
   console.log(JSON.parse(localStorage.getItem('x_json_data')));
   ```
