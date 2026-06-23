/* ============================================================
   Partial includes (single-source nav/footer) + UI wiring
   Usage: <div data-include="partials/nav.html" data-active="services"></div>
   NOTE: fetch() of local partials requires http(s) — use a local server
   in dev (e.g. `python3 -m http.server`). Works as-is on GitHub Pages.
   ============================================================ */
(function () {
  async function loadInclude(node) {
    const url = node.getAttribute('data-include');
    const active = node.getAttribute('data-active');
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      const html = await res.text();
      const tpl = document.createElement('template');
      tpl.innerHTML = html.trim();
      if (active) {
        const link = tpl.content.querySelector('.nav-link[data-key="' + active + '"]');
        if (link) { link.classList.add('is-active'); link.setAttribute('aria-current', 'page'); }
      }
      node.replaceWith(tpl.content);
    } catch (e) {
      console.error('Include failed for', url, e);
    }
  }

  function initMenu() {
    // Mobile hamburger
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const open = nav.classList.toggle('is-open');
        document.body.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      nav.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }));
    }
    // Language dropdown
    const sw = document.querySelector('[data-lang-switcher]');
    if (sw) {
      const btn = sw.querySelector('[data-lang-toggle]');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = sw.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
      sw.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
        window.I18n.set(b.getAttribute('data-lang'));
        sw.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }));
      document.addEventListener('click', (e) => {
        if (!sw.contains(e.target)) { sw.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
      });
    }
  }

  async function boot() {
    const nodes = [...document.querySelectorAll('[data-include]')];
    await Promise.all(nodes.map(loadInclude));
    initMenu();
    if (window.I18n) await window.I18n.init();
    document.dispatchEvent(new Event('partials:loaded'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
