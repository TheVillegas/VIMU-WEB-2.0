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
  logos = ['Angular', 'TypeScript', 'Node.js', 'PostgreSQL', 'APIs', 'Automatizaci\u00f3n', 'IA Generativa', 'Deploy'];
}
