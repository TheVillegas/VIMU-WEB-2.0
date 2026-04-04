import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-page',
  standalone: false,
  templateUrl: './legal-page.component.html',
  styleUrl: './legal-page.component.scss'
})
export class LegalPageComponent {
  title: string;
  lead: string;

  constructor(private readonly router: Router) {
    const path = this.router.url.split('?')[0];

    if (path.includes('privacidad')) {
      this.title = 'Política de Privacidad';
      this.lead = 'Cómo tratamos los datos que compartís por contacto o agendamiento.';
      return;
    }

    if (path.includes('terminos')) {
      this.title = 'Términos de Servicio';
      this.lead = 'Reglas básicas para usar el sitio y contratar servicios.';
      return;
    }

    this.title = 'Política de Cookies';
    this.lead = 'Qué hacemos con cookies y tecnologías similares en el sitio.';
  }
}
