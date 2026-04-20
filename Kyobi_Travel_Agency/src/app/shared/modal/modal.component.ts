import { Component } from '@angular/core';


@Component({
  selector: 'app-modal',
  imports: [ ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

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

