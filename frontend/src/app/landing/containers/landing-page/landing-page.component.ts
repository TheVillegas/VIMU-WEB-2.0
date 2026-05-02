import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { LogoStripComponent } from '../../components/logo-strip/logo-strip.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ProcesosComponent } from '../../components/procesos/procesos.component';
import { ProyectosComponent } from '../../components/proyectos/proyectos.component';
import { PorqueComponent } from '../../components/porque/porque.component';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    LogoStripComponent,
    ServicesComponent,
    ProcesosComponent,
    ProyectosComponent,
    PorqueComponent,
    ContactComponent
  ],
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent { }
