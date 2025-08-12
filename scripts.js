// Importar la API de Twitter
import twitterAPI from './twitter-api.js';
// Importar funciones para manejar emails
import {
  saveEmailToJson,
  showSubscriptionConfirmation,
} from './email-json-handler.js';

// FAQ functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const answer = faqItem.querySelector('.faq-answer');
  const arrow = element.querySelector('.faq-arrow');

  // Close all other FAQs
  document.querySelectorAll('.faq-item').forEach(item => {
    if (item !== faqItem) {
      item.querySelector('.faq-answer').classList.remove('active');
      item.querySelector('.faq-arrow').classList.remove('active');
    }
  });

  // Toggle current FAQ
  answer.classList.toggle('active');
  arrow.classList.toggle('active');
}

// Scroll to final CTA
function scrollToFinalCTA() {
  document.getElementById('finalCTA').scrollIntoView({
    behavior: 'smooth',
  });
}

// Exponer la función globalmente para que pueda ser accedida desde el HTML
window.scrollToFinalCTA = scrollToFinalCTA;
window.toggleFAQ = toggleFAQ;

// Form submissions
document.getElementById('heroForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.querySelector('.email-input').value;
  handleFormSubmission(email, 'hero');
});

document.getElementById('finalForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.querySelector('.final-email-input').value;
  handleFormSubmission(email, 'final');
});

async function handleFormSubmission(email, source) {
  try {
    // Guardar el email en email.json
    const saved = await saveEmailToJson(email, source);

    if (saved) {
      // Mostrar popup de confirmación
      showSubscriptionConfirmation(email);
    } else {
      // Si hay un error, mostrar un mensaje de error
      alert(
        'Ha ocurrido un error al guardar tu email. Por favor, inténtalo de nuevo.'
      );
    }

    // Registrar en consola para desarrollo
    console.log('Form submitted:', {
      email,
      source,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error al procesar el formulario:', error);
    alert(
      'Ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo.'
    );
  }
}

// Función para compartir en Twitter
async function shareOnTwitter(event) {
  // Obtener el botón que fue clickeado
  const button = event.currentTarget;

  // Cambiar el texto del botón para indicar que está procesando
  const originalText = button.textContent;
  button.textContent = 'Compartiendo...';
  button.disabled = true;

  try {
    // Obtener el título del recurso (el texto del h3 más cercano)
    const resourceCard = button.closest('.resource-card');
    const resourceTitle = resourceCard
      ? resourceCard.querySelector('h3').textContent
      : '';

    // Personalizar el mensaje con el título del recurso
    const message = `¡Acabo de desbloquear "${resourceTitle}" en MetaSoccer Community! La plataforma definitiva para dominar el juego del futuro. #MetaSoccer #GameFi #P2E`;

    // Obtener la descripción del recurso (el texto del p más cercano)
    const resourceDescription = resourceCard
      ? resourceCard.querySelector('p').textContent.trim()
      : '';

    // Generar un nombre de usuario aleatorio para evitar pedir datos al usuario
    const randomUsername = `user_${Math.floor(Math.random() * 10000)}`;

    // Obtener el email del usuario si está disponible
    let userEmail = '';
    const emailInput =
      document.querySelector('.email-input') ||
      document.querySelector('.final-email-input');
    if (emailInput && emailInput.value) {
      userEmail = emailInput.value;
    }

    // Mostrar mensaje informativo al usuario
    button.textContent = 'Comparte en la ventana emergente...';

    try {
      // Llamar a la API de Twitter para compartir el post
      // Esta promesa se resolverá solo cuando el usuario complete el proceso de compartir
      const result = await twitterAPI.sharePost(
        message,
        randomUsername,
        userEmail,
        resourceTitle
      );

      // Si llegamos aquí, el usuario ha completado el proceso de compartir
      if (result.success) {
        // Cambiar el texto del botón para indicar éxito
        button.textContent = '¡Compartido con éxito!';

        // Guardar información del recurso en localStorage para recuperarla en la página de agradecimiento
        localStorage.setItem('sharedResourceTitle', resourceTitle);
        localStorage.setItem('sharedResourceDescription', resourceDescription);

        // Pequeña pausa para que el usuario vea el mensaje de éxito
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Redirigir a la página de agradecimiento con parámetros en la URL
        const redirectUrl = `${result.redirectUrl}?title=${encodeURIComponent(
          resourceTitle
        )}&desc=${encodeURIComponent(resourceDescription)}`;
        window.location.href = redirectUrl;
      } else {
        // Mostrar mensaje de error
        alert(`Error: ${result.message}`);

        // Restaurar el botón
        button.textContent = originalText;
        button.disabled = false;
      }
    } catch (twitterError) {
      // Este error ocurre si el usuario cierra la ventana sin compartir o si hay un timeout
      console.error('Error en el proceso de compartir:', twitterError);
      alert(`No se completó el proceso de compartir: ${twitterError.message}`);

      // Restaurar el botón
      button.textContent = originalText;
      button.disabled = false;
    }
  } catch (error) {
    console.error('Error al preparar el proceso de compartir:', error);
    alert(
      'Ha ocurrido un error al intentar compartir en Twitter. Por favor, inténtalo de nuevo.'
    );

    // Restaurar el botón
    button.textContent = originalText;
    button.disabled = false;
  }
}

// Resource buttons
document.querySelectorAll('.resource-button').forEach(button => {
  button.addEventListener('click', shareOnTwitter);
});

// Smooth scroll animations on load
window.addEventListener('load', function () {
  const elements = document.querySelectorAll('.fade-in-up');
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Initialize fade-in elements
document.querySelectorAll('.fade-in-up').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
});