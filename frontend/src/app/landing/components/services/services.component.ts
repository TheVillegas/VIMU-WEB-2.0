import { Component } from '@angular/core';

interface Service {
  number: string;
  title: string;
  description: string;
  items: string[];
  icon: 'briefcase' | 'layers' | 'refresh' | 'cloud' | 'spark';
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
      title: 'Diagnóstico antes de construir',
      description: 'Primero entendemos el problema, el negocio y las restricciones. Así evitamos venderte funcionalidades bonitas que no resuelven nada.',
      items: ['Alcance claro', 'Riesgos visibles', 'Plan entendible'],
      icon: 'briefcase'
    },
    {
      number: '02',
      title: 'Soluciones full-stack',
      description: 'Full-stack significa que nos hacemos cargo de la experiencia completa: pantalla, lógica, base de datos, seguridad e integraciones.',
      items: ['Frontend', 'Backend', 'Base de datos'],
      icon: 'layers'
    },
    {
      number: '03',
      title: 'Procesos sin Excel eterno',
      description: 'Convertimos tareas manuales, formularios sueltos y flujos repetidos en sistemas simples que ordenan la operación diaria.',
      items: ['Digitalización', 'Automatización', 'Menos reproceso'],
      icon: 'refresh'
    },
    {
      number: '04',
      title: 'Infraestructura lista para crecer',
      description: 'Publicamos tu solución en la nube con costos controlados, monitoreo y una base técnica que no se rompe al primer aumento de usuarios.',
      items: ['Deploy seguro', 'Escalado flexible', 'Costos controlados'],
      icon: 'cloud'
    },
    {
      number: '05',
      title: 'IA aplicada al trabajo real',
      description: 'Usamos IA donde aporta valor concreto: responder, clasificar, resumir, asistir decisiones o acelerar tareas internas repetitivas.',
      items: ['Automatización con IA', 'Asistentes', 'Flujos internos'],
      icon: 'spark'
    }
  ];
}

