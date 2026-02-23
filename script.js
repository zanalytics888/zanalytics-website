// ========================================
// Navbar scroll effect
// ========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ========================================
// Mobile nav toggle
// ========================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ========================================
// Scroll reveal animations
// ========================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

// Apply fade-in to elements
const animatedSelectors = [
  '.hero-content',
  '.hero-stats-grid',
  '.stripe-label',
  '.stripe-text',
  '.proof-item',
  '.about-content',
  '.about-visual',
  '.contact-left',
  '.contact-form'
];

document.querySelectorAll(animatedSelectors.join(', ')).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Stagger proof cards within each stripe
document.querySelectorAll('.stripe').forEach(stripe => {
  stripe.querySelectorAll('.proof-item').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
  });
});

// ========================================
// Contact form handling (mailto fallback)
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  const subject = encodeURIComponent(`Data Consulting Inquiry: ${data.project || 'General'}`);
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\nFocus Area: ${data.project}\n\nMessage:\n${data.message}`
  );

  window.location.href = `mailto:zAnalytics@icloud.com?subject=${subject}&body=${body}`;

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = 'Opening email client...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.opacity = '1';
  }, 3000);
});
