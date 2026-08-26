import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [ ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  activeModal: 'login' | 'signup' | null = null;

  openModal(type: 'login' | 'signup'): void {
    this.activeModal = type;
  }

  closeModal(): void {
    this.activeModal = null;
  }

  @HostListener('document:keydown.escape')
  handleEscape(): void {
    if (this.activeModal) this.closeModal();
  }

}

