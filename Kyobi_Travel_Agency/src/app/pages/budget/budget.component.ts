import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LegacyScriptService } from '../../services/legacy-script.service';


@Component({
  selector: 'app-budget',
  imports: [RouterModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent implements AfterViewInit, OnDestroy {
  private onLegacyData = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    console.log('budget legacy data', detail);
  };

  constructor(private legacy: LegacyScriptService, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return; // Skip on server
    try {
      await this.legacy.loadScript('/assets/legacy/legacy.js');
      window.initLegacy?.();
      window.addEventListener('legacy:data', this.onLegacyData as EventListener);
    } catch (err) {
      console.error('Failed to load legacy script in BudgetComponent', err);
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('legacy:data', this.onLegacyData as EventListener);
  }

  showPage(id: string): void {
    document.querySelectorAll<HTMLElement>('.page').forEach(p => {
      p.classList.remove('active');
    });

    const page = document.getElementById(`page-${id}`);

    if (page instanceof HTMLElement) {
      page.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (id === 'search') this.buildResultsList();
    if (id === 'budget') this.updateBudget();
  }

  buildResultsList(): void {
    if (typeof window.buildResultsList === 'function') {
      window.buildResultsList();
    }
  }

  updateBudget(): void {
    if (typeof window.updateBudget === 'function') {
      window.updateBudget();
    }
  }

}
