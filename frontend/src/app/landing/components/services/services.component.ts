import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  number: string;
  title: string;
  description: string;
  icon: 'web' | 'system' | 'automation' | 'cloud';
  tags: string[];
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
      title: 'Sitios web y landing pages',
      description: 'Presencia digital r\u00e1pida, clara y preparada para convertir visitas en conversaciones reales.',
      icon: 'web',
      tags: ['PYMEs', 'Emprendedores', 'SEO base']
    },
    {
      number: '02',
      title: 'Sistemas internos a medida',
      description: 'Herramientas para ordenar operaci\u00f3n, usuarios, reportes y flujos que hoy viven repartidos entre Excel, WhatsApp y correos.',
      icon: 'system',
      tags: ['Web apps', 'Paneles', 'Gesti\u00f3n']
    },
    {
      number: '03',
      title: 'Automatizaci\u00f3n de procesos',
      description: 'Conectamos formularios, calendarios, notificaciones y tareas repetitivas para reducir trabajo manual.',
      icon: 'automation',
      tags: ['IA \u00fatil', 'APIs', 'Flujos']
    },
    {
      number: '04',
      title: 'Infraestructura lista para crecer',
      description: 'Publicamos con criterio: costos controlados, despliegue simple y base t\u00e9cnica mantenible.',
      icon: 'cloud',
      tags: ['Deploy', 'Monitoreo', 'Escalable']
    }
  ];
}
