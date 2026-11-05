/* Page behaviour, all on top of native scroll:
   1. The work timeline's progress line and dots.
   2. The alarm walkthrough: a sticky thread that advances one step at a time
      on wide screens (with step buttons to jump), a plain list elsewhere.
   3. The header marks the section you are reading.
   4. Copy the email address, for people without a mail app set up. */
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const HEADER = 64;

const timeline = document.querySelector('[data-timeline]');
const entries = timeline ? [...timeline.querySelectorAll('[data-entry]')] : [];

const alarm = document.querySelector('[data-alarm]');
const track = alarm && alarm.querySelector('[data-alarm-track]');
const steps = alarm ? [...alarm.querySelectorAll('[data-step]')] : [];
const captions = alarm ? [...alarm.querySelectorAll('[data-caption]')] : [];
const bars = alarm ? [...alarm.querySelectorAll('[data-goto]')] : [];
const count = alarm && alarm.querySelector('[data-alarm-count]');
let pinned = false;
let current = -1;

function clamp(v) { return Math.min(1, Math.max(0, v)); }

function updateTimeline() {
  if (!timeline) return;
  const r = timeline.getBoundingClientRect();
  const mark = innerHeight * 0.6;
  timeline.style.setProperty('--fill', clamp((mark - r.top) / r.height).toFixed(4));
  for (const e of entries) {
    e.classList.toggle('is-reached', e.getBoundingClientRect().top + 12 < mark);
  }
}

function setStep(i) {
  if (i === current) return;
  current = i;
  steps.forEach((s, n) => s.classList.toggle('is-on', n <= i));
  captions.forEach((c, n) => c.classList.toggle('is-on', n === i));
  bars.forEach((b, n) => b.classList.toggle('is-on', n <= i));
  if (count) count.textContent = String(i + 1);
}

const STRETCH = 1.08; // the last step arrives a little early and holds
function updateAlarm() {
  if (!pinned) return;
  const r = track.getBoundingClientRect();
  const span = r.height - (innerHeight - HEADER);
  const p = clamp((HEADER - r.top) / span);
  setStep(Math.min(steps.length - 1, Math.floor(p * steps.length * STRETCH)));
}

// Step buttons scroll to the point where that step is showing.
bars.forEach((b, i) => b.addEventListener('click', () => {
  if (!pinned) {
    steps[i].scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'center' });
    return;
  }
  const r = track.getBoundingClientRect();
  const span = r.height - (innerHeight - HEADER);
  const p = (i + 0.4) / (steps.length * STRETCH);
  scrollTo({ top: scrollY + r.top - HEADER + p * span, behavior: reduce.matches ? 'auto' : 'smooth' });
}));

// Pin only where it reads well: a wide screen, motion allowed, and a thread
// that fits the viewport with every step shown.
function decideAlarm() {
  if (!alarm) return;
  // Measure in the pinned layout, where captions move out of the thread.
  alarm.classList.add('is-pinned');
  const grid = alarm.querySelector('.alarm__grid');
  const fits = grid.offsetHeight + HEADER + 48 <= innerHeight;
  pinned = !reduce.matches && innerWidth >= 900 && fits;
  alarm.classList.toggle('is-pinned', pinned);
  if (pinned) {
    current = -1;
    updateAlarm();
  } else {
    steps.forEach((s) => s.classList.add('is-on'));
  }
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    updateTimeline();
    updateAlarm();
  });
}

// Measuring forces layout, so wait until the first paint is done.
function init() {
  decideAlarm();
  updateTimeline();
  // Pinning makes the alarm section taller. If the page opened on an anchor
  // below it, land on that anchor again.
  const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (pinned && target && alarm.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) {
    target.scrollIntoView({ behavior: 'instant' });
  }
}
if (document.readyState === 'complete') setTimeout(init, 0);
else addEventListener('load', () => setTimeout(init, 0), { once: true });
addEventListener('scroll', onScroll, { passive: true });
let resizeTimer;
addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { decideAlarm(); updateTimeline(); }, 120);
});
reduce.addEventListener('change', decideAlarm);

// 3. Where am I: mark the nav link for the section in the middle of the screen.
const links = [...document.querySelectorAll('[data-nav]')];
const owner = { start: null, work: 'work', alarm: 'work', approach: 'approach', recognition: 'recognition', contact: 'contact' };
const seen = new Map();
const spy = new IntersectionObserver((list) => {
  list.forEach((e) => seen.set(e.target.id, e.isIntersecting));
  const active = Object.keys(owner).filter((id) => seen.get(id)).pop();
  const key = active ? owner[active] : null;
  links.forEach((a) => {
    if (a.dataset.nav === key) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
}, { rootMargin: '-45% 0px -50% 0px' });
Object.keys(owner).forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

// 4. Copy the email address, with feedback that it worked.
const copyBtn = document.querySelector('[data-copy]');
const copyLabel = copyBtn && copyBtn.querySelector('[data-copy-label]');
const copyStatus = document.querySelector('[data-copy-status]');
let copyTimer;
function fallbackCopy(text) {
  const t = document.createElement('textarea');
  t.value = text; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
  document.body.appendChild(t); t.select();
  const ok = document.execCommand('copy');
  t.remove();
  return ok;
}
if (copyBtn) copyBtn.addEventListener('click', async () => {
  const text = copyBtn.dataset.copy;
  let ok = false;
  try { await navigator.clipboard.writeText(text); ok = true; } catch { ok = fallbackCopy(text); }
  copyBtn.classList.toggle('is-done', ok);
  copyLabel.textContent = ok ? 'Copied' : 'Copy failed';
  copyStatus.textContent = ok ? 'Email address copied.' : 'Could not copy. The address is ' + text + '.';
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyBtn.classList.remove('is-done');
    copyLabel.textContent = 'Copy email';
  }, 2000);
});
