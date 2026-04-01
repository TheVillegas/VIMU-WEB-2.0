import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { LandingPageComponent } from './containers/landing-page/landing-page.component';
import { HeroComponent } from './components/hero/hero.component';
import { LogoStripComponent } from './components/logo-strip/logo-strip.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProcesosComponent } from './components/procesos/procesos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }
];

@NgModule({
  declarations: [
    LandingPageComponent,
    HeroComponent,
    LogoStripComponent,
    ServicesComponent,
    ContactComponent,
    ProcesosComponent,
    NosotrosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LandingModule { }
