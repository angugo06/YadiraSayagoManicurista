/* ===========================================================
   Luucyy Nails · comportamiento (mejora progresiva)
   Todo funciona sin JS; esto solo agrega interacción.
   =========================================================== */

/* ---------- FILTROS DEL PORTAFOLIO ---------- */
const filters = document.getElementById('filters');
if (filters) {
  const cells = document.querySelectorAll('.grid .cell');
  filters.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    filters.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c === btn));
    const f = btn.dataset.f;
    cells.forEach(c => c.classList.toggle('hide', !(f === 'all' || c.dataset.cat === f)));
  });
}

/* ---------- LIGHTBOX (dialog nativo) ---------- */
const lb = document.getElementById('lb');
if (lb && typeof lb.showModal === 'function') {
  const lbImg = lb.querySelector('img');
  const lbName = lb.querySelector('h3');
  const lbCat = lb.querySelector('.eyebrow');
  document.querySelectorAll('.tile').forEach(fig => {
    fig.addEventListener('click', () => {
      const img = fig.querySelector('img');
      const cap = fig.querySelector('figcaption');
      if (img) { lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt; }
      if (lbName) lbName.textContent = cap ? cap.textContent : '';
      const cell = fig.closest('[data-cat]');
      if (lbCat) lbCat.textContent = cell ? (cell.dataset.label || 'Diseño') : 'Diseño';
      lb.showModal();
    });
  });
  lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
}

/* ---------- CONTADORES ---------- */
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const run = el => {
    const target = +el.dataset.count, prefix = el.dataset.prefix || '';
    let cur = 0; const step = Math.max(1, Math.round(target / 28));
    el.textContent = prefix + '0';
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(t); }
      el.textContent = prefix + cur;
    }, 32);
  };
  const cio = new IntersectionObserver(es => es.forEach(x => {
    if (x.isIntersecting) { run(x.target); cio.unobserve(x.target); }
  }), { threshold: .4 });
  counters.forEach(el => cio.observe(el));
}

/* ---------- REVEAL AL HACER SCROLL ---------- */
const io = new IntersectionObserver(es => es.forEach(x => {
  if (x.isIntersecting) x.target.classList.add('in');
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => {
  io.observe(el);
  if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
});

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
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', e => {
    if (e.target.closest('a')) { links.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
  });
}
