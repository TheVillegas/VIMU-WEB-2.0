import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Razon {
  icon: 'check' | 'code' | 'clock' | 'shield';
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
      icon: 'check',
      title: 'Sin humo ni tecnicismos',
      description: 'Te explicamos qué hacemos, por qué lo hacemos así, y qué resultado podés esperar. Sin promesas vacías.'
    },
    {
      icon: 'code',
      title: 'Código que se puede mantener',
      description: 'Escribimos software pensando en el largo plazo. Documentado, testeable y fácil de escalar.'
    },
    {
      icon: 'clock',
      title: 'Compromisos reales',
      description: 'Plazos acordados, alcance claro y comunicación constante. Si algo cambia, te avisamos antes.'
    },
    {
      icon: 'shield',
      title: 'Seguridad desde el diseño',
      description: 'Pensamos en seguridad desde el inicio: autenticación, cifrado y protección de datos incluidos.'
    }
  ];
}
