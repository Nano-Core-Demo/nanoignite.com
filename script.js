/* ── Smooth scroll for all anchor links ───────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Statement slider ─────────────────────────────────────── */
const stSlides = document.querySelectorAll('.slide');
const stDotsEl = document.getElementById('slider-dots');
let stCur = 0, stTimer;

stSlides.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'slider-dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => stGo(i));
  stDotsEl.appendChild(d);
});

function stGo(n) {
  stSlides[stCur].classList.remove('active');
  document.querySelectorAll('.slider-dot')[stCur].classList.remove('active');
  stCur = (n + stSlides.length) % stSlides.length;
  stSlides[stCur].classList.add('active');
  document.querySelectorAll('.slider-dot')[stCur].classList.add('active');
  clearInterval(stTimer);
  stTimer = setInterval(() => stGo(stCur + 1), 5000);
}

document.getElementById('sprev').addEventListener('click', () => stGo(stCur - 1));
document.getElementById('snext').addEventListener('click', () => stGo(stCur + 1));
stTimer = setInterval(() => stGo(stCur + 1), 5000);

/* ── Scroll reveal ─────────────────────────────────────────── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── Nav opacity ───────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('main-nav').style.background =
    window.scrollY > 30 ? 'rgba(13,25,38,0.97)' : 'rgba(13,25,38,0.86)';
}, { passive: true });

/* ── Form ──────────────────────────────────────────────────── */
document.getElementById('contact-form').addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formId = form.dataset.formspree;
  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/' + formId, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if (res.ok) {
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    } else {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled = false;
    }
  } catch (_) {
    btn.textContent = 'Something went wrong — try again';
    btn.disabled = false;
  }
}
