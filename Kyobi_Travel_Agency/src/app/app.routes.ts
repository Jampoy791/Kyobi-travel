import { Routes } from '@angular/router';
import { HomeBannerComponent } from './components/home-banner/home-banner.component';
import { IntroductionComponent } from './components/introduction/introduction.component';



export const routes: Routes = [

   {path: '', component: HomeBannerComponent},
   {path: 'introduction', component: IntroductionComponent}
];
