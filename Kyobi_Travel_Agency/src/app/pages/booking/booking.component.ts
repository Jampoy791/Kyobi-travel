import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  constructor(private route: ActivatedRoute) {
    const queryParams = this.route.snapshot?.queryParams ?? {};
    this.destination = queryParams['destination'] ?? '';
    const queryPrice = Number(queryParams['price']);
    if (Number.isFinite(queryPrice) && queryPrice > 0) this.currentPrice = queryPrice;
  }


  destination: string = '';
  travelers: number = 2;
  room: number = 0;
  currentPrice: number = 1000; // example base price
  submitted = false;
  confirmed = false;

  get roomExtra(): number {
    return this.room;
  }

  get base(): number {
    return this.currentPrice * this.travelers;
  }

  get tax(): number {
    return Math.round(this.base * 0.12);
  }

  get total(): number {
    return this.base + this.roomExtra + this.tax;
  }

  confirmBooking(): void {
    this.submitted = true;
    if (this.destination.trim()) {
      this.confirmed = true;
    }
  }
}