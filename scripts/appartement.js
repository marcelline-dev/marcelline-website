// Nav shrink
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').style.padding =
      window.scrollY > 60 ? '0.9rem 3rem' : '1.4rem 3rem';
});

// Room cards stagger
const rooms = document.querySelectorAll('.room-card');
const obsR = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
      obsR.unobserve(e.target);
    }
  });
}, {threshold: 0.15});
rooms.forEach(r => obsR.observe(r));

// Amenity stagger
const amenities = document.querySelectorAll('.amenity');
const obsA = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obsA.unobserve(e.target);
    }
  });
}, {threshold: 0.1});
amenities.forEach(a => obsA.observe(a));

// Lightbox
const images = Array.from(document.querySelectorAll('.gallery-item img')).map(i => i.src);
let current = 0;

const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');

function openLb(idx) {
  current = idx;
  lbImg.src = images[current];
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLb() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => openLb(+item.dataset.idx));
});

document.getElementById('lbClose').addEventListener('click', closeLb);

document.getElementById('lbPrev').addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  lbImg.src = images[current];
});

document.getElementById('lbNext').addEventListener('click', () => {
  current = (current + 1) % images.length;
  lbImg.src = images[current];
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLb();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
});
