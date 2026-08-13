/* Heal the Workplace — shared interactivity */
(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('is-open');
        document.body.style.overflow = '';
      })
    );
  }

  /* ---------- Copy page link ---------- */
  const copyBtn = document.querySelector('.copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch (e) {
        /* clipboard unavailable — no-op, keep UI calm */
      }
      copyBtn.setAttribute('data-copied', 'true');
      setTimeout(() => copyBtn.removeAttribute('data-copied'), 2200);
    });
  }

  /* ---------- RENEW diagram ---------- */
  const legendButtons = document.querySelectorAll('.renew-legend button');
  const nodes = document.querySelectorAll('.renew-node');
  const rcWord = document.querySelector('.rc-word');
  const rcDetail = document.querySelector('.rc-detail');

  function activateStage(key) {
    legendButtons.forEach((b) => b.classList.toggle('is-active', b.dataset.stage === key));
    nodes.forEach((n) => n.classList.toggle('is-active', n.dataset.stage === key));
    const source = document.querySelector(`.renew-legend button[data-stage="${key}"]`);
    if (source && rcWord && rcDetail) {
      rcWord.textContent = source.dataset.letter;
      rcDetail.textContent = source.dataset.detail;
    }
    document.querySelectorAll('.renew-node circle.node-bg').forEach((c) => {
      const active = c.closest('.renew-node').dataset.stage === key;
      c.setAttribute('fill', active ? 'var(--teal-700)' : 'var(--teal-150)');
    });
    document.querySelectorAll('.renew-node text').forEach((t) => {
      const active = t.closest('.renew-node').dataset.stage === key;
      t.setAttribute('fill', active ? 'var(--paper)' : 'var(--teal-900)');
    });
  }

  legendButtons.forEach((b) => b.addEventListener('mouseenter', () => activateStage(b.dataset.stage)));
  legendButtons.forEach((b) => b.addEventListener('focus', () => activateStage(b.dataset.stage)));
  nodes.forEach((n) => n.addEventListener('mouseenter', () => activateStage(n.dataset.stage)));

  if (legendButtons.length) activateStage(legendButtons[0].dataset.stage);
  
  /* ---------- Tools page scrollspy ---------- */
  const toolsNav = document.querySelector('.tools-nav');
  if (toolsNav) {
    const links = Array.from(toolsNav.querySelectorAll('.nav-link'))
      .filter(l => l.getAttribute('href') && l.getAttribute('href').startsWith('#'));
    const observers = [];
    const setActive = (id) => {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    };
  
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0 });
  
    links.forEach(link => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) io.observe(target);
    });
  }
})();
