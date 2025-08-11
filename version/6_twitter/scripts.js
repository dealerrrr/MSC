// Importar la API de Twitter
import twitterAPI from './twitter-api.js';

// FAQ functionality
function toggleFAQ(index) {
  const faqItems = document.querySelectorAll('.faq-item');
  const currentItem = faqItems[index];
  const answer = currentItem.querySelector('.faq-answer');
  const arrow = currentItem.querySelector('.faq-arrow');

  // Close all other FAQs
  faqItems.forEach((item, i) => {
    if (i !== index) {
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

function handleFormSubmission(email, source) {
  // Simulate form submission
  alert(
    `¡Genial! Te hemos enviado un email de confirmación a ${email}. Revisa tu bandeja de entrada y spam.`
  );

  // In a real implementation, you would send this data to your backend
  console.log('Form submitted:', {
    email,
    source,
    timestamp: new Date(),
  });
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

    // Llamar a la API de Twitter para compartir el post
    const result = await twitterAPI.sharePost(
      message,
      randomUsername,
      userEmail,
      resourceTitle
    );

    if (result.success) {
      // Guardar información del recurso en localStorage para recuperarla en la página de agradecimiento
      localStorage.setItem('sharedResourceTitle', resourceTitle);
      localStorage.setItem('sharedResourceDescription', resourceDescription);

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
  } catch (error) {
    console.error('Error al compartir en Twitter:', error);
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
