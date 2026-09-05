import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface TravelPackage {
  name: string;
  tag: string;
  description: string;
  price: number;
  image: string;
  includes: string[];
}

@Component({
  selector: 'app-packages',
  imports: [],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {
  wishlistedPackages = new Set<string>();
  readonly packages: TravelPackage[] = [
    {
      name: 'Maldives Overwater Bliss',
      tag: '⭐ Best Seller',
      description: '7 nights in a luxury overwater villa with roundtrip flights, transfers, breakfast and dinner, a sunset dolphin cruise, and snorkeling.',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
      includes: ['✈ Flights', '🏨 Hotel 5★', '🍽 Meals', '🤿 Activities', '🚌 Transfers']
    },
    {
      name: 'Paris Romance Weekend',
      tag: '🏙 City Break',
      description: '5 days in Paris with a boutique hotel, Seine river cruise, Louvre entry, and Eiffel Tower dinner.',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80',
      includes: ['✈ Flights', '🏨 4★ Hotel', '🛥 Cruise']
    },
    {
      name: 'Thailand Island Hopper',
      tag: '🌴 Adventure',
      description: '10 days across Phuket, Koh Samui, and Krabi with ferry transfers, cave kayaking, cultural tours, and beach time.',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600&q=80',
      includes: ['✈ Flights', '🏨 3★ Hotels', '🚤 Ferries', '🏊 Tours']
    },
    {
      name: 'Japan Cherry Blossom Tour',
      tag: '🌸 Culture',
      description: '8 days across Tokyo, Kyoto, and Osaka during cherry blossom season with a bullet train pass, tea ceremony, and temple visits.',
      price: 2899,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
      includes: ['✈ Flights', '🏨 Hotels', '🚄 Rail Pass', '🍵 Tour']
    },
    {
      name: 'New York City Weekend',
      tag: '🗽 Urban',
      description: '4 nights in Manhattan with Central Park views, Broadway tickets, and a Statue of Liberty cruise.',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=80',
      includes: ['✈ Flights', '🏨 5★ Hotel', '🎭 Broadway']
    }
  ];

  constructor(private router: Router) {}

  toggleWishlist(packageName: string): void {
    const nextWishlist = new Set(this.wishlistedPackages);
    nextWishlist.has(packageName) ? nextWishlist.delete(packageName) : nextWishlist.add(packageName);
    this.wishlistedPackages = nextWishlist;
  }

  bookPackage(packageName: string, price: number): void {
    this.router.navigate(['/booking'], { queryParams: { destination: packageName, price } });
  }

}
