import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Paso {
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-procesos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './procesos.component.html',
  styleUrl: './procesos.component.scss'
})
export class ProcesosComponent {
  pasos: Paso[] = [
    {
      number: '01',
      title: 'Diagnóstico',
      description: 'Entendemos el problema real, los objetivos y las restricciones. Así evitamos construir algo que no resuelve nada.'
    },
    {
      number: '02',
      title: 'Diseño',
      description: 'Definimos arquitectura, flujo y stack antes de escribir código. El proyecto arranca con dirección clara.'
    },
    {
      number: '03',
      title: 'Desarrollo',
      description: 'Avanzamos en ciclos cortos con entregas revisables. Los desvíos se detectan cuando son baratos de corregir.'
    },
    {
      number: '04',
      title: 'Entrega',
      description: 'Publicamos, monitoreamos y acompañamos. El proyecto sigue siendo útil a medida que tu negocio crece.'
    }
  ];
}