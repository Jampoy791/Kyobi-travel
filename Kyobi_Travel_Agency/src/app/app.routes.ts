import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { BookingComponent } from './pages/booking/booking.component';
import { AboutComponent } from './pages/about/about.component';




export const routes: Routes = [

   { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'about', component: AboutComponent },
];
