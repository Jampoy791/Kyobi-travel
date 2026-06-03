import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LegacyScriptService } from '../../services/legacy-script.service';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  private onLegacyData = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('footer legacy data', detail);
  };

  constructor(private legacy: LegacyScriptService, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return; // Skip on server
    try {
      await this.legacy.loadScript('/assets/legacy/legacy.js');
      window.initLegacy?.();
      window.addEventListener('legacy:data', this.onLegacyData as EventListener);
    } catch (err) {
      console.error('Failed to load legacy script in FooterComponent', err);
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('legacy:data', this.onLegacyData as EventListener);
  }
}
