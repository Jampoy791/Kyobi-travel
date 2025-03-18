import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';


@Component({
  selector: 'app-root',
  imports: [NavBarComponent, HomeBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Kyobi_Travel_Agency';
}
