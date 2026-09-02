import { ChangeDetectionStrategy, Component, EventEmitter, Output, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  isMenuOpen = false;
  isDarkMode = false;
  @Output() modalRequested = new EventEmitter<'login' | 'signup'>();

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isDarkMode = localStorage.getItem('kyobi-dark-mode') === 'true';
      this.applyDarkMode();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  openModal(type: 'login' | 'signup'): void {
    this.modalRequested.emit(type);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();
  }

  private applyDarkMode(): void {
    this.document.body.classList.toggle('dark', this.isDarkMode);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('kyobi-dark-mode', String(this.isDarkMode));
    }
  }
}
