import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html'
})
export class BookingComponent {

  destination: string = '';
  travelers: number = 2;
  room: number = 0;
  currentPrice: number = 1000; // example base price

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
    alert(`🎉 Booking confirmed for ${this.destination || 'your destination'}!`);
  }
}