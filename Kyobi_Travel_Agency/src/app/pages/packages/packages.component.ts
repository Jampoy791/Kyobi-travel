import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LegacyScriptService } from '../../services/legacy-script.service';

@Component({
  selector: 'app-packages',
  imports: [],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent implements AfterViewInit, OnDestroy {
  private onLegacyData = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('packages legacy data', detail);
  };

  constructor(private legacy: LegacyScriptService, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return; // Skip on server
    try {
      await this.legacy.loadScript('/assets/legacy/legacy.js');
      window.initLegacy?.();
      window.addEventListener('legacy:data', this.onLegacyData as EventListener);
    } catch (err) {
      console.error('Failed to load legacy script in PackagesComponent', err);
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('legacy:data', this.onLegacyData as EventListener);
  }

}
