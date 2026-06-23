/* Placeholder forms — swap to a confirmation panel on submit (no backend yet) */
(function () {
  function wire(form) {
    const wrap = form.closest('[data-form-wrap]');
    if (!wrap) return;
    const confirmEl = wrap.querySelector('[data-confirm]');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.hidden = true;
      confirmEl.hidden = false;
      confirmEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    const reset = wrap.querySelector('[data-reset]');
    if (reset) reset.addEventListener('click', () => {
      confirmEl.hidden = true;
      form.hidden = false;
      form.reset();
    });
  }
  function init() { document.querySelectorAll('form[data-placeholder-form]').forEach(wire); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
