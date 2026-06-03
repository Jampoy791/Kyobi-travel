// Legacy JavaScript functions exposed globally
console.log('Legacy script loaded');

// Expose legacy functions to window
window.buildResultsList = function(data) {
  console.log('buildResultsList called with:', data);
  // Dispatch custom event for Angular components to listen to
  const event = new CustomEvent('legacy:data', { detail: { type: 'buildResultsList', data } });
  window.dispatchEvent(event);
};

window.updateBudget = function(budgetData) {
  console.log('updateBudget called with:', budgetData);
  const event = new CustomEvent('legacy:data', { detail: { type: 'updateBudget', data: budgetData } });
  window.dispatchEvent(event);
};

window.initLegacy = function() {
  console.log('initLegacy called');
  const event = new CustomEvent('legacy:data', { detail: { type: 'init' } });
  window.dispatchEvent(event);
};

window.showLegacyToast = function(message, type) {
  console.log('showLegacyToast called:', message, type);
  const event = new CustomEvent('legacy:data', { detail: { type: 'toast', message, toastType: type } });
  window.dispatchEvent(event);
};

window.openBooking = function(packageId) {
  console.log('openBooking called with packageId:', packageId);
  const event = new CustomEvent('legacy:data', { detail: { type: 'openBooking', packageId } });
  window.dispatchEvent(event);
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('Legacy script initialized on DOMContentLoaded');
  window.initLegacy?.();
});

// Also try immediate initialization (for SSR scenarios)
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  console.log('Legacy script already loaded, initializing immediately');
  window.initLegacy?.();
}
