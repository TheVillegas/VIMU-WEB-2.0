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
      description: 'Entendemos tu negocio, tus objetivos y el problema real antes de proponer cualquier solución tecnológica.'
    },
    {
      number: '02',
      title: 'Arquitectura',
      description: 'Diseñamos la solución técnica con criterio. Elegimos el stack correcto para tu escala, no el de moda.'
    },
    {
      number: '03',
      title: 'Ejecución',
      description: 'Desarrollo iterativo con entregas visibles. Vos seguís el progreso en tiempo real, sin sorpresas.'
    },
    {
      number: '04',
      title: 'Presencia Continua',
      description: 'No desaparecemos al entregar. Somos el socio técnico que permanece mientras tu producto crece.'
    }
  ];
}
