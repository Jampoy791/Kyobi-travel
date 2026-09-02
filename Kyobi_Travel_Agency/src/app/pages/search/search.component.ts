import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface SearchResult {
  type: 'Hotel' | 'Flight' | 'Package';
  name: string;
  loc: string;
  price: number;
  stars: number;
  img: string;
  chips: string[];
}

@Component({
  selector: 'app-search',
  imports: [RouterModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  mockResults: SearchResult[] = [
    { type:'Hotel', name:'The Mulia Bali', loc:'Nusa Dua, Bali', price:349, stars:5, img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=70', chips:['Pool','Spa','WiFi','Beach'] },
    { type:'Flight', name:'MNL → NRT Return', loc:'Philippine Airlines · 4h 20m', price:599, stars:4, img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=70', chips:['Direct','Meals','Baggage'] },
    { type:'Hotel', name:'Hotel de Crillon', loc:'Paris, France', price:890, stars:5, img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=70', chips:['Pool','Spa','Concierge'] },
    { type:'Package', name:'Thailand 10-Night Bundle', loc:'Phuket + Koh Samui', price:2199, stars:4, img:'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&q=70', chips:['Flight','Hotel','Tours'] },
    { type:'Hotel', name:'Park Hyatt Tokyo', loc:'Shinjuku, Tokyo', price:520, stars:5, img:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=70', chips:['Pool','Bar','City View'] },
    { type:'Flight', name:'MNL → SIN Return', loc:'Singapore Airlines · 3h 15m', price:280, stars:5, img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=70', chips:['Direct','Premium','Meals'] },
  ];

  priceMin = 500;
  priceMax = 5000;
  selectedRating = 4;
  selectedTypes = new Set<SearchResult['type']>();
  sortBy = 'match';
  filtersApplied = false;

  get filteredResults(): SearchResult[] {
    const parsedMin = Number(this.priceMin);
    const parsedMax = Number(this.priceMax);

    const minimumPrice = Number.isFinite(parsedMin) ? Math.max(parsedMin, 0) : 0;
    const maximumPrice = Number.isFinite(parsedMax) ? Math.max(parsedMax, 0) : Number.MAX_SAFE_INTEGER;
    const normalizedMin = Math.min(minimumPrice, maximumPrice);
    const normalizedMax = Math.max(minimumPrice, maximumPrice);

    const results = this.mockResults.filter(result =>
      result.price >= normalizedMin &&
      result.price <= normalizedMax &&
      result.stars >= this.selectedRating &&
      (this.selectedTypes.size === 0 || this.selectedTypes.has(result.type))
    );

    return [...results].sort((first, second) => {
      if (this.sortBy === 'price-low') return first.price - second.price;
      if (this.sortBy === 'price-high') return second.price - first.price;
      if (this.sortBy === 'rating') return second.stars - first.stars;
      return 0;
    });
  }

  setRating(rating: number): void {
    this.selectedRating = rating;
  }

  toggleType(type: SearchResult['type'], checked: boolean): void {
    const nextTypes = new Set(this.selectedTypes);
    checked ? nextTypes.add(type) : nextTypes.delete(type);
    this.selectedTypes = nextTypes;
  }

  applyFilters(): void {
    this.filtersApplied = true;
  }

  resultIcon(type: SearchResult['type']): string {
    return type === 'Hotel' ? '🏨' : type === 'Flight' ? '✈' : '📦';
  }

}




