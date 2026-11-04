/* Page behaviour. Two things only, both following native scroll:
   1. The work timeline's progress line and dots.
   2. The alarm walkthrough: a sticky thread that advances one step at a time
      on wide screens, and a plain list everywhere else. */
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const HEADER = 64;

const timeline = document.querySelector('[data-timeline]');
const entries = timeline ? [...timeline.querySelectorAll('[data-entry]')] : [];

const alarm = document.querySelector('[data-alarm]');
const track = alarm && alarm.querySelector('[data-alarm-track]');
const steps = alarm ? [...alarm.querySelectorAll('[data-step]')] : [];
const captions = alarm ? [...alarm.querySelectorAll('[data-caption]')] : [];
const bars = alarm ? [...alarm.querySelectorAll('.alarm__bars span')] : [];
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

function updateAlarm() {
  if (!pinned) return;
  const r = track.getBoundingClientRect();
  const span = r.height - (innerHeight - HEADER);
  const p = clamp((HEADER - r.top) / span);
  setStep(Math.min(steps.length - 1, Math.floor(p * steps.length * 1.08)));
}

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
