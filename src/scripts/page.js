/* Page behaviour on top of the unmodified scrollcraft engine.
   1. Decide pinned or static before the engine mounts.
   2. Mount the engine.
   3. Timeline progress line and dots.
   4. Margin folio (current chapter).
   5. The access ledger in the alarm sequence (the signature), driven by --sc-p. */
(function () {
  'use strict';
  var doc = document;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = matchMedia('(max-width: 767px)').matches;

  // 1. Static mode. Reduced motion: no pinning anywhere. Narrow screens: the
  // alarm sequence becomes a stacked list that reveals each step once.
  function unpin(act, reveal) {
    act.setAttribute('data-sc-act', 'flow');
    act.removeAttribute('data-sc-span');
    act.classList.add('is-static');
    Array.prototype.forEach.call(act.querySelectorAll('[data-sc-cue]'), function (el) {
      el.removeAttribute('data-sc-cue');
      el.removeAttribute('data-sc-kinetic');
      if (reveal) el.setAttribute('data-sc-in', '');
    });
  }
  if (reduce) {
    Array.prototype.forEach.call(doc.querySelectorAll('[data-sc-act="pin"]'), function (a) { unpin(a, false); });
    Array.prototype.forEach.call(doc.querySelectorAll('[data-sc-kinetic]'), function (el) {
      el.removeAttribute('data-sc-kinetic');
    });
  } else {
    // Narrow screens: the alarm becomes a stacked list.
    var alarm = doc.querySelector('[data-alarm]');
    if (alarm && narrow) unpin(alarm, true);
    // Any pinned act whose content does not fit the viewport (a short laptop
    // window, a small phone) would be clipped while pinned, so it reads as a
    // normal section instead. Measured before the engine sets heights.
    Array.prototype.forEach.call(doc.querySelectorAll('[data-sc-act="pin"]'), function (a) {
      var stage = a.querySelector('[data-sc-stage]');
      if (!stage) return;
      if (stage.offsetHeight > innerHeight - 16) unpin(a, true);
    });
  }

  // 2. Engine.
  if (window.ScrollCraft) window.ScrollCraft.mount(doc.body);

  // 3 to 5 share one passive scroll listener and one rAF.
  var timeline = doc.querySelector('[data-timeline]');
  var entries = timeline ? timeline.querySelectorAll('[data-entry]') : [];
  var folio = doc.querySelector('[data-folio]');
  var chapters = doc.querySelectorAll('[data-folio-title]');
  var alarmAct = doc.querySelector('[data-alarm]');
  var ledger = doc.querySelector('[data-ledger]');
  var rows = ledger ? ledger.querySelectorAll('li') : [];
  var ledgerLive = ledger && alarmAct && !alarmAct.classList.contains('is-static');
  var lastFolio = '';
  var queued = false;

  function frame() {
    queued = false;
    var vh = innerHeight;
    var mark = vh * 0.4;

    if (timeline) {
      var r = timeline.getBoundingClientRect();
      var fill = r.height ? (mark - r.top) / r.height : 1;
      fill = fill < 0 ? 0 : fill > 1 ? 1 : fill;
      timeline.style.setProperty('--fill', fill.toFixed(4));
      for (var i = 0; i < entries.length; i++) {
        var top = entries[i].getBoundingClientRect().top;
        entries[i].classList.toggle('is-reached', top < mark);
      }
    }

    if (folio) {
      var title = '';
      for (var c = 0; c < chapters.length; c++) {
        if (chapters[c].getBoundingClientRect().top <= mark) title = chapters[c].getAttribute('data-folio-title');
      }
      if (title !== lastFolio) { folio.textContent = title || ' '; lastFolio = title; }
    }

    if (ledgerLive) {
      var p = parseFloat(alarmAct.style.getPropertyValue('--sc-p')) || 0;
      for (var k = 0; k < rows.length; k++) {
        var row = rows[k];
        var on = p >= parseFloat(row.getAttribute('data-at'));
        if (row.classList.contains('is-on') !== on) {
          row.classList.toggle('is-on', on);
          var st = row.querySelector('.ledger__state');
          st.textContent = on ? st.getAttribute('data-on') : 'waiting';
        }
      }
    }
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(frame); } }

  if (ledger && !ledgerLive) {
    // Static mode: show the ledger resolved.
    Array.prototype.forEach.call(rows, function (row) {
      row.classList.add('is-on');
      var st = row.querySelector('.ledger__state');
      st.textContent = st.getAttribute('data-on');
    });
  }

  // Keyboard users can tab into a block before its entry fade has fired.
  // Reveal it at once so focus never lands on something invisible.
  doc.addEventListener('focusin', function (e) {
    var host = e.target.closest && e.target.closest('[data-sc-in]:not(.sc-in)');
    if (!host) return;
    host.classList.add('sc-in');
    Array.prototype.forEach.call(host.children, function (k) { k.classList.add('sc-in'); });
  });

  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  queue();
})();
