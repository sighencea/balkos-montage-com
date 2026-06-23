/* Projects filtering — two AND-ed facets (industry × service) */
(function () {
  function init() {
    const bar = document.querySelector('[data-projects]');
    if (!bar) return;
    const cards = [...document.querySelectorAll('[data-project]')];
    const count = document.querySelector('[data-results-count]');
    const state = { industry: 'All', service: 'All' };

    function renderCount(n) {
      count.dataset.n = n;
      const t = window.I18n;
      const tmpl = (t && t.t(n === 1 ? 'projects.count.one' : 'projects.count.many'))
        || (n === 1 ? '1 project shown' : '{n} projects shown');
      count.textContent = tmpl.replace('{n}', n);
    }
    function apply() {
      let n = 0;
      cards.forEach(c => {
        const ind = c.dataset.industry;
        const svc = (c.dataset.services || '').split(',');
        const show = (state.industry === 'All' || ind === state.industry)
          && (state.service === 'All' || svc.indexOf(state.service) !== -1);
        c.hidden = !show;
        if (show) n++;
      });
      renderCount(n);
    }
    bar.querySelectorAll('[data-facet]').forEach(btn => btn.addEventListener('click', () => {
      const f = btn.dataset.facet;
      state[f] = btn.dataset.value;
      bar.querySelectorAll('[data-facet="' + f + '"]').forEach(b =>
        b.classList.toggle('is-active', b === btn));
      apply();
    }));
    document.addEventListener('i18n:applied', () => renderCount(parseInt(count.dataset.n || cards.length, 10)));
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
