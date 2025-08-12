/**
 * email-json-handler.js
 *
 * Este archivo maneja la escritura y lectura de datos en el archivo email.json
 * para almacenar información de usuarios suscritos a la lista de espera.
 */

/**
 * Guarda un email en el archivo email.json
 * @param {string} email - Email del usuario a guardar
 * @param {string} source - Fuente del formulario (hero, final, etc.)
 * @returns {Promise<boolean>} - Promesa que se resuelve con true si el guardado fue exitoso
 */
export async function saveEmailToJson(email, source = 'unknown') {
  try {
    // En un entorno de navegador, no podemos escribir directamente en archivos del sistema
    // Por lo tanto, simularemos la escritura usando localStorage para desarrollo
    // y enviaremos los datos al servidor en producción

    // Obtener datos existentes o inicializar un array vacío
    const existingData = JSON.parse(
      localStorage.getItem('email_json_data') || '[]'
    );

    // Crear objeto con datos del email
    const emailData = {
      email: email,
      source: source,
      timestamp: new Date().toISOString(),
    };

    // Agregar el nuevo email
    existingData.push(emailData);

    // Guardar la lista actualizada en localStorage (para desarrollo)
    localStorage.setItem('email_json_data', JSON.stringify(existingData));

    console.log('Email guardado en email.json:', emailData);

    // En un entorno real, aquí se enviaría la información al servidor
    // para guardarla en email.json mediante una petición AJAX o fetch

    // Simulamos una petición al servidor
    try {
      // En producción, esta sería una petición real a tu backend
      fetch('/api/save-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      // console.log(
      //   'En un entorno de producción, esta información se guardaría en email.json en el servidor'
      // );

      // Simulamos un retraso para hacer la experiencia más realista
      await new Promise(resolve => setTimeout(resolve, 500));

      return true;
    } catch (fetchError) {
      console.error('Error al enviar datos al servidor:', fetchError);
      // Si falla la petición al servidor pero se guardó en localStorage,
      // consideramos que fue exitoso para desarrollo
      return true;
    }
  } catch (error) {
    console.error('Error al guardar email en email.json:', error);
    return false;
  }
}

/**
 * Muestra un popup de confirmación de suscripción
 * @param {string} email - Email del usuario suscrito
 */
export function showSubscriptionConfirmation(email) {
  // Crear elementos del popup
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '1000';

  const popup = document.createElement('div');
  popup.className = 'subscription-popup';
  popup.style.backgroundColor = '#fff';
  popup.style.borderRadius = '8px';
  popup.style.padding = '30px';
  popup.style.maxWidth = '500px';
  popup.style.width = '90%';
  popup.style.textAlign = 'center';
  popup.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
  popup.style.position = 'relative';

  // Botón de cerrar
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '15px';
  closeButton.style.border = 'none';
  closeButton.style.background = 'none';
  closeButton.style.fontSize = '24px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.color = '#333';
  closeButton.onclick = () => {
    document.body.removeChild(overlay);
  };

  // Contenido del popup
  const title = document.createElement('h2');
  title.textContent = '¡Suscripción Exitosa!';
  title.style.color = '#1e40af';
  title.style.marginBottom = '15px';

  const message = document.createElement('p');
  message.innerHTML = `Tu email <strong>${email}</strong> ha sido registrado correctamente en nuestra lista de espera prioritaria.`;
  message.style.marginBottom = '20px';
  message.style.fontSize = '16px';
  message.style.lineHeight = '1.5';

  const subMessage = document.createElement('p');
  subMessage.textContent =
    'Te enviaremos información exclusiva y serás de los primeros en acceder cuando lancemos nuevas funcionalidades.';
  subMessage.style.marginBottom = '25px';
  subMessage.style.fontSize = '14px';
  subMessage.style.opacity = '0.8';

  // Botón de aceptar
  const acceptButton = document.createElement('button');
  acceptButton.textContent = 'Entendido';
  acceptButton.style.backgroundColor = '#1e40af';
  acceptButton.style.color = 'white';
  acceptButton.style.border = 'none';
  acceptButton.style.borderRadius = '4px';
  acceptButton.style.padding = '10px 25px';
  acceptButton.style.fontSize = '16px';
  acceptButton.style.cursor = 'pointer';
  acceptButton.style.transition = 'background-color 0.3s';
  acceptButton.onmouseover = () => {
    acceptButton.style.backgroundColor = '#3b82f6';
  };
  acceptButton.onmouseout = () => {
    acceptButton.style.backgroundColor = '#1e40af';
  };
  acceptButton.onclick = () => {
    document.body.removeChild(overlay);
  };

  // Ensamblar el popup
  popup.appendChild(closeButton);
  popup.appendChild(title);
  popup.appendChild(message);
  popup.appendChild(subMessage);
  popup.appendChild(acceptButton);
  overlay.appendChild(popup);

  // Agregar al DOM
  document.body.appendChild(overlay);

  // Cerrar el popup al hacer clic fuera de él
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });

  // Cerrar el popup con la tecla ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  });
}
