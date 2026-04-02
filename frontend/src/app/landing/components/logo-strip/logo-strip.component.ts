import { Component } from '@angular/core';

@Component({
  selector: 'app-logo-strip',
  standalone: false,
  templateUrl: './logo-strip.component.html',
  styleUrl: './logo-strip.component.scss'
})
export class LogoStripComponent {
  //En vez de titulos de las tecnologias, poner los logos oficiales
  logos = ['Angular', 'Astro', 'React', 'PostgreSQL', 'Python', 'Node.js', 'TypeScript', 'PostgreSQL'];
}
