// Configuración de la API de Twitter
// En producción, estas credenciales se obtienen de variables de entorno configuradas en Google Cloud
const isProduction = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production';

// Función para obtener un valor de configuración, con fallback para desarrollo local
function getConfigValue(envName, defaultValue) {
  if (isProduction && typeof process !== 'undefined' && process.env) {
    return process.env[envName] || defaultValue;
  }
  return defaultValue;
}

const twitterConfig = {
  // Claves de API (obtenidas de https://developer.twitter.com/en/portal/dashboard)
  apiKey: getConfigValue('TWITTER_API_KEY', ''),
  apiKeySecret: getConfigValue('TWITTER_API_KEY_SECRET', ''),

  // Tokens de acceso (obtenidos después de crear una App en Twitter Developer Portal)
  accessToken: getConfigValue('TWITTER_ACCESS_TOKEN', ''),
  accessTokenSecret: getConfigValue('TWITTER_ACCESS_TOKEN_SECRET', ''),

  // ID de cliente OAuth 2.0 (para autenticación)
  clientId: getConfigValue('TWITTER_CLIENT_ID', ''),
  clientSecret: getConfigValue('TWITTER_CLIENT_SECRET', ''),

  // Texto predeterminado para compartir (puedes modificarlo según tus necesidades)
  defaultShareText:
    '¡Estoy explorando MetaSoccer Community! La plataforma definitiva para dominar el juego del futuro. #MetaSoccer #GameFi #P2E',

  // URL de redirección después de compartir
  redirectUrl: 'gracias.html',
};

// No modificar esta línea
export default twitterConfig;
