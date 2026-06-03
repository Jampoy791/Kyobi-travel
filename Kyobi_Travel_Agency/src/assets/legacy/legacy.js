/* Demo legacy script for integration with Angular components
   Exposes: buildResultsList, updateBudget, initLegacy, openBooking, showLegacyToast
   Dispatches: CustomEvent('legacy:data', { detail }) for Angular listeners
*/
(function () {
  const mockResults = [
    { type: 'Hotel', name: 'Legacy Hotel A', loc: 'Legacy City', price: 199, stars: 4 },
    { type: 'Flight', name: 'Legacy Flight B', loc: 'Legacy Route', price: 299, stars: 3 },
  ];

  function dispatch(detail) {
    try {
      window.dispatchEvent(new CustomEvent('legacy:data', { detail }));
    } catch (e) {
      console.warn('legacy: failed to dispatch legacy:data', e);
    }
  }

  window.buildResultsList = function () {
    // dispatch data for Angular to consume
    dispatch({ type: 'results', results: mockResults });

    // update DOM for parts of the app still relying on global DOM manipulation
    const c = document.getElementById('resultsList');
    if (c) {
      c.innerHTML = mockResults.map((r, i) => (
        '<div class="result-card" style="animation-delay:' + (i * 0.08) + 's">' +
        '<div class="result-img"><img src="https://via.placeholder.com/150" loading="lazy"></div>' +
        '<div class="result-body"><div class="result-name">' + r.name + '</div>' +
        '<div class="result-location">' + r.loc + '</div></div>' +
        '<div class="result-price-side"><div class="result-price">$' + r.price + '</div>' +
        '</div></div>'
      )).join('');
    }
  };

  window.updateBudget = function () {
    const data = { type: 'budget', total: 1234 };
    dispatch(data);
    const el = document.getElementById('budgetValue');
    if (el) el.textContent = '$' + data.total;
  };

  window.openBooking = function (name, price) {
    dispatch({ type: 'openBooking', name: name, price: price });
    // Fallback behaviour for legacy UI
    // eslint-disable-next-line no-alert
    alert('Opening booking for ' + name + ' ($' + price + ')');
  };

  window.showLegacyToast = function (msg) {
    dispatch({ toastMessage: msg });
  };

  window.initLegacy = function () {
    // Example initializer: emit an initial event and wire simple handlers
    dispatch({ type: 'init', timestamp: Date.now() });
    // If the legacy code needs to hook DOM events, do it here.
    console.info('legacy: initLegacy executed');
  };

  // Auto-initialize after load
  try {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      window.initLegacy();
    } else {
      window.addEventListener('DOMContentLoaded', () => window.initLegacy());
    }
  } catch (e) {
    console.warn('legacy: init error', e);
  }

})();
