import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
// ===== RESULTS =====
  mockResults = [
    { type:'Hotel', name:'The Mulia Bali', loc:'Nusa Dua, Bali', price:349, stars:5, img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=70', chips:['Pool','Spa','WiFi','Beach'] },
    { type:'Flight', name:'MNL → NRT Return', loc:'Philippine Airlines · 4h 20m', price:599, stars:4, img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=70', chips:['Direct','Meals','Baggage'] },
    { type:'Hotel', name:'Hotel de Crillon', loc:'Paris, France', price:890, stars:5, img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=70', chips:['Pool','Spa','Concierge'] },
    { type:'Package', name:'Thailand 10-Night Bundle', loc:'Phuket + Koh Samui', price:2199, stars:4, img:'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&q=70', chips:['Flight','Hotel','Tours'] },
    { type:'Hotel', name:'Park Hyatt Tokyo', loc:'Shinjuku, Tokyo', price:520, stars:5, img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=70', chips:['Pool','Bar','City View'] },
    { type:'Flight', name:'MNL → SIN Return', loc:'Singapore Airlines · 3h 15m', price:280, stars:5, img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=70', chips:['Direct','Premium','Meals'] },
  ];

  buildResultsList() {
    const c = document.getElementById('resultsList');
    if (c) {
      c.innerHTML = this.mockResults.map((r,i) => `
        <div class="result-card" style="animation-delay:${i*0.08}s">
          <div class="result-img">
            <img src="${r.img}" alt="${r.name}" loading="lazy">
          </div>
          <div class="result-body">
            <div class="result-type">${r.type === 'Hotel' ? '🏨' : r.type === 'Flight' ? '✈' : '📦'} ${r.type}</div>
            <div class="result-name">${r.name}</div>
            <div class="result-location">📍 ${r.loc}</div>
            <div class="result-chips">${r.chips.map(c=>`<span class="chip">${c}</span>`).join('')}</div>
          </div>
          <div class="result-price-side">
            <div class="result-rating">
              <span class="stars">${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</span>
              ${r.stars}.0 / 5
            </div>
            <div>
              <div class="result-price">$${r.price.toLocaleString()}<small>/person</small></div>
              <button class="btn btn-primary" style="margin-top:10px;font-size:11px;padding:8px 14px" onclick="openBooking('${r.name}', ${r.price})">Book →</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

}




