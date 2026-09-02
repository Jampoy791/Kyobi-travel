import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [ ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  activeModal: 'login' | 'signup' | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  openModal(type: 'login' | 'signup'): void {
    this.activeModal = type;
    this.cdr.markForCheck();
  }

  closeModal(): void {
    this.activeModal = null;
    this.cdr.markForCheck();
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.activeModal) this.closeModal();
  }

}

