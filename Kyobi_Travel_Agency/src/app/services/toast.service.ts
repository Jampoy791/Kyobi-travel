import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  // ===== TOAST =====
  showToast(msg: string): void {
    const t = document.getElementById('toast');
    if (!t) {
      return;
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }
}
