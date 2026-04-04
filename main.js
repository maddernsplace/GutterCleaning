// ── NAV: scroll effect + mobile toggle ───────────────────────────────────────
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── SMOOTH SCROLL for anchor links ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // header height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(
  '.service-card, .why-us__list li, .process__step, .testimonial-card, .area-pill, .stat'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

// Add a simple revealed class handler
const style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ── QUOTE FORM ─────────────────────────────────────────────────────────────────
const form = document.getElementById('quoteForm');
const successMsg = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Basic validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#e53e3e';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });
    if (!valid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const data = {
      firstName:    form.firstName.value,
      lastName:     form.lastName.value,
      phone:        form.phone.value,
      email:        form.email.value,
      address:      form.address.value,
      propertyType: form.propertyType.value,
      service:      form.service.value,
      message:      form.message.value,
      _subject:     'New Quote Request – Maddern\'s Place Gutter Cleaning'
    };

    fetch('https://formsubmit.co/ajax/maddernsplace@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        form.style.display = 'none';
        successMsg.classList.add('visible');
        successMsg.style.display = 'flex';
      })
      .catch(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send My Quote Request';
        alert('Something went wrong. Please try again or call us directly.');
      });
  });
}

// ── STAT COUNTER ANIMATION ────────────────────────────────────────────────────
const statNums = document.querySelectorAll('.stat__num');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const text = el.textContent.trim();
    const match = text.match(/(\d+)/);
    if (!match) return;
    const target = parseInt(match[1]);
    const suffix = text.replace(/\d+/, '');
    let current = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      // Rebuild inner content preserving suffix elements
      const svgEl = el.querySelector('svg');
      if (svgEl) {
        el.innerHTML = '';
        el.append(document.createTextNode(current));
        el.appendChild(svgEl);
      } else {
        el.textContent = current + suffix.replace(current.toString(), '');
      }
      if (current >= target) clearInterval(timer);
    }, 16);

    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNums.forEach(el => countObserver.observe(el));
