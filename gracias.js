// Obtener información del recurso compartido desde la URL
window.addEventListener('DOMContentLoaded', function () {
  // Intentar obtener el recurso de la URL o localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const resourceTitle =
    urlParams.get('title') ||
    localStorage.getItem('sharedResourceTitle') ||
    'Recurso Desbloqueado';
  const resourceDescription =
    urlParams.get('desc') ||
    localStorage.getItem('sharedResourceDescription') ||
    'Ahora tienes acceso a este contenido exclusivo.';

  // Actualizar la página con la información del recurso
  document.getElementById('resourceTitle').textContent = resourceTitle;
  document.getElementById('resourceDescription').textContent =
    resourceDescription;

  // Configurar el botón de acceso
  document
    .getElementById('accessButton')
    .addEventListener('click', function () {
      showAccessConfirmation(resourceTitle, resourceDescription); // Call custom popup
    });
});

/**
 * Muestra un popup de confirmación de acceso al recurso
 * @param {string} title - Título del recurso
 * @param {string} description - Descripción del recurso
 */
function showAccessConfirmation(title, description) {
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
  popup.className = 'access-popup'; // Different class name
  popup.style.backgroundColor = '#0a0a15'; // Dark background
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
  closeButton.style.color = 'white'; // White for visibility on dark background
  closeButton.onclick = () => {
    document.body.removeChild(overlay);
  };

  // Contenido del popup
  const popupTitle = document.createElement('h2');
  popupTitle.textContent = '¡Acceso al Recurso!';
  popupTitle.style.color = '#ff6b35'; // Orange title
  popupTitle.style.marginBottom = '15px';

  const message = document.createElement('p');
  message.innerHTML = `Has desbloqueado: <strong>${title}</strong>`;
  message.style.marginBottom = '10px';
  message.style.fontSize = '16px';
  message.style.lineHeight = '1.5';
  message.style.color = 'white'; // White for visibility on dark background

  const subMessage = document.createElement('p');
  subMessage.textContent = description;
  subMessage.style.marginBottom = '25px';
  subMessage.style.fontSize = '14px';
  subMessage.style.opacity = '0.8';
  subMessage.style.color = 'white'; // White for visibility on dark background

  // Botón de aceptar (similar al de email-json-handler.js)
  const acceptButton = document.createElement('button');
  acceptButton.textContent = 'Entendido';
  acceptButton.style.background = 'linear-gradient(135deg, #1e40af, #3b82f6)'; // Blue gradient
  acceptButton.style.color = 'white';
  acceptButton.style.border = 'none';
  acceptButton.style.borderRadius = '4px';
  acceptButton.style.padding = '10px 25px';
  acceptButton.style.fontSize = '16px';
  acceptButton.style.cursor = 'pointer';
  acceptButton.style.transition = 'all 0.3s ease';
  acceptButton.onmouseover = () => {
    acceptButton.style.background = 'linear-gradient(135deg, #3b82f6, #1e40af)';
  };
  acceptButton.onmouseout = () => {
    acceptButton.style.background = 'linear-gradient(135deg, #1e40af, #3b82f6)';
  };
  acceptButton.onclick = () => {
    document.body.removeChild(overlay);
  };

  // Ensamblar el popup
  popup.appendChild(closeButton);
  popup.appendChild(popupTitle);
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