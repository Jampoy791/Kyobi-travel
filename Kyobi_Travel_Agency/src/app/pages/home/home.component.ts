import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LegacyScriptService } from '../../services/legacy-script.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private onLegacyData = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('home legacy data', detail);
  };

  constructor(private legacy: LegacyScriptService, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return; // Skip on server
    try {
      await this.legacy.loadScript('/assets/legacy/legacy.js');
      window.initLegacy?.();
      window.addEventListener('legacy:data', this.onLegacyData as EventListener);
    } catch (err) {
      console.error('Failed to load legacy script in HomeComponent', err);
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('legacy:data', this.onLegacyData as EventListener);
  }

}
