/* ===========================================================
   Luucyy Nails · comportamiento compartido
   Cada bloque se activa solo si sus elementos existen en la página.
   =========================================================== */

/* ---------- DATOS (nombres reales de las carpetas) ---------- */
const CAT = {nailart:"Nail Art",chrome:"Chrome y efectos",esculturales:"Esculturales",gel:"Gel semipermanente",prensa:"Prensa"};
const PIEZAS = [
  {n:"Cat eye y flor",c:"chrome"},{n:"Chrome dorado",c:"chrome"},{n:"Chrome relieve",c:"chrome"},
  {n:"Chrome relieve y aerógrafo",c:"chrome"},{n:"Efecto aurora",c:"chrome"},
  {n:"Aerógrafo y piedras",c:"nailart"},{n:"Brillos y relieve plata",c:"nailart"},{n:"Cartoon pato Donald",c:"nailart"},
  {n:"Chiikawa cartoon",c:"nailart"},{n:"Cola de sirena encapsulada",c:"nailart"},{n:"Diseño amarillo-azul",c:"nailart"},
  {n:"Full color",c:"nailart"},{n:"Full relieve",c:"nailart"},{n:"Líneas y piedras",c:"nailart"},
  {n:"Muñeca y flores",c:"nailart"},{n:"Osos escandalosos",c:"nailart"},{n:"Pastel y mano alzada",c:"nailart"},
  {n:"Press on con blooming",c:"nailart"},{n:"Relieve mate",c:"nailart"},{n:"Scary movie",c:"nailart"},
  {n:"Esculturales lechosas",c:"esculturales"},
  {n:"Flores",c:"gel"},{n:"Francés y limones",c:"gel"},{n:"Líneas",c:"gel"},{n:"Snoopy navideño",c:"gel"},
  {n:"Aparición en medios · 1",c:"prensa"},{n:"Aparición en medios · 2",c:"prensa"},{n:"Aparición en medios · 3",c:"prensa"}
];

/* ---------- CARGA DE IMÁGENES (por nombre, con respaldo al recuadro) ---------- */
const IMGDIR={nailart:"nail-art",chrome:"chrome-y-efectos",esculturales:"esculturales",gel:"gel-semipermanente",prensa:"prensa"};
const EXTS=["jpg","jpeg","png","webp"];
function slugify(s){
  s=s.toLowerCase();
  const rep={'á':'a','é':'e','í':'i','ó':'o','ú':'u','ñ':'n','ü':'u'};
  s=s.replace(/[áéíóúñü]/g,m=>rep[m]);
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}
function tryImg(el,base,i){
  i=i||0; if(i>=EXTS.length) return;
  const url=base+'.'+EXTS[i], im=new Image();
  im.onload=()=>{el.style.backgroundImage=`url("${url}")`;el.style.backgroundSize='cover';el.style.backgroundPosition='center';el.classList.add('has-img');};
  im.onerror=()=>tryImg(el,base,i+1);
  im.src=url;
}

function tileHTML(p,i){
  const a = 120 + (i*23)%80;
  return `<div class="tile-img" style="--a:${a}deg"><span class="tag">${CAT[p.c]}</span><span class="cam">◇ foto</span></div><figcaption>${p.n}</figcaption>`;
}
function makeTile(p,i){
  const fig=document.createElement('figure');
  fig.className='tile c-'+p.c;
  fig.dataset.cat=p.c; fig.dataset.name=p.n;
  fig.innerHTML=tileHTML(p,i);
  return fig;
}

/* ---------- GALERÍA COMPLETA (portafolio) ---------- */
const grid=document.getElementById('grid');
if(grid){ PIEZAS.forEach((p,i)=>grid.appendChild(makeTile(p,i))); }

/* ---------- FILTROS ---------- */
const filters=document.getElementById('filters');
if(filters){
  filters.addEventListener('click',e=>{
    const b=e.target.closest('.chip'); if(!b) return;
    filters.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    b.classList.add('active');
    const f=b.dataset.f;
    document.querySelectorAll('#grid .tile').forEach(t=>t.classList.toggle('hide', !(f==='all'||t.dataset.cat===f)));
  });
}

/* ---------- TEASER (inicio) ---------- */
const tg=document.getElementById('teaserGrid');
if(tg){
  const FEAT=["Cat eye y flor","Muñeca y flores","Efecto aurora","Press on con blooming"];
  PIEZAS.filter(p=>FEAT.includes(p.n)).forEach((p,i)=>tg.appendChild(makeTile(p,i)));
}

/* buscar la foto real de cada pieza (galería, teaser y tomas de prensa) */
document.querySelectorAll('.tile[data-name][data-cat]').forEach(fig=>{
  const el=fig.querySelector('.tile-img');
  if(el && IMGDIR[fig.dataset.cat]) tryImg(el,`assets/img/${IMGDIR[fig.dataset.cat]}/${slugify(fig.dataset.name)}`);
});
/* bloques con foto fija: hero, retrato, destacada de prensa */
document.querySelectorAll('[data-img]').forEach(el=>tryImg(el,`assets/img/${el.dataset.img}`));

/* ---------- LIGHTBOX (delegación en cualquier .tile con data-name) ---------- */
const lb=document.getElementById('lb');
if(lb){
  const lbName=document.getElementById('lbName'), lbCat=document.getElementById('lbCat');
  document.addEventListener('click',e=>{
    const t=e.target.closest('.tile'); if(!t||!t.dataset.name) return;
    lbName.textContent=t.dataset.name;
    lbCat.textContent=CAT[t.dataset.cat]||'Prensa';
    lb.classList.add('open');
  });
  const close=document.getElementById('lbClose');
  if(close) close.addEventListener('click',()=>lb.classList.remove('open'));
  lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open');});
}

/* ---------- CONTADORES (inicio) ---------- */
const counters=document.querySelectorAll('[data-count]');
if(counters.length){
  const run=el=>{
    const target=+el.dataset.count; let cur=0; const step=Math.max(1,Math.round(target/28));
    el.textContent='0';
    const t=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(t);}el.textContent=cur;},32);
  };
  const cio=new IntersectionObserver((es)=>{es.forEach(x=>{if(x.isIntersecting){run(x.target);cio.unobserve(x.target);}});},{threshold:.4});
  counters.forEach(el=>cio.observe(el));
}

/* ---------- REVEAL AL HACER SCROLL ---------- */
const io=new IntersectionObserver((es)=>{es.forEach(x=>{if(x.isIntersecting)x.target.classList.add('in');});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>{
  io.observe(el);
  if(el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
});

/* ---------- NAV: fondo al hacer scroll + dock flotante ---------- */
const nav=document.getElementById('nav'), dock=document.getElementById('dock');
const onScroll=()=>{
  if(nav) nav.classList.toggle('scrolled', window.scrollY>40);
  if(dock) dock.classList.toggle('show', window.scrollY>520);
};
window.addEventListener('scroll',onScroll); onScroll();

/* ---------- MENÚ MÓVIL ---------- */
const burger=document.getElementById('burger'), links=document.getElementById('links');
if(burger&&links) burger.addEventListener('click',()=>links.classList.toggle('open'));
