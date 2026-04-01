import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class Services {
  services = [
    {
      title: 'Consultoría TI',
      description: 'Asesoría estratégica para startups y empresas que buscan escalar su infraestructura tecnológica.',
      items: ['Arquitectura de Sistemas', 'Optimización de Procesos', 'Estrategia Cloud']
    },
    {
      title: 'Software a Medida',
      description: 'Desarrollo de aplicaciones robustas, escalables y orientadas a resultados tangibles.',
      items: ['Apps iOS / Android', 'Plataformas Web', 'Sistemas de Gestión']
    },
    {
      title: 'Presencia Digital',
      description: 'Más que una web, creamos experiencias que reflejan la esencia de tu marca.',
      items: ['Diseño UX/UI Premium', 'Landing Pages de Alta Conversión', 'Servicio Técnico & Hosting']
    }
  ];
}
