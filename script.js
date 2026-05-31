// ── CURSOR ──────────────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
    trail.style.width = '52px';
    trail.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    trail.style.width = '36px';
    trail.style.height = '36px';
  });
});

// ── TYPED TEXT ───────────────────────────────────────────────────────────────
const roles = [
  'Full-Stack Developer',
  'Flutter Engineer',
  'AI & ML Enthusiast',
  'Laravel Developer',
  'IT Manager',
  'Freelance Builder'
];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}
type();

// ── NAV SCROLL ───────────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 50
    ? 'rgba(10,22,40,0.97)'
    : 'rgba(10,22,40,0.85)';
});

// ── HAMBURGER ────────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── REVEAL ON SCROLL ─────────────────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.classList.contains('reveal-card') ? i * 80 : 0);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-card').forEach(el => observer.observe(el));

// ── ACTIVE NAV LINK ───────────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--white)' : '';
  });
});

// ── CONTACT FORM ──────────────────────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Open mail client with prefilled data
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:official@omidtalwar.com?subject=${subject}&body=${body}`;

  btn.textContent = 'Message Sent ✓';
  btn.style.background = '#00D4FF';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// ── SMOOTH NUMBER COUNTER ─────────────────────────────────────────────────────
function animateCount(el, target, suffix = '') {
  let count = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count + suffix;
    if (count >= target) clearInterval(interval);
  }, 40);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const val = parseInt(el.textContent);
        const suffix = el.textContent.includes('+') ? '+' : '';
        animateCount(el, val, suffix);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);
