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

  function initBackToTop() {
    const btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;
    const toggle = () => btn.classList.toggle('is-visible', window.scrollY > 300);
    window.addEventListener('scroll', toggle, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    toggle();
  }

  // First-visit language prompt: site is Romanian by default; if the browser
  // prefers EN/DE we offer to switch. Text + buttons render in the DETECTED language.
  async function showLangPrompt(lang) {
    const s = await window.I18n.load(lang);
    const msg = s['langPrompt.message'], stay = s['langPrompt.stay'], sw = s['langPrompt.switch'];
    if (!msg) return;
    const overlay = document.createElement('div');
    overlay.className = 'langprompt-overlay';
    const dialog = document.createElement('div');
    dialog.className = 'langprompt';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-label', 'Language');

    const p = document.createElement('p');
    p.className = 'langprompt-msg';
    p.textContent = msg;

    const actions = document.createElement('div');
    actions.className = 'langprompt-actions';
    const stayBtn = document.createElement('button');
    stayBtn.type = 'button';
    stayBtn.className = 'btn langprompt-stay';
    stayBtn.textContent = stay;
    const switchBtn = document.createElement('button');
    switchBtn.type = 'button';
    switchBtn.className = 'btn btn-primary langprompt-switch';
    switchBtn.textContent = sw + ' ';
    const arrow = document.createElement('span');
    arrow.className = 'arrow';
    arrow.textContent = '→';
    switchBtn.appendChild(arrow);

    actions.appendChild(stayBtn);
    actions.appendChild(switchBtn);
    dialog.appendChild(p);
    dialog.appendChild(actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    function onKey(e) { if (e.key === 'Escape') choose(window.I18n.DEFAULT); }
    function choose(target) {
      window.I18n.set(target);
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    }
    stayBtn.addEventListener('click', () => choose(window.I18n.DEFAULT));
    switchBtn.addEventListener('click', () => choose(lang));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) choose(window.I18n.DEFAULT); });
    document.addEventListener('keydown', onKey);
    setTimeout(() => switchBtn.focus(), 60);
  }

  async function boot() {
    const nodes = [...document.querySelectorAll('[data-include]')];
    await Promise.all(nodes.map(loadInclude));
    initMenu();
    initBackToTop();
    // dynamic copyright year (falls back to the hard-coded year without JS)
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
    if (window.I18n) {
      const res = await window.I18n.init();
      if (res && res.prompt) showLangPrompt(res.prompt);
    }
    document.dispatchEvent(new Event('partials:loaded'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
