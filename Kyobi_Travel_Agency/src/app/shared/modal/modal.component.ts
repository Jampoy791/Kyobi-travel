import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LegacyScriptService } from '../../services/legacy-script.service';

@Component({
  selector: 'app-modal',
  imports: [ ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  private onLegacyData = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('modal legacy data', detail);
  };

  constructor(private legacy: LegacyScriptService, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return; // Skip on server
    try {
      await this.legacy.loadScript('/assets/legacy/legacy.js');
      window.initLegacy?.();
      window.addEventListener('legacy:data', this.onLegacyData as EventListener);
    } catch (err) {
      console.error('Failed to load legacy script in ModalComponent', err);
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('legacy:data', this.onLegacyData as EventListener);
  }

 openModal(type: string): void {
    document.querySelectorAll<HTMLElement>('.modal-overlay').forEach(m => {
      m.classList.remove('open');
    });

    const modal = document.getElementById(`modal-${type}`);
    if (modal instanceof HTMLElement) {
      modal.classList.add('open');
    }
  }

  closeModal(): void {
    document.querySelectorAll<HTMLElement>('.modal-overlay').forEach(m => {
      m.classList.remove('open');
    });
  }

}

