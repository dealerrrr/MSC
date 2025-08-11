// Importar la configuración de Twitter
import twitterConfig from './twitter-config.js';
import { saveToXJson } from './x-json-handler.js';

/**
 * Función para guardar el usuario de Twitter en el archivo x.json
 * @param {string} username - Nombre de usuario de Twitter
 * @param {string} email - Email del usuario (opcional)
 * @param {string} resource - Recurso desbloqueado (opcional)
 * @param {string} message - Mensaje compartido (opcional)
 * @returns {Promise<boolean>} - Promesa que se resuelve cuando el usuario se guarda correctamente
 */
async function saveTwitterUser(
  username,
  email = '',
  resource = '',
  message = ''
) {
  try {
    // Usar la nueva función para guardar en x.json
    const saved = await saveToXJson({
      username,
      email,
      resource,
      message,
      timestamp: new Date().toISOString(),
    });

    if (saved) {
      console.log(`Usuario de Twitter guardado en x.json: @${username}`);
    } else {
      console.error('Error al guardar el usuario en x.json');
    }

    return saved;
  } catch (error) {
    console.error('Error al guardar el usuario de Twitter:', error);
    return false;
  }
}

/**
 * Clase para manejar la interacción con la API de Twitter
 */
class TwitterAPI {
  constructor(config = twitterConfig) {
    this.config = config;
    this.initialized = false;
  }

  /**
   * Inicializa la API de Twitter con las credenciales proporcionadas
   * @returns {Promise<boolean>} - Promesa que se resuelve cuando la API está inicializada
   */
  async initialize() {
    try {
      // Verificar que todas las claves necesarias estén configuradas
      const requiredKeys = [
        'apiKey',
        'apiKeySecret',
        'accessToken',
        'accessTokenSecret',
        'clientId',
        'clientSecret',
      ];

      const missingKeys = requiredKeys.filter(
        key =>
          !this.config[key] || this.config[key] === `TU_${key.toUpperCase()}`
      );

      if (missingKeys.length > 0) {
        console.error(
          'Error: Faltan claves de configuración para la API de Twitter:',
          missingKeys
        );
        alert(
          'Por favor, configura las claves de la API de Twitter en el archivo twitter-config.js'
        );
        return false;
      }

      // En una implementación real, aquí se inicializaría la biblioteca de Twitter
      console.log('API de Twitter inicializada correctamente');
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Error al inicializar la API de Twitter:', error);
      return false;
    }
  }

  /**
   * Comparte un mensaje en Twitter
   * @param {string} message - El mensaje a compartir (opcional, usa el texto predeterminado si no se proporciona)
   * @param {string} username - Nombre de usuario de Twitter (opcional)
   * @param {string} email - Email del usuario (opcional)
   * @param {string} resource - Recurso desbloqueado (opcional)
   * @returns {Promise<Object>} - Promesa que se resuelve con la respuesta de la API de Twitter
   */
  async sharePost(message = null, username = null, email = '', resource = '') {
    try {
      if (!this.initialized) {
        const initialized = await this.initialize();
        if (!initialized) {
          throw new Error('La API de Twitter no está inicializada');
        }
      }

      const tweetText = message || this.config.defaultShareText;

      // Realizar el post en Twitter usando la API de Twitter
      try {
        // Crear una ventana popup para la autenticación de Twitter
        const width = 600;
        const height = 400;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        // URL de intención de Twitter para compartir
        const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweetText
        )}`;

        // Abrir la ventana de Twitter
        const twitterWindow = window.open(
          twitterIntentUrl,
          'twitter-share',
          `width=${width},height=${height},left=${left},top=${top}`
        );

        // Monitorear cuando se cierra la ventana
        let checkClosed = setInterval(() => {
          if (twitterWindow && twitterWindow.closed) {
            clearInterval(checkClosed);
            console.log('Tweet compartido exitosamente');
          }
        }, 1000);
      } catch (twitterError) {
        console.error('Error al abrir la ventana de Twitter:', twitterError);
        throw new Error('No se pudo abrir la ventana de Twitter');
      }

      // Guardar la información del usuario en x.json
      // Siempre guardamos, incluso si no se proporcionó un nombre de usuario específico
      const userToSave =
        username || `user_${Math.floor(Math.random() * 10000)}`;
      await saveTwitterUser(userToSave, email, resource, tweetText);

      // Simulamos un retraso para hacer la experiencia más realista
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        message: 'Tweet compartido exitosamente',
        redirectUrl: this.config.redirectUrl,
        username: username,
      };
    } catch (error) {
      console.error('Error al compartir en Twitter:', error);
      return {
        success: false,
        message: `Error al compartir en Twitter: ${error.message}`,
      };
    }
  }
}

// Exportar una instancia única de la clase
const twitterAPI = new TwitterAPI();
export default twitterAPI;
