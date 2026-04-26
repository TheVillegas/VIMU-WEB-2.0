import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const BASE_URL = 'https://vimudevs.com';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule),
    data: {
      title: 'Ingeniería de Software',
      description: 'VIMU DEVS — Agencia de ingeniería de software en Chile. Desarrollamos aplicaciones web, móviles y soluciones a medida para startups y empresas.',
      canonical: `${BASE_URL}/`
    }
  },
  {
    path: 'agendar',
    loadChildren: () => import('./agendar/agendar.module').then(m => m.AgendarModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'privacidad',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
    data: {
      title: 'Política de Privacidad',
      description: 'Política de privacidad de VIMU DEVS SpA. Conocé cómo tratamos tus datos personales.',
      canonical: `${BASE_URL}/privacidad`
    }
  },
  {
    path: 'terminos',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
    data: {
      title: 'Términos y Condiciones',
      description: 'Términos y condiciones de uso de los servicios de VIMU DEVS SpA.',
      canonical: `${BASE_URL}/terminos`
    }
  },
  {
    path: 'cookies',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
    data: {
      title: 'Política de Cookies',
      description: 'Política de cookies de VIMU DEVS SpA. Información sobre las cookies que utilizamos.',
      canonical: `${BASE_URL}/cookies`
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 96]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
