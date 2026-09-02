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
  readonly maxDestinationLength = 80;

  constructor(private route: ActivatedRoute) {
    const queryParams = this.route.snapshot?.queryParams ?? {};
    const incomingDestination = String(queryParams['destination'] ?? '').trim();
    this.destination = incomingDestination.slice(0, this.maxDestinationLength);
    const queryPrice = Number(queryParams['price']);
    if (Number.isFinite(queryPrice) && queryPrice > 0) this.currentPrice = queryPrice;
  }

  destination = '';
  destinationError = '';
  travelers = 2;
  room = 0;
  currentPrice = 1000;
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

  updateDestination(value: string): void {
    this.destination = value.trimStart().slice(0, this.maxDestinationLength);
    this.destinationError = '';
  }

  private validateDestination(): boolean {
    const normalized = this.destination.trim();

    if (!normalized) {
      this.destinationError = 'Tell us where you want to go.';
      return false;
    }

    if (normalized.length > this.maxDestinationLength) {
      this.destinationError = `Keep the destination under ${this.maxDestinationLength} characters.`;
      return false;
    }

    this.destinationError = '';
    this.destination = normalized;
    return true;
  }

  confirmBooking(): void {
    this.submitted = true;

    if (!this.validateDestination()) {
      this.confirmed = false;
      return;
    }

    this.confirmed = true;
  }
}