import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { AboutComponent } from './pages/about/about.component';
import { BookingComponent } from './pages/booking/booking.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { HomeComponent } from './pages/home/home.component';
import { PackagesComponent } from './pages/packages/packages.component';
import { SearchComponent } from './pages/search/search.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ToastComponent } from './shared/toast/toast.component';
import { ModalComponent } from './shared/modal/modal.component';



@Component({
  selector: 'app-root',
  imports: [AboutComponent, FooterComponent,NavbarComponent, ModalComponent, ToastComponent, 
    BookingComponent, 
    BudgetComponent, 
    HomeComponent, 
    PackagesComponent, 
    SearchComponent,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kyobi_Travel_Agency';
}
