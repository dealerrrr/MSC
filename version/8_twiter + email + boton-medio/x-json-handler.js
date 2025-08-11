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
    // En un entorno de navegador, no podemos escribir directamente en archivos del sistema
    // Por lo tanto, simularemos la escritura usando localStorage

    // Obtener datos existentes o inicializar un array vacío
    const existingData = JSON.parse(
      localStorage.getItem('x_json_data') || '[]'
    );

    // Agregar timestamp
    const userToSave = {
      ...userData,
      timestamp: new Date().toISOString(),
    };

    // Agregar el nuevo usuario
    existingData.push(userToSave);

    // Guardar la lista actualizada
    localStorage.setItem('x_json_data', JSON.stringify(existingData));

    console.log('Datos guardados en x.json:', userToSave);

    // En un entorno real, aquí se enviaría la información al servidor
    // para guardarla en x.json mediante una petición AJAX o fetch
    console.log(
      'En un entorno de producción, esta información se guardaría en x.json'
    );

    return true;
  } catch (error) {
    console.error('Error al guardar datos en x.json:', error);
    return false;
  }
}

// Nota: Las funciones para obtener y exportar datos se han eliminado ya que no se utilizan en la implementación actual
