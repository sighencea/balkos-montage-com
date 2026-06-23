/* ============================================================
   i18n engine — default EN, auto-detect DE (German-speaking) / RO
   ============================================================ */
window.I18n = (function () {
  const SUPPORTED = ['en', 'de', 'ro'];
  const DEFAULT = 'en';
  const STORE_KEY = 'balkos_lang';
  const DE_REGIONS = ['DE', 'AT', 'CH', 'LI', 'LU']; // German-speaking
  const RO_REGIONS = ['RO', 'MD'];
  let dict = {};
  let current = DEFAULT;

  function detect() {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const langs = navigator.languages && navigator.languages.length
      ? navigator.languages : [navigator.language || ''];
    for (const raw of langs) {
      const code = (raw || '').toLowerCase();
      const region = (raw.split('-')[1] || '').toUpperCase();
      if (code.startsWith('de') || DE_REGIONS.includes(region)) return 'de';
      if (code.startsWith('ro') || RO_REGIONS.includes(region)) return 'ro';
    }
    return DEFAULT;
  }

  async function load(lang) {
    try {
      const res = await fetch('i18n/' + lang + '.json', { cache: 'no-cache' });
      return res.ok ? await res.json() : {};
    } catch (e) { console.warn('i18n load failed', lang, e); return {}; }
  }

  function apply() {
    document.documentElement.lang = current;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s && s.trim());
        if (attr && key && dict[key] != null) el.setAttribute(attr, dict[key]);
      });
    });
    document.querySelectorAll('[data-lang-current]').forEach(el => el.textContent = current.toUpperCase());
    document.querySelectorAll('[data-lang]').forEach(b =>
      b.setAttribute('aria-current', b.getAttribute('data-lang') === current ? 'true' : 'false'));
    document.dispatchEvent(new CustomEvent('i18n:applied', { detail: { lang: current } }));
  }

  async function set(lang) {
    current = SUPPORTED.includes(lang) ? lang : DEFAULT;
    localStorage.setItem(STORE_KEY, current);
    dict = await load(current);
    apply();
  }

  return {
    init: async () => { await set(detect()); },
    set,
    t: (key) => dict[key],
    get current() { return current; },
    SUPPORTED
  };
})();
