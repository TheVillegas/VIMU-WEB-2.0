import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Paso {
  number: string;
  badge: string;
  title: string;
  description: string;
  hint: string;
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
      badge: 'T\u00fa participas',
      title: 'Diagn\u00f3stico',
      description: 'Aterrizamos el problema real, objetivos, restricciones y prioridades. Sin esta base, cualquier c\u00f3digo es humo caro.',
      hint: 'Reuni\u00f3n inicial - sin costo'
    },
    {
      number: '02',
      badge: 'T\u00fa validas',
      title: 'Dise\u00f1o',
      description: 'Definimos flujo, pantallas, arquitectura y alcance antes de construir. Se valida lo importante cuando todav\u00eda es barato cambiarlo.',
      hint: 'Prototipo + feedback'
    },
    {
      number: '03',
      badge: 'T\u00fa apruebas',
      title: 'Construcci\u00f3n',
      description: 'Avanzamos por hitos cortos, con entregas visibles y decisiones t\u00e9cnicas explicadas en lenguaje claro.',
      hint: 'Entregas frecuentes'
    },
    {
      number: '04',
      badge: 'Seguimos contigo',
      title: 'Acompa\u00f1amiento',
      description: 'Publicamos, monitoreamos y ajustamos. Un sistema no termina cuando se sube: empieza cuando tu equipo lo usa.',
      hint: 'Soporte post-lanzamiento'
    }
  ];
}
