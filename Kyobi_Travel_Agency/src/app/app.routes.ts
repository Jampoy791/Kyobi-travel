import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: 'search', loadComponent: () => import('./pages/search/search.component').then((m) => m.SearchComponent) },
  { path: 'packages', loadComponent: () => import('./pages/packages/packages.component').then((m) => m.PackagesComponent) },
  { path: 'budget', loadComponent: () => import('./pages/budget/budget.component').then((m) => m.BudgetComponent) },
  { path: 'booking', loadComponent: () => import('./pages/booking/booking.component').then((m) => m.BookingComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent) },
];
