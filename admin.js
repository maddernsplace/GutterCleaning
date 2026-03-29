// ── ADMIN PANEL ───────────────────────────────────────────────────────────────

const DEFAULT_PASSWORD = 'admin123';

function getPassword() {
  return localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;
}

function isLoggedIn() {
  return sessionStorage.getItem('adminLoggedIn') === '1';
}

// ── AUTH ──────────────────────────────────────────────────────────────────────

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  if (document.getElementById('loginPassword').value === getPassword()) {
    sessionStorage.setItem('adminLoggedIn', '1');
    showApp();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('adminLoggedIn');
  location.reload();
});

function showApp() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminApp').style.display = 'grid';
  loadAllFields();
}

// ── NAV ───────────────────────────────────────────────────────────────────────

document.querySelectorAll('.nav-item').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const sec = link.dataset.section;
    document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    document.getElementById('section-' + sec).classList.add('active');
  });
});

// ── SAVE ──────────────────────────────────────────────────────────────────────

document.querySelectorAll('[data-save]').forEach(btn => {
  btn.addEventListener('click', () => {
    saveSection(btn.dataset.save);
    showToast('Changes saved!');
  });
});

function saveSection(key) {
  const content = getSiteContent();

  switch (key) {
    case 'hero':
      content.hero.tag         = val('hero-tag');
      content.hero.title1      = val('hero-title1');
      content.hero.title2      = val('hero-title2');
      content.hero.subtitle    = val('hero-subtitle');
      content.hero.phone       = val('hero-phone');
      content.hero.callBtnText = val('hero-callbtn');
      content.hero.badge1      = val('hero-badge1');
      content.hero.badge2      = val('hero-badge2');
      content.hero.badge3      = val('hero-badge3');
      break;

    case 'contact':
      content.contact.phone        = val('contact-phone');
      content.contact.phoneDisplay = val('contact-phoneDisplay');
      content.contact.email        = val('contact-email');
      content.contact.hours        = val('contact-hours');
      break;

    case 'stats':
      content.stats.forEach((_, i) => {
        content.stats[i].num    = val('stat-num-' + i);
        content.stats[i].suffix = val('stat-suffix-' + i);
        content.stats[i].label  = val('stat-label-' + i);
      });
      break;

    case 'services':
      content.services.forEach((_, i) => {
        content.services[i].title = val('service-title-' + i);
        content.services[i].desc  = val('service-desc-' + i);
      });
      break;

    case 'whyUs':
      content.whyUs.expYears = val('whyus-expYears');
      content.whyUs.title    = val('whyus-title');
      content.whyUs.intro    = val('whyus-intro');
      content.whyUs.items.forEach((_, i) => {
        content.whyUs.items[i].title = val('whyus-item-title-' + i);
        content.whyUs.items[i].desc  = val('whyus-item-desc-' + i);
      });
      break;

    case 'process':
      content.process.forEach((_, i) => {
        content.process[i].title = val('process-title-' + i);
        content.process[i].desc  = val('process-desc-' + i);
      });
      break;

    case 'testimonials':
      content.testimonials.forEach((_, i) => {
        content.testimonials[i].text = val('testimonial-text-' + i);
        content.testimonials[i].name = val('testimonial-name-' + i);
        content.testimonials[i].role = val('testimonial-role-' + i);
      });
      break;

    case 'areas':
      content.areas = val('areas-list').split('\n').map(s => s.trim()).filter(Boolean);
      break;

    case 'footer':
      content.footer.tagline   = val('footer-tagline');
      content.footer.copyright = val('footer-copyright');
      content.footer.abn       = val('footer-abn');
      content.footer.facebook  = val('footer-facebook');
      content.footer.instagram = val('footer-instagram');
      break;
  }

  localStorage.setItem('siteContent', JSON.stringify(content));
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

// ── LOAD FIELDS ───────────────────────────────────────────────────────────────

function loadAllFields() {
  const c = getSiteContent();

  // Hero
  setVal('hero-tag',      c.hero.tag);
  setVal('hero-title1',   c.hero.title1);
  setVal('hero-title2',   c.hero.title2);
  setVal('hero-subtitle', c.hero.subtitle);
  setVal('hero-phone',    c.hero.phone);
  setVal('hero-callbtn',  c.hero.callBtnText || 'Call Us Now');
  setVal('hero-badge1',   c.hero.badge1);
  setVal('hero-badge2',   c.hero.badge2);
  setVal('hero-badge3',   c.hero.badge3);

  // Contact
  setVal('contact-phone',        c.contact.phone);
  setVal('contact-phoneDisplay', c.contact.phoneDisplay);
  setVal('contact-email',        c.contact.email);
  setVal('contact-hours',        c.contact.hours);

  // Stats — build dynamic fields
  document.getElementById('statsFields').innerHTML = c.stats.map((s, i) => `
    <div class="sub-card">
      <div class="sub-card__label">Stat ${i + 1}</div>
      <div class="field-row">
        <div class="field"><label>Number</label><input type="text" id="stat-num-${i}" value="${e(s.num)}" /></div>
        <div class="field"><label>Suffix (+ / % / ★ for star)</label><input type="text" id="stat-suffix-${i}" value="${e(s.suffix || '')}" /></div>
        <div class="field"><label>Label</label><input type="text" id="stat-label-${i}" value="${e(s.label)}" /></div>
      </div>
    </div>
  `).join('');

  // Services
  document.getElementById('servicesFields').innerHTML = c.services.map((s, i) => `
    <div class="card">
      <div class="sub-card__label">Service ${i + 1}</div>
      <div class="field"><label>Title</label><input type="text" id="service-title-${i}" value="${e(s.title)}" /></div>
      <div class="field"><label>Description</label><textarea id="service-desc-${i}" rows="3">${e(s.desc)}</textarea></div>
    </div>
  `).join('');

  // Why Us
  setVal('whyus-expYears', c.whyUs.expYears);
  setVal('whyus-title',    c.whyUs.title);
  setVal('whyus-intro',    c.whyUs.intro);
  document.getElementById('whyusItems').innerHTML = c.whyUs.items.map((item, i) => `
    <div class="sub-card">
      <div class="sub-card__label">Point ${i + 1}</div>
      <div class="field"><label>Title</label><input type="text" id="whyus-item-title-${i}" value="${e(item.title)}" /></div>
      <div class="field"><label>Description</label><textarea id="whyus-item-desc-${i}" rows="2">${e(item.desc)}</textarea></div>
    </div>
  `).join('');

  // Process
  document.getElementById('processFields').innerHTML = c.process.map((s, i) => `
    <div class="card">
      <div class="sub-card__label">Step ${i + 1}</div>
      <div class="field"><label>Title</label><input type="text" id="process-title-${i}" value="${e(s.title)}" /></div>
      <div class="field"><label>Description</label><textarea id="process-desc-${i}" rows="2">${e(s.desc)}</textarea></div>
    </div>
  `).join('');

  // Testimonials
  document.getElementById('testimonialsFields').innerHTML = c.testimonials.map((t, i) => `
    <div class="card">
      <div class="sub-card__label">Testimonial ${i + 1}</div>
      <div class="field"><label>Quote Text</label><textarea id="testimonial-text-${i}" rows="3">${e(t.text)}</textarea></div>
      <div class="field-row">
        <div class="field"><label>Customer Name</label><input type="text" id="testimonial-name-${i}" value="${e(t.name)}" /></div>
        <div class="field"><label>Role / Description</label><input type="text" id="testimonial-role-${i}" value="${e(t.role)}" /></div>
      </div>
    </div>
  `).join('');

  // Areas
  setVal('areas-list', c.areas.join('\n'));

  // Footer
  setVal('footer-tagline',   c.footer.tagline);
  setVal('footer-copyright', c.footer.copyright);
  setVal('footer-abn',       c.footer.abn);
  setVal('footer-facebook',  c.footer.facebook);
  setVal('footer-instagram', c.footer.instagram);
}

function setVal(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value || '';
}

// HTML-escape for injecting values into innerHTML templates
function e(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── TOAST ─────────────────────────────────────────────────────────────────────

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.display = 'block';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

// ── SETTINGS ──────────────────────────────────────────────────────────────────

document.getElementById('changePasswordBtn').addEventListener('click', () => {
  const current  = document.getElementById('currentPassword').value;
  const newPw    = document.getElementById('newPassword').value;
  const confirm  = document.getElementById('confirmPassword').value;
  const msg      = document.getElementById('passwordMsg');

  const show = (text, type) => {
    msg.textContent  = text;
    msg.className    = 'field-hint ' + type;
    msg.style.display = 'block';
  };

  if (current !== getPassword())  return show('Current password is incorrect.', 'error');
  if (newPw.length < 6)           return show('New password must be at least 6 characters.', 'error');
  if (newPw !== confirm)          return show('Passwords do not match.', 'error');

  localStorage.setItem('adminPassword', newPw);
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value     = '';
  document.getElementById('confirmPassword').value  = '';
  show('Password changed successfully.', 'success');
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (confirm('Reset ALL site content to the original defaults? This cannot be undone.')) {
    localStorage.removeItem('siteContent');
    loadAllFields();
    showToast('Content reset to defaults.');
  }
});

// ── INIT ──────────────────────────────────────────────────────────────────────

if (isLoggedIn()) {
  showApp();
} else {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminApp').style.display = 'none';
}
