import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Cliente {
  title: string;
  sector: string;
  status: string;
  description: string;
  accent: 'lab' | 'wellness';
  image: string;
  tags: string[];
}

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent {
  clientes: Cliente[] = [
    {
      title: 'Laboratorio AsisTec',
      sector: 'Digitalizaci\u00f3n - Laboratorio',
      status: 'Cliente activo',
      description: 'Digitalizaci\u00f3n de procesos internos para registro de muestras en laboratorios, trazabilidad operativa y orden del flujo de trabajo.',
      accent: 'lab',
      image: 'assets/images/cliente-asistec.jpeg',
      tags: ['Registro de muestras', 'Procesos internos', 'Laboratorio']
    },
    {
      title: 'Chronos 360',
      sector: 'Sitio web - Servicios integrales',
      status: 'Cliente activo',
      description: 'Presencia digital para servicios de psicolog\u00eda, coaching y preparaci\u00f3n f\u00edsica, con foco en claridad, reserva y confianza.',
      accent: 'wellness',
      image: 'assets/images/cliente-chronos.jpeg',
      tags: ['Psicolog\u00eda', 'Coaching', 'Preparaci\u00f3n f\u00edsica']
    }
  ];
}
