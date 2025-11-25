// script.js - Interactividad ligera: smooth scroll, form feedback, active nav link
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // collapse nav on mobile
        const bsCollapse = new bootstrap.Collapse(document.getElementById('navMenu'), {toggle:false});
        if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
          bsCollapse.hide();
        }
      }
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');
  function setActiveLink() {
    let index = sections.length;
    while(--index && window.scrollY + 120 < sections[index].offsetTop) {}
    navLinks.forEach((link) => link.classList.remove('active'));
    const id = sections[index].id;
    const active = document.querySelector('.nav-link[href="#' + id + '"]');
    if(active) active.classList.add('active');
  }
  setActiveLink();
  window.addEventListener('scroll', setActiveLink);

  // Simple form submission feedback
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(() => {
      btn.textContent = 'Enviado ✓';
      btn.classList.add('btn-success');
      btn.disabled = false;
      form.reset();
    }, 900);
  });
});