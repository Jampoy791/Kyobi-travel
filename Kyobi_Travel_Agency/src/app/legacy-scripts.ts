declare global {
  interface Window {
    showPage: (id: string) => void;
    switchTab: (btn: HTMLElement, contentId: string) => void;
    toggleDark: () => void;
    openModal: (type: string) => void;
    closeModal: () => void;
    toggleWishlist: (btn: HTMLElement, name: string) => void;
    toggleStar: (btn: HTMLElement) => void;
    updateSlider: (name: string) => void;
    updateBudget: () => void;
    buildResultsList: () => void;
    showToast: (msg: string) => void;
    openBooking: (destination: string, price: number) => void;
  }
}

const wishlist = new Set<string>();
const CIRC = 251.2;
const sliders = ['flights', 'hotels', 'food', 'activities', 'shopping'];
const colors: Record<string, string> = {
  flights: '#1E5CFF',
  hotels: '#FFD600',
  food: '#FF6B35',
  activities: '#00C896',
  shopping: '#C456F0',
};

function getElement<T extends Element>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function getClosestElement(element: Element, selector: string): Element | null {
  return element.closest(selector);
}

window.showPage = (id: string): void => {
  document.querySelectorAll<HTMLElement>('.page').forEach((page) => {
    page.classList.remove('active');
  });

  const page = getElement<HTMLElement>(`page-${id}`);
  if (page) {
    page.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'search') window.buildResultsList();
  if (id === 'budget') window.updateBudget();
};

window.switchTab = (btn: HTMLElement, contentId: string): void => {
  const widget = btn.closest('.search-widget');
  if (!widget) return;

  widget.querySelectorAll<HTMLElement>('.tab').forEach((tab) => tab.classList.remove('active'));
  widget.querySelectorAll<HTMLElement>('.tab-content').forEach((content) => content.classList.remove('active'));

  btn.classList.add('active');
  const content = getElement<HTMLElement>(contentId);

  if (content) {
    content.classList.add('active');
  }
};

window.toggleDark = (): void => {
  document.body.classList.toggle('dark');
  const toggle = getElement<HTMLButtonElement>('darkToggle');
  if (toggle) {
    toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  }
};

window.openModal = (type: string): void => {
  document.querySelectorAll<HTMLElement>('.modal-overlay').forEach((modal) => modal.classList.remove('open'));
  const target = getElement<HTMLElement>(`modal-${type}`);
  if (target) {
    target.classList.add('open');
  }
};

window.closeModal = (): void => {
  document.querySelectorAll<HTMLElement>('.modal-overlay').forEach((modal) => modal.classList.remove('open'));
};

window.toggleWishlist = (btn: HTMLElement, name: string): void => {
  if (wishlist.has(name)) {
    wishlist.delete(name);
    btn.textContent = '🤍';
    btn.classList.remove('saved');
    window.showToast(`${name} removed from wishlist`);
    return;
  }

  wishlist.add(name);
  btn.textContent = '❤️';
  btn.classList.add('saved');
  window.showToast(`${name} saved to wishlist!`);
};

window.toggleStar = (btn: HTMLElement): void => {
  const container = btn.closest('.star-filter');
  if (!container) return;
  container.querySelectorAll<HTMLElement>('.star-btn').forEach((button) => button.classList.remove('active'));
  btn.classList.add('active');
  window.showToast('Rating filter applied');
};

window.updateSlider = (name: string): void => {
  const slider = getElement<HTMLInputElement>(`sl-${name}`);
  const valueLabel = getElement<HTMLElement>(`val-${name}`);
  if (!slider || !valueLabel) return;

  const value = parseInt(slider.value, 10);
  valueLabel.textContent = `$${value.toLocaleString()}`;
  window.updateBudget();
};

window.updateBudget = (): void => {
  const totalBudgetInput = getElement<HTMLInputElement>('totalBudget');
  const total = totalBudgetInput ? parseInt(totalBudgetInput.value, 10) || 5000 : 5000;
  let spent = 0;
  const values: Record<string, number> = {};

  sliders.forEach((key) => {
    const slider = getElement<HTMLInputElement>(`sl-${key}`);
    const valueLabel = getElement<HTMLElement>(`val-${key}`);
    const legend = getElement<HTMLElement>(`leg-${key}`);

    const value = slider ? parseInt(slider.value, 10) || 0 : 0;
    values[key] = value;
    spent += value;

    if (valueLabel) {
      valueLabel.textContent = `$${value.toLocaleString()}`;
    }
    if (legend) {
      legend.textContent = `$${value.toLocaleString()}`;
    }
  });

  const remaining = total - spent;
  const remainingLabel = getElement<HTMLElement>('donutRemaining');
  const remainingLegend = getElement<HTMLElement>('leg-remaining');
  const warn = getElement<HTMLElement>('budgetWarning');

  if (remainingLabel) {
    remainingLabel.textContent = `${remaining < 0 ? '-$' : '$'}${Math.abs(remaining).toLocaleString()}`;
  }
  if (remainingLegend) {
    remainingLegend.textContent = `${remaining < 0 ? '-$' : '$'}${Math.abs(remaining).toLocaleString()}`;
  }
  if (warn) {
    warn.style.display = remaining < 0 ? 'block' : 'none';
  }

  let offset = 0;
  sliders.forEach((key) => {
    const ring = getElement<SVGCircleElement>(`ring-${key}`);
    if (!ring) return;
    const pct = total > 0 ? (values[key] || 0) / total : 0;
    const arc = Math.min(pct, 1) * CIRC;
    ring.setAttribute('stroke-dasharray', `${arc} ${CIRC}`);
    ring.setAttribute('stroke-dashoffset', `${-offset}`);
    ring.setAttribute('stroke', colors[key]);
    offset += arc;
  });
};

window.buildResultsList = (): void => {
  const results = [
    { type:'Hotel', name:'The Mulia Bali', loc:'Nusa Dua, Bali', price:349, stars:5, img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=70', chips:['Pool','Spa','WiFi','Beach'] },
    { type:'Flight', name:'MNL → NRT Return', loc:'Philippine Airlines · 4h 20m', price:599, stars:4, img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=70', chips:['Direct','Meals','Baggage'] },
    { type:'Hotel', name:'Hotel de Crillon', loc:'Paris, France', price:890, stars:5, img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=70', chips:['Pool','Spa','Concierge'] },
    { type:'Package', name:'Thailand 10-Night Bundle', loc:'Phuket + Koh Samui', price:2199, stars:4, img:'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&q=70', chips:['Flight','Hotel','Tours'] },
    { type:'Hotel', name:'Park Hyatt Tokyo', loc:'Shinjuku, Tokyo', price:520, stars:5, img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=70', chips:['Pool','Bar','City View'] },
    { type:'Flight', name:'MNL → SIN Return', loc:'Singapore Airlines · 3h 15m', price:280, stars:5, img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=70', chips:['Direct','Premium','Meals'] },
  ];

  const container = getElement<HTMLElement>('resultsList');
  if (!container) return;

  container.innerHTML = results.map((result, index) => `
    <div class="result-card" style="animation-delay:${index * 0.08}s">
      <div class="result-img">
        <img src="${result.img}" alt="${result.name}" loading="lazy">
      </div>
      <div class="result-body">
        <div class="result-type">${result.type === 'Hotel' ? '🏨' : result.type === 'Flight' ? '✈' : '📦'} ${result.type}</div>
        <div class="result-name">${result.name}</div>
        <div class="result-location">📍 ${result.loc}</div>
        <div class="result-chips">${result.chips.map((chip) => `<span class="chip">${chip}</span>`).join('')}</div>
      </div>
      <div class="result-price-side">
        <div class="result-rating">
          <span class="stars">${'★'.repeat(result.stars)}${'☆'.repeat(5 - result.stars)}</span>
          ${result.stars}.0 / 5
        </div>
        <div>
          <div class="result-price">$${result.price.toLocaleString()}<small>/person</small></div>
          <button class="btn btn-primary" style="margin-top:10px;font-size:11px;padding:8px 14px" onclick="openBooking('${result.name}', ${result.price})">Book →</button>
        </div>
      </div>
    </div>
  `).join('');
};

window.showToast = (msg: string): void => {
  const toast = getElement<HTMLElement>('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3000);
};

window.openBooking = (destination: string, price: number): void => {
  window.showToast(`🎉 Booking confirmed for ${destination}! Price: $${price.toLocaleString()}`);
};

function setDefaultDates(): void {
  const today = new Date();
  const nextMonth = new Date(today.getTime() + 30 * 86400000);
  const twoMonths = new Date(today.getTime() + 45 * 86400000);

  const fmt = (date: Date): string => date.toISOString().split('T')[0];

  ['flightDep', 'bkDep'].forEach((id) => {
    const element = getElement<HTMLInputElement>(id);
    if (element) {
      element.value = fmt(nextMonth);
    }
  });

  ['flightRet', 'bkRet'].forEach((id) => {
    const element = getElement<HTMLInputElement>(id);
    if (element) {
      element.value = fmt(twoMonths);
    }
  });
}

function attachModalCloseHandlers(): void {
  document.querySelectorAll<HTMLElement>('.modal-overlay').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        window.closeModal();
      }
    });
  });
}

function initializeLegacyScripts(): void {
  attachModalCloseHandlers();
  setDefaultDates();
  window.updateBudget();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLegacyScripts);
} else {
  initializeLegacyScripts();
}

export {};
