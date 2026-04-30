import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  number: string;
  title: string;
  description: string;
  icon: 'code' | 'layers' | 'zap';
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services: Service[] = [
    {
      number: '01',
      title: 'Desarrollo Web',
      description: 'Landing pages, páginas informativas y tiendas online. Tecnologías probadas que cargan rápido y rankean bien en Google.',
      icon: 'code'
    },
    {
      number: '02',
      title: 'Sistemas a Medida',
      description: 'Paneles de control, CRMs, sistemas de gestión operacional. Automatizaciones que se adaptan a cómo trabajás vos, no al revés.',
      icon: 'layers'
    },
    {
      number: '03',
      title: 'Automatizaciones',
      description: 'Integraciones entre herramientas, bots de WhatsApp, flujos de trabajo automatizados. Menos tiempo en tareas repetitivas.',
      icon: 'zap'
    }
  ];
}