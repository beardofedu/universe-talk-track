const secs = [...document.querySelectorAll('main section')];
const toc = document.getElementById('toc');
secs.forEach(s => {
  const a = document.createElement('a');
  a.href = '#' + s.id;
  a.textContent = s.querySelector('h2').textContent.replace(/^\d+\.\s*/, '');
  toc.appendChild(a);
});
let idx = 0;
const go = d => {
  idx = Math.min(secs.length - 1, Math.max(0, idx + d));
  secs[idx].scrollIntoView({ behavior: 'smooth' });
};
let start = null, tick = null;
const timer = document.getElementById('timer');
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') go(1);
  else if (e.key === 'ArrowLeft') go(-1);
  else if (e.key.toLowerCase() === 'n') document.body.classList.toggle('hide-notes');
  else if (e.key.toLowerCase() === 't') {
    if (tick) { clearInterval(tick); tick = null; timer.hidden = true; return; }
    start = Date.now(); timer.hidden = false;
    tick = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      timer.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    }, 500);
  }
});
