/* Contact / careers forms — AJAX submit to Formspree, then swap to a confirmation panel.
   Forms with an action URL are sent to that endpoint; forms without one fall back to the
   original placeholder behaviour (show confirmation, submit nothing). */
(function () {
  function messages() {
    const ro = (document.documentElement.lang || '').toLowerCase().startsWith('ro');
    return ro
      ? { sending: 'Se trimite…', error: 'Trimiterea a eșuat. Vă rugăm să încercați din nou sau să ne scrieți la office@balkos-montage.com.' }
      : { sending: 'Sending…', error: 'Something went wrong. Please try again or email us at office@balkos-montage.com.' };
  }

  function errorEl(form) {
    let el = form.querySelector('[data-form-error]');
    if (!el) {
      el = document.createElement('p');
      el.setAttribute('data-form-error', '');
      el.setAttribute('role', 'alert');
      el.hidden = true;
      el.style.cssText = 'margin:16px 0 0;font-size:13.5px;color:#b42318;line-height:1.6;';
      form.appendChild(el);
    }
    return el;
  }

  function showConfirm(form, wrap) {
    const confirmEl = wrap.querySelector('[data-confirm]');
    form.hidden = true;
    if (confirmEl) {
      confirmEl.hidden = false;
      confirmEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  async function submitToFormspree(form, wrap) {
    const msg = messages();
    const err = errorEl(form);
    const submitBtn = form.querySelector('[type="submit"]');
    const btnLabel = submitBtn ? submitBtn.querySelector('[data-i18n]') || submitBtn : null;
    const originalLabel = btnLabel ? btnLabel.textContent : '';

    err.hidden = true;
    if (submitBtn) submitBtn.disabled = true;
    if (btnLabel) btnLabel.textContent = msg.sending;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        showConfirm(form, wrap);
        return;
      }
      throw new Error('Formspree responded ' + res.status);
    } catch (e) {
      err.textContent = msg.error;
      err.hidden = false;
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnLabel) btnLabel.textContent = originalLabel;
    }
  }

  function wire(form) {
    const wrap = form.closest('[data-form-wrap]');
    if (!wrap) return;
    const confirmEl = wrap.querySelector('[data-confirm]');

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (form.getAttribute('action')) submitToFormspree(form, wrap);
      else showConfirm(form, wrap); // no endpoint configured — keep placeholder behaviour
    });

    const reset = wrap.querySelector('[data-reset]');
    if (reset) reset.addEventListener('click', () => {
      if (confirmEl) confirmEl.hidden = true;
      form.hidden = false;
      form.reset();
    });
  }

  function init() { document.querySelectorAll('form[data-placeholder-form]').forEach(wire); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
