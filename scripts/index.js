// Intersection observer for feature cards stagger
const cards = document.querySelectorAll('.feature-card');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
cards.forEach(c => obs.observe(c));

// Nav shrink on scroll
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.padding =
    window.scrollY > 60 ? '0.9rem 3rem' : '1.4rem 3rem';
});