import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Razon {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-porque',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './porque.component.html',
  styleUrl: './porque.component.scss'
})
export class PorqueComponent {
  razones: Razon[] = [
    {
      icon: '01',
      title: 'Te hablamos en claro',
      description: 'Explicamos decisiones t\u00e9cnicas en lenguaje simple. La tecnolog\u00eda tiene que servir al negocio, no intimidarlo.'
    },
    {
      icon: '02',
      title: 'Dise\u00f1amos a medida',
      description: 'No forzamos tu operaci\u00f3n a entrar en una plantilla. Partimos desde c\u00f3mo trabaj\u00e1s hoy y hacia d\u00f3nde quer\u00e9s crecer.'
    },
    {
      icon: '03',
      title: 'Usamos IA con criterio',
      description: 'La IA acelera investigaci\u00f3n, prototipos y desarrollo, pero la direcci\u00f3n t\u00e9cnica la pone una persona responsable.'
    },
    {
      icon: '04',
      title: 'Acompa\u00f1amiento real',
      description: 'Preferimos menos clientes y mejor seguimiento. El foco es construir una relaci\u00f3n t\u00e9cnica que aguante el tiempo.'
    }
  ];
}
