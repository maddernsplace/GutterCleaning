// ── SITE CONTENT ─────────────────────────────────────────────────────────────
// Default content — edit via admin.html. Changes are saved to localStorage.

const SITE_DEFAULTS = {
  hero: {
    tag: 'Professional Gutter Cleaning',
    title1: 'Keep Your Home',
    title2: 'Safe & Protected',
    subtitle: 'Blocked gutters cause serious damage. We clear them fast, safely, and affordably — so you don\'t have to worry.',
    phone: '+61459119149',
    callBtnText: 'Call Us Now',
    badge1: 'Fully Insured',
    badge2: 'Same-Day Available',
    badge3: '100% Satisfaction'
  },
  stats: [
    { num: '100', suffix: '+', label: 'Homes Serviced' },
    { num: '5',   suffix: '+', label: 'Years Experience' },
    { num: '100', suffix: '%', label: 'Satisfaction Rate' },
    { num: '5',   suffix: '★', label: 'Average Rating' }
  ],
  services: [
    { title: 'Gutter Cleaning',          desc: 'Full removal of leaves, debris, and blockages from all gutter and downpipe systems. We flush the entire system to ensure free-flowing drainage.' },
    { title: 'Downpipe Clearing',        desc: 'Blocked downpipes cause overflow and water damage. We use professional-grade tools to clear even the most stubborn blockages fast.' },
    { title: 'Scheduled Maintenance',    desc: 'Set and forget. We\'ll remind you and schedule regular seasonal cleans to keep your gutters in peak condition throughout the year.' },
    { title: 'High-Pressure Washing',    desc: 'We remove stubborn dirt, mould, and buildup from gutters and roof surfaces using safe, controlled high-pressure water jets.' },
    { title: 'Gutter Inspection & Report', desc: 'Not sure what condition your gutters are in? We provide a thorough inspection with photos and a detailed report of any issues found.' }
  ],
  whyUs: {
    expYears: '5+',
    title: 'The Maddern\'s Place Difference',
    intro: 'We\'re not just another cleaning service. We\'re a local, family-run business that treats every home like our own.',
    items: [
      { title: 'Fully Insured & Licensed', desc: 'Complete peace of mind — we carry full public liability insurance on every job.' },
      { title: 'Prompt & Reliable',        desc: 'We show up on time, every time. No waiting around, no excuses.' },
      { title: 'Upfront, Honest Pricing',  desc: 'No hidden fees. You\'ll get a clear quote before we start — always.' },
      { title: 'Local & Family-Owned',     desc: 'We\'re your neighbours. We care about this community and take pride in our work.' }
    ]
  },
  process: [
    { title: 'Contact Us',      desc: 'Call, email, or fill out our online quote form. Tell us your property type and location.' },
    { title: 'Get a Quote',     desc: 'We\'ll provide a clear, no-obligation quote based on your property\'s needs — usually within the hour.' },
    { title: 'We Come to You',  desc: 'Our team arrives at your scheduled time with all the equipment needed to get the job done.' },
    { title: 'Job Done Right',  desc: 'We clean up after ourselves and leave your gutters flowing perfectly. You just enjoy the results.' }
  ],
  testimonials: [
    { text: 'Absolutely brilliant service! They cleared years of build-up from our gutters. So professional and the price was very fair. Would highly recommend to anyone.', name: 'Sarah B.', role: 'Homeowner' },
    { text: 'Used Maddern\'s Place twice now and both times they\'ve been fantastic. On time, thorough, and left everything clean. Definitely my go-to for gutters.',        name: 'Tom M.',   role: 'Property Manager' },
    { text: 'Had a major blockage causing water to overflow into my walls. They came out same day and sorted it completely. Friendly, efficient, and great value.',          name: 'Jenny L.', role: 'Homeowner' }
  ],
  areas: ['Area 1', 'Area 2', 'Area 3', 'Area 4', 'Area 5', 'Area 6', 'Area 7', 'And More...'],
  contact: {
    phone:        '+61459119149',
    phoneDisplay: '+61 459 119 149',
    email:        'maddernsplace@gmail.com',
    hours:        'Monday to Friday: 9:00am – 4:00pm'
  },
  footer: {
    tagline:   'Professional gutter cleaning services you can trust. Local, reliable, and always fairly priced.',
    copyright: '© 2024 Maddern\'s Place Gutter Cleaning. All rights reserved.',
    abn:       'ABN: XX XXX XXX XXX',
    facebook:  'https://www.facebook.com/maddernsplace',
    instagram: '#'
  }
};

function getSiteContent() {
  try {
    const stored = localStorage.getItem('siteContent');
    if (stored) {
      return deepMerge(JSON.parse(JSON.stringify(SITE_DEFAULTS)), JSON.parse(stored));
    }
  } catch (e) {}
  return JSON.parse(JSON.stringify(SITE_DEFAULTS));
}

function deepMerge(target, source) {
  for (const key in source) {
    if (Array.isArray(source[key])) {
      target[key] = source[key];
    } else if (source[key] && typeof source[key] === 'object') {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Escape text for insertion into innerHTML
function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyContent() {
  const c = getSiteContent();

  const set    = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  const setAttr = (id, attr, val) => { const el = document.getElementById(id); if (el) el.setAttribute(attr, val); };

  // ── HERO ────────────────────────────────────────────────────
  set('heroTag', c.hero.tag);
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.innerHTML = esc(c.hero.title1) + '<br /><span>' + esc(c.hero.title2) + '</span>';
  set('heroSubtitle', c.hero.subtitle);
  const heroPhoneBtn = document.getElementById('heroPhoneBtn');
  if (heroPhoneBtn) {
    heroPhoneBtn.href = 'tel:' + c.hero.phone;
    heroPhoneBtn.textContent = c.hero.callBtnText || 'Call Us Now';
  }
  set('heroBadge1', c.hero.badge1);
  set('heroBadge2', c.hero.badge2);
  set('heroBadge3', c.hero.badge3);

  // ── STATS ───────────────────────────────────────────────────
  document.querySelectorAll('.stat').forEach((el, i) => {
    const s = c.stats[i];
    if (!s) return;
    const numEl   = el.querySelector('.stat__num');
    const labelEl = el.querySelector('.stat__label');
    if (numEl) {
      if (s.suffix === '★') {
        numEl.innerHTML = esc(s.num) + '<svg viewBox="0 0 24 24" fill="currentColor" class="stat__star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      } else {
        numEl.innerHTML = esc(s.num) + '<span class="stat__plus">' + esc(s.suffix) + '</span>';
      }
    }
    if (labelEl) labelEl.textContent = s.label;
  });

  // ── SERVICES ────────────────────────────────────────────────
  document.querySelectorAll('.service-card').forEach((el, i) => {
    const s = c.services[i];
    if (!s) return;
    const h3 = el.querySelector('h3');
    const p  = el.querySelector('p');
    if (h3) h3.textContent = s.title;
    if (p)  p.textContent  = s.desc;
  });

  // ── WHY US ──────────────────────────────────────────────────
  set('whyExpNum', c.whyUs.expYears);
  set('whyTitle',  c.whyUs.title);
  set('whyIntro',  c.whyUs.intro);
  document.querySelectorAll('.why-us__list li').forEach((el, i) => {
    const item = c.whyUs.items[i];
    if (!item) return;
    const strong = el.querySelector('strong');
    const p      = el.querySelector('p');
    if (strong) strong.textContent = item.title;
    if (p)      p.textContent      = item.desc;
  });

  // ── PROCESS ─────────────────────────────────────────────────
  document.querySelectorAll('.process__step').forEach((el, i) => {
    const s = c.process[i];
    if (!s) return;
    const h3 = el.querySelector('h3');
    const p  = el.querySelector('p');
    if (h3) h3.textContent = s.title;
    if (p)  p.textContent  = s.desc;
  });

  // ── TESTIMONIALS ─────────────────────────────────────────────
  document.querySelectorAll('.testimonial-card').forEach((el, i) => {
    const t = c.testimonials[i];
    if (!t) return;
    const p      = el.querySelector('p');
    const strong = el.querySelector('.testimonial-card__author strong');
    const span   = el.querySelector('.testimonial-card__author span');
    const avatar = el.querySelector('.author-avatar');
    if (p)      p.textContent      = t.text;
    if (strong) strong.textContent = t.name;
    if (span)   span.textContent   = t.role;
    if (avatar) avatar.textContent = t.name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  });

  // ── AREAS ────────────────────────────────────────────────────
  const areasGrid = document.getElementById('areasGrid');
  if (areasGrid) {
    const pin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
    areasGrid.innerHTML = c.areas.map(a => `<div class="area-pill">${pin}${esc(a)}</div>`).join('');
  }

  // ── CONTACT ─────────────────────────────────────────────────
  const contactPhone = document.getElementById('contactPhone');
  if (contactPhone) { contactPhone.href = 'tel:' + c.contact.phone; contactPhone.textContent = c.contact.phoneDisplay; }
  const contactEmail = document.getElementById('contactEmail');
  if (contactEmail) { contactEmail.href = 'mailto:' + c.contact.email; contactEmail.textContent = c.contact.email; }
  set('contactHours', c.contact.hours);

  // ── FOOTER ──────────────────────────────────────────────────
  set('footerTagline', c.footer.tagline);
  const footerPhone = document.getElementById('footerPhone');
  if (footerPhone) { footerPhone.href = 'tel:' + c.contact.phone; footerPhone.textContent = c.contact.phoneDisplay; }
  const footerEmail = document.getElementById('footerEmail');
  if (footerEmail) { footerEmail.href = 'mailto:' + c.contact.email; footerEmail.textContent = c.contact.email; }
  set('footerHours',     c.contact.hours);
  set('footerCopyright', c.footer.copyright);
  set('footerAbn',       c.footer.abn);
  setAttr('footerFacebook',  'href', c.footer.facebook);
  setAttr('footerInstagram', 'href', c.footer.instagram);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyContent);
} else {
  applyContent();
}
