import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  activeTab: 'flights' | 'hotels' | 'packages' = 'flights';
  wishlistedDestinations = new Set<string>();
  readonly marqueeItems = ['FLIGHTS', 'HOTELS', 'PACKAGES', 'BALI', 'PARIS', 'TOKYO', 'SANTORINI', 'MALDIVES', 'ADVENTURES AWAIT'];

  constructor(private router: Router) {}

  selectTab(tab: 'flights' | 'hotels' | 'packages'): void {
    this.activeTab = tab;
  }

  toggleWishlist(destination: string): void {
    const nextWishlist = new Set(this.wishlistedDestinations);
    nextWishlist.has(destination) ? nextWishlist.delete(destination) : nextWishlist.add(destination);
    this.wishlistedDestinations = nextWishlist;
  }

  searchTrips(): void {
    this.router.navigate(['/search']);
  }

  bookTrip(destination: string, price: number): void {
    this.router.navigate(['/booking'], { queryParams: { destination, price } });
  }

  scrollCarousel(carousel: HTMLElement, direction: -1 | 1): void {
    const card = carousel.querySelector<HTMLElement>('.dest-card, .pkg-card');
    const gap = Number.parseFloat(getComputedStyle(carousel).getPropertyValue('--carousel-gap')) || 36;

    if (card) {
      carousel.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
    }
  }

}
