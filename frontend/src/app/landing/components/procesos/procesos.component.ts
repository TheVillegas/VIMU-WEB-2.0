import { Component } from '@angular/core';

interface Paso {
  number: string;
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
      title: 'Diagnóstico',
      description: 'Entendemos el negocio, los objetivos y el problema real antes de proponer una solución.'
    },
    {
      number: '02',
      title: 'Arquitectura',
      description: 'Diseñamos la solución técnica con criterio. Elegimos el stack correcto para la escala del proyecto, no el de moda.'
    },
    {
      number: '03',
      title: 'Ejecución',
      description: 'Desarrollo iterativo con entregas visibles. El avance se revisa de forma continua, sin sorpresas.'
    },
    {
      number: '04',
      title: 'Presencia Continua',
      description: 'No desaparecemos al entregar. Acompañamos mientras el producto crece y necesita evolución.'
    }
  ];
}
