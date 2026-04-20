import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-budget',
  imports: [RouterModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {

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
