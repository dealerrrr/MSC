/**
 * x-json-handler.js
 *
 * Este archivo maneja la escritura y lectura de datos en el archivo x.json
 * para almacenar información de usuarios que han compartido en Twitter.
 */

/**
 * Guarda datos de usuario en el archivo x.json
 * @param {Object} userData - Datos del usuario a guardar
 * @param {string} userData.username - Nombre de usuario de Twitter
 * @param {string} userData.email - Email del usuario (opcional)
 * @param {string} userData.resource - Recurso desbloqueado (opcional)
 * @param {string} userData.message - Mensaje compartido (opcional)
 * @returns {Promise<boolean>} - Promesa que se resuelve con true si el guardado fue exitoso
 */
export async function saveToXJson(userData) {
  try {
    // Agregar timestamp si no existe
    const userToSave = {
      ...userData,
      timestamp: userData.timestamp || new Date().toISOString(),
    };

    // Determinar si estamos en producción o desarrollo
    const isProduction =
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1';

    if (isProduction) {
      // En producción, enviar datos al servidor
      try {
        const response = await fetch('/api/save-twitter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userToSave),
        });

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }

        console.log('Datos de Twitter guardados en el servidor:', userToSave);
        return true;
      } catch (fetchError) {
        console.error('Error al enviar datos al servidor:', fetchError);
        return false;
      }
    } else {
      // En desarrollo, usar localStorage
      try {
        // Obtener datos existentes o inicializar un array vacío
        const existingData = JSON.parse(
          localStorage.getItem('x_json_data') || '[]'
        );

        // Agregar el nuevo usuario
        existingData.push(userToSave);

        // Guardar la lista actualizada
        localStorage.setItem('x_json_data', JSON.stringify(existingData));

        console.log(
          'Datos de Twitter guardados en localStorage (desarrollo):',
          userToSave
        );
        return true;
      } catch (localStorageError) {
        console.error('Error al guardar en localStorage:', localStorageError);
        return false;
      }
    }
  } catch (error) {
    console.error('Error al procesar datos de Twitter:', error);
    return false;
  }
}

// Nota: Las funciones para obtener y exportar datos se han eliminado ya que no se utilizan en la implementación actual
