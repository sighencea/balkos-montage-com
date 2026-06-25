/* ============================================================
   i18n engine
   - Site ALWAYS opens in Romanian (default), regardless of browser.
   - Browser language is still detected; if it differs from RO, the
     caller is told via init() -> { prompt: 'en'|'de' } so it can offer
     a switch. A saved choice (or manual dropdown pick) is remembered
     and suppresses the prompt on future visits.
   ============================================================ */
window.I18n = (function () {
  const SUPPORTED = ['en', 'de', 'ro'];
  const DEFAULT = 'ro';                       // Romanian-first
  const STORE_KEY = 'balkos_lang';
  const DE_REGIONS = ['DE', 'AT', 'CH', 'LI', 'LU']; // German-speaking
  const RO_REGIONS = ['RO', 'MD'];
  let dict = {};
  let current = DEFAULT;

  function detectBrowser() {
    const langs = navigator.languages && navigator.languages.length
      ? navigator.languages : [navigator.language || ''];
    for (const raw of langs) {
      const code = (raw || '').toLowerCase();
      const region = (raw.split('-')[1] || '').toUpperCase();
      if (code.startsWith('ro') || RO_REGIONS.includes(region)) return 'ro';
      if (code.startsWith('de') || DE_REGIONS.includes(region)) return 'de';
      if (code.startsWith('en')) return 'en';
    }
    return 'en';
  }

  async function load(lang) {
    try {
      const res = await fetch('i18n/' + (SUPPORTED.includes(lang) ? lang : DEFAULT) + '.json', { cache: 'no-cache' });
      return res.ok ? await res.json() : {};
    } catch (e) { console.warn('i18n load failed', lang, e); return {}; }
  }

  const _decoder = (typeof document !== 'undefined') ? document.createElement('textarea') : null;
  function decode(s) { if (!_decoder) return s; _decoder.innerHTML = s; return _decoder.value; }

  function apply() {
    document.documentElement.lang = current;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s && s.trim());
        if (attr && key && dict[key] != null) el.setAttribute(attr, decode(dict[key]));
      });
    });
    document.querySelectorAll('[data-lang-current]').forEach(el => el.textContent = current.toUpperCase());
    document.querySelectorAll('[data-lang]').forEach(b =>
      b.setAttribute('aria-current', b.getAttribute('data-lang') === current ? 'true' : 'false'));
    document.dispatchEvent(new CustomEvent('i18n:applied', { detail: { lang: current } }));
  }

  // Apply a language WITHOUT remembering it (used for the default first paint)
  async function render(lang) {
    current = SUPPORTED.includes(lang) ? lang : DEFAULT;
    dict = await load(current);
    apply();
  }

  // User choice: apply AND remember it
  async function set(lang) {
    await render(lang);
    try { localStorage.setItem(STORE_KEY, current); } catch (e) {}
  }

  async function init() {
    let saved = null;
    try { saved = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (saved && SUPPORTED.includes(saved)) { await render(saved); return { prompt: null }; }
    await render(DEFAULT);                     // always open in Romanian
    const b = detectBrowser();
    return { prompt: b !== DEFAULT ? b : null };
  }

  return {
    init, set, render, load, detectBrowser,
    t: (key) => dict[key],
    get current() { return current; },
    SUPPORTED, DEFAULT
  };
})();
