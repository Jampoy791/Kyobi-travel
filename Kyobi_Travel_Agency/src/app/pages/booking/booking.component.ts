import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LegacyScriptService } from '../../services/legacy-script.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html'
})
export class BookingComponent implements AfterViewInit, OnDestroy {
  private onLegacyData = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('booking legacy data', detail);
  };

  constructor(private legacy: LegacyScriptService, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return; // Skip on server
    try {
      await this.legacy.loadScript('/assets/legacy/legacy.js');
      window.initLegacy?.();
      window.addEventListener('legacy:data', this.onLegacyData as EventListener);
    } catch (err) {
      console.error('Failed to load legacy script in BookingComponent', err);
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('legacy:data', this.onLegacyData as EventListener);
  }

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