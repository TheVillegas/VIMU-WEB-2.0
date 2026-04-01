import { Component } from '@angular/core';

interface Service {
  number: string;
  title: string;
  description: string;
  items: string[];
}

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services: Service[] = [
    {
      number: '01',
      title: 'Consultoría TI',
      description: 'Asesoría estratégica para startups y empresas que buscan escalar su infraestructura tecnológica con decisiones fundadas.',
      items: ['Arquitectura de Sistemas', 'Optimización de Procesos', 'Estrategia Cloud']
    },
    {
      number: '02',
      title: 'Software a Medida',
      description: 'Desarrollo de aplicaciones robustas, escalables y orientadas a resultados tangibles para tu negocio.',
      items: ['Apps iOS / Android', 'Plataformas Web', 'Sistemas de Gestión']
    },
    {
      number: '03',
      title: 'Presencia Digital',
      description: 'Más que una web, creamos experiencias que reflejan la esencia de tu marca con precisión y carácter.',
      items: ['Diseño UX/UI Premium', 'Landing de Alta Conversión', 'Hosting & Soporte Técnico']
    }
  ];
}
