/* ===========================================================
   Luucyy Nails · comportamiento (mejora progresiva)
   Todo funciona sin JS; esto solo agrega interacción.
   =========================================================== */

document.documentElement.classList.add('js');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- FILTROS DEL PORTAFOLIO ---------- */
const filters = document.getElementById('filters');
if (filters) {
  const cells = document.querySelectorAll('.grid .cell');
  const status = document.getElementById('filter-status');
  filters.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    filters.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c === btn));
    const f = btn.dataset.f;
    let visibleCount = 0;
    cells.forEach(cell => {
      const isVisible = f === 'all' || cell.dataset.cat === f;
      cell.hidden = !isVisible;
      visibleCount += Number(isVisible);
    });
    if (status) status.textContent = `Mostrando ${visibleCount} ${visibleCount === 1 ? 'diseño' : 'diseños'}.`;
  });
}

/* ---------- LIGHTBOX (dialog nativo) ---------- */
const lb = document.getElementById('lb');
if (lb && typeof lb.showModal === 'function') {
  const lbImg = lb.querySelector('img');
  const lbName = lb.querySelector('[data-lightbox-title]');
  const lbCat = lb.querySelector('.eyebrow');
  let activeTrigger = null;
  document.querySelectorAll('.tile').forEach(fig => {
    fig.tabIndex = 0;
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-haspopup', 'dialog');
    fig.setAttribute('aria-controls', 'lb');
    fig.setAttribute('aria-label', `Ampliar ${fig.querySelector('figcaption')?.textContent || 'diseño'}`);
    const openLightbox = () => {
      const img = fig.querySelector('img');
      const cap = fig.querySelector('figcaption');
      if (img) { lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt; }
      if (lbName) lbName.textContent = cap ? cap.textContent : '';
      const cell = fig.closest('[data-cat]');
      if (lbCat) lbCat.textContent = cell ? (cell.dataset.label || 'Diseño') : 'Diseño';
      activeTrigger = fig;
      lb.showModal();
    };
    fig.addEventListener('click', openLightbox);
    fig.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox();
      }
    });
  });
  lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  lb.addEventListener('close', () => {
    lbImg.removeAttribute('src');
    activeTrigger?.focus();
    activeTrigger = null;
  });
}

/* ---------- CONTADORES ---------- */
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const run = el => {
    const target = +el.dataset.count, prefix = el.dataset.prefix || '';
    if (reducedMotion) {
      el.textContent = prefix + target;
      return;
    }
    let cur = 0; const step = Math.max(1, Math.round(target / 28));
    el.textContent = prefix + '0';
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = prefix + cur;
    }, 32);
  };
  if ('IntersectionObserver' in window && !reducedMotion) {
    const cio = new IntersectionObserver(es => es.forEach(x => {
      if (x.isIntersecting) { run(x.target); cio.unobserve(x.target); }
    }), { threshold: .4 });
    counters.forEach(el => cio.observe(el));
  } else {
    counters.forEach(run);
  }
}

/* ---------- REVEAL AL HACER SCROLL ---------- */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const io = new IntersectionObserver(es => es.forEach(x => {
    if (x.isIntersecting) {
      x.target.classList.add('in');
      io.unobserve(x.target);
    }
  }), { threshold: .12 });
  reveals.forEach(el => {
    io.observe(el);
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
  });
} else {
  reveals.forEach(el => el.classList.add('in'));
}

/* ---------- NAV + DOCK AL HACER SCROLL ---------- */
const nav = document.getElementById('nav'), dock = document.getElementById('dock');
const onScroll = () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  if (dock) dock.classList.toggle('show', window.scrollY > 520);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- MENÚ MÓVIL ---------- */
const burger = document.getElementById('burger'), links = document.getElementById('links');
if (burger && links) {
  const closeMenu = (returnFocus = false) => {
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
    burger.setAttribute('aria-label', 'Abrir menú');
    if (returnFocus) burger.focus();
  };
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) links.querySelector('a')?.focus();
  });
  links.addEventListener('click', e => {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (links.classList.contains('open') && !event.target.closest('.nav')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && links.classList.contains('open')) closeMenu(true);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });
}
