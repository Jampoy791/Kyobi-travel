import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { IntroductionComponent } from './components/introduction/introduction.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';



@Component({
  selector: 'app-root',
  imports: [HomeBannerComponent, IntroductionComponent, RouterOutlet,
   MatIconModule,MatToolbarModule,MatButtonModule,MatListModule,MatMenuModule,MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kyobi_Travel_Agency';
}
