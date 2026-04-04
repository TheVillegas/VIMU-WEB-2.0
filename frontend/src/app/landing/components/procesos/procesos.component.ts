import { Component } from '@angular/core';

interface Paso {
  number: string;
  icon: 'search' | 'design' | 'build' | 'support';
  title: string;
  description: string;
}

@Component({
  selector: 'app-procesos',
  standalone: false,
  templateUrl: './procesos.component.html',
  styleUrl: './procesos.component.scss'
})
export class ProcesosComponent {
  pasos: Paso[] = [
    {
      number: '01',
      icon: 'search',
      title: 'Diagnóstico',
      description: 'Antes de proponer cualquier solución, entendemos el problema real. Relevamos objetivos, restricciones técnicas y dolores operativos para que lo que se construya tenga sentido desde el inicio.'
    },
    {
      number: '02',
      icon: 'design',
      title: 'Diseño',
      description: 'Definimos arquitectura y flujo de usuario antes de escribir código. Stack, estructura y experiencia se diseñan juntos para que el proyecto arranque con dirección clara y espacio para crecer.'
    },
    {
      number: '03',
      icon: 'build',
      title: 'Construcción',
      description: 'Avanzamos en ciclos cortos con entregas revisables. Cada iteración se valida antes de continuar: así los desvíos se detectan cuando son baratos de corregir, no al final.'
    },
    {
      number: '04',
      icon: 'support',
      title: 'Acompañamiento',
      description: 'No desaparecemos en el deploy. Monitoreamos, ajustamos y evolucionamos el producto junto con tu negocio para que lo entregado siga siendo útil a medida que crecés.'
    }
  ];
}
