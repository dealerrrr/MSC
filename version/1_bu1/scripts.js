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

// Resource buttons
document.querySelectorAll('.resource-button').forEach(button => {
  button.addEventListener('click', function () {
    alert(
      '¡Excelente! Te hemos añadido a la lista VIP. Recibirás tu invitación al Discord exclusivo en las próximas 24 horas.'
    );
  });
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
