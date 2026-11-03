const secs = [...document.querySelectorAll('main section')];
const toc = document.getElementById('toc');
const participant = document.body.classList.contains('participant');
secs.forEach(s => {
  if (!toc) return;
  const a = document.createElement('a');
  a.href = '#' + s.id;
  a.textContent = s.querySelector('h2').textContent.replace(/^\d+\.\s*/, '');
  toc.appendChild(a);
});
let idx = 0;
const go = d => {
  const next = Math.min(secs.length - 1, Math.max(0, idx + d));
  if (participant) showSlide(next);
  else {
    idx = next;
    secs[idx].scrollIntoView({ behavior: 'smooth' });
  }
};
let showSlide;
if (participant) {
  const select = document.getElementById('slide-select');
  const previous = document.getElementById('previous-slide');
  const next = document.getElementById('next-slide');
  const status = document.getElementById('slide-status');
  document.querySelector('main').id = 'slides';
  secs.forEach((section, i) => {
    const heading = section.querySelector('h2');
    heading.id = section.id + '-title';
    section.setAttribute('aria-labelledby', heading.id);
    select.add(new Option(heading.textContent.replace(/^\d+\.\s*/, ''), String(i)));
    const content = document.createElement('div');
    content.className = 'slide-content';
    const copy = document.createElement('div');
    copy.className = 'slide-copy';
    const media = document.createElement('div');
    media.className = 'slide-media';
    [...section.children].forEach(child => {
      if (child.matches('ul, ol')) copy.appendChild(child);
      else if (child.matches('.shot')) media.appendChild(child);
    });
    content.appendChild(copy);
    if (media.children.length) content.appendChild(media);
    else content.classList.add('text-only');
    const source = section.querySelector('.src');
    section.insertBefore(content, source);
  });
  showSlide = (index, updateHash = true) => {
    idx = index;
    secs.forEach((section, i) => { section.hidden = i !== idx; });
    secs[idx].scrollTop = 0;
    select.value = String(idx);
    previous.disabled = idx === 0;
    next.disabled = idx === secs.length - 1;
    status.textContent = `Slide ${idx + 1} of ${secs.length}: ${select.options[idx].text}`;
    if (updateHash && location.hash !== '#' + secs[idx].id) {
      history.pushState(null, '', '#' + secs[idx].id);
    }
  };
  const showHash = () => showSlide(Math.max(0, secs.findIndex(s => '#' + s.id === location.hash)), false);
  previous.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  select.addEventListener('change', () => showSlide(Number(select.value)));
  window.addEventListener('hashchange', showHash);
  document.body.classList.add('slideshow');
  select.closest('nav').hidden = false;
  document.querySelector('.slide-controls').hidden = false;
  showHash();
}
let start = null, tick = null;
const timer = document.getElementById('timer');
document.addEventListener('keydown', e => {
  if (participant) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey ||
        e.target.closest('a, input, select, textarea, [contenteditable]')) return;
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    if (e.key === 'Home') showSlide(0);
    else if (e.key === 'End') showSlide(secs.length - 1);
    else go(e.key === 'ArrowRight' ? 1 : -1);
    return;
  }
  if (e.key === 'ArrowRight') go(1);
  else if (e.key === 'ArrowLeft') go(-1);
  else if (!participant && e.key.toLowerCase() === 'n') document.body.classList.toggle('hide-notes');
  else if (!participant && e.key.toLowerCase() === 't') {
    if (tick) { clearInterval(tick); tick = null; timer.hidden = true; return; }
    start = Date.now(); timer.hidden = false;
    tick = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      timer.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    }, 500);
  }
});

document.querySelectorAll('.shot img').forEach(img => {
  const markMissing = () => img.closest('.shot').classList.add('missing');
  img.addEventListener('error', markMissing);
  if (img.complete && img.naturalWidth === 0) markMissing();
});
