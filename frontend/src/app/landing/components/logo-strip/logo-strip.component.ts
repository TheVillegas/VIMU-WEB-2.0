import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo-strip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-strip.component.html',
  styleUrl: './logo-strip.component.scss'
})
export class LogoStripComponent {
  //En vez de titulos de las tecnologias, poner los logos oficiales
  logos = ['Angular', 'Astro', 'React', 'PostgreSQL', 'Python', 'Node.js', 'TypeScript', 'PostgreSQL'];
}
