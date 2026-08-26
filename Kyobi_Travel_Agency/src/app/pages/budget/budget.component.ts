import { Component } from '@angular/core';

type BudgetCategory = 'flights' | 'hotels' | 'food' | 'activities' | 'shopping';

@Component({
  selector: 'app-budget',
  imports: [],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
  readonly circumference = 251.2;
  budgetTotal = 5000;
  allocations: Record<BudgetCategory, number> = {
    flights: 1500,
    hotels: 1200,
    food: 800,
    activities: 600,
    shopping: 300
  };

  get spent(): number {
    return Object.values(this.allocations).reduce((total, amount) => total + amount, 0);
  }

  get remaining(): number {
    return Math.max(this.budgetTotal - this.spent, 0);
  }

  get isOverBudget(): boolean {
    return this.spent > this.budgetTotal;
  }

  get chartTotal(): number {
    return Math.max(this.budgetTotal, this.spent, 1);
  }

  updateBudget(value: string): void {
    const parsedValue = Number(value);
    this.budgetTotal = Number.isFinite(parsedValue) ? Math.max(parsedValue, 0) : 0;
  }

  updateSlider(category: BudgetCategory, value: string): void {
    const parsedValue = Number(value);
    this.allocations[category] = Number.isFinite(parsedValue) ? Math.max(parsedValue, 0) : 0;
  }

  formatCurrency(amount: number): string {
    return `$${Math.round(amount).toLocaleString('en-US')}`;
  }

  ringDash(category: BudgetCategory): string {
    const length = (this.allocations[category] / this.chartTotal) * this.circumference;
    return `${length} ${this.circumference - length}`;
  }

  ringOffset(category: BudgetCategory): string {
    const categories: BudgetCategory[] = ['flights', 'hotels', 'food', 'activities', 'shopping'];
    const categoryIndex = categories.indexOf(category);
    const offset = categories
      .slice(0, categoryIndex)
      .reduce((total, previousCategory) => total + this.allocations[previousCategory], 0);
    return `${-(offset / this.chartTotal) * this.circumference}`;
  }

}
