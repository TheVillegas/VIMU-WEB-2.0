import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './containers/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }
];

@NgModule({
  imports: [
    LandingPageComponent,
    RouterModule.forChild(routes)
  ]
})
export class LandingModule { }
