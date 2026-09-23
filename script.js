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

  /* ---------- Same-page header navigation ---------- */
  document.querySelectorAll('.site-header a[href]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const url = new URL(link.href, window.location.href);
      const samePage = url.pathname === window.location.pathname && url.search === window.location.search;
      if (!samePage) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      const target = url.hash ? document.querySelector(url.hash) : null;
      const scrollPosition = target || 0;

      if (window.siteLenis) {
        window.siteLenis.scrollTo(scrollPosition, {
          offset: target ? -80 : 0,
          duration: 1.2
        });
      } else {
        window.scrollTo({ top: target ? target.offsetTop - 80 : 0, behavior: 'smooth' });
      }

      history.replaceState(null, '', url.hash || window.location.pathname);
    });
  });

  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-leaving');
    requestAnimationFrame(() => document.body.classList.remove('page-ready'));
  });

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
    if (source && rcDetail) {
      if (rcWord) rcWord.textContent = source.dataset.letter;
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
  legendButtons.forEach((b) => b.addEventListener('click', () => activateStage(b.dataset.stage)));
  nodes.forEach((n) => n.addEventListener('mouseenter', () => activateStage(n.dataset.stage)));
  nodes.forEach((n) => n.addEventListener('click', () => activateStage(n.dataset.stage)));

  if (legendButtons.length) activateStage(legendButtons[0].dataset.stage);
  
  /* ---------- Tools page scrollspy (fallback: position-based) ---------- */
  const toolsNavs = document.querySelectorAll('.tools-nav');
  if (toolsNavs.length) {
    const header = document.querySelector('.site-header');
    const headerOffset = header ? header.offsetHeight + 8 : 88;

    toolsNavs.forEach((toolsNav) => {
      const links = Array.from(toolsNav.querySelectorAll('.nav-link'))
        .filter((l) => l.getAttribute('href') && l.getAttribute('href').startsWith('#'));

      function getTargets() {
        return links.map((l) => {
          const id = l.getAttribute('href').slice(1);
          return { id, link: l, el: document.getElementById(id) };
        }).filter((t) => t.el);
      }

      function setActiveLink(id) {
        links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }

      function getScrollOffset() {
        // On desktop the sidebar sits beside the cards, so only the header
        // obscures the target. On mobile, the full-width sticky nav also
        // sits above the cards.
        const navOffset = window.matchMedia('(max-width: 900px)').matches
          ? toolsNav.getBoundingClientRect().height + 16
          : 0;
        return headerOffset + navOffset;
      }

      links.forEach((link) => {
        link.addEventListener('click', (event) => {
          const id = link.getAttribute('href').slice(1);
          const target = document.getElementById(id);
          if (!target) return;
          event.preventDefault();
          event.stopImmediatePropagation();
          setActiveLink(id);
          history.replaceState(null, '', '#' + id);

          requestAnimationFrame(() => {
            const offset = getScrollOffset();
            if (window.siteLenis) {
              window.siteLenis.scrollTo(target, { offset: -offset, duration: 1.2 });
            } else {
              const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          });
        });
      });

      function updateActive() {
        const targets = getTargets();
        const offset = getScrollOffset();
        let below = [];
        let above = [];
        targets.forEach((t) => {
          const rect = t.el.getBoundingClientRect();
          const distance = rect.top - offset;
          if (distance >= 0) below.push({ t, distance });
          else above.push({ t, distance });
        });

        let chosen = null;
        if (above.length) {
          above.sort((a, b) => b.distance - a.distance);
          chosen = above[0].t;
        } else if (below.length) {
          below.sort((a, b) => a.distance - b.distance);
          chosen = below[0].t;
        }

        if (chosen) setActiveLink(chosen.id);
      }

      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => { updateActive(); ticking = false; });
          ticking = true;
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      window.addEventListener('load', updateActive, { once: true });
      updateActive();
    });
  }
})();


  /* ---------- Lenis Smooth Scroll ---------- */
  if (typeof Lenis !== "undefined") {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false
    });
    window.siteLenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    /* Intercept anchor links for smooth momentum scroll with offset */
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if(targetId === "#") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
        }
      });
    });
  }

