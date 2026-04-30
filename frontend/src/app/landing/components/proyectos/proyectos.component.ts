import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Proyecto {
  title: string;
  tags: string[];
  description: string;
}

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent {
  proyectos: Proyecto[] = [
    {
      title: 'Plataforma SaaS de gestión',
      tags: ['Angular', 'Node.js', 'PostgreSQL'],
      description: 'Sistema de administración de clientes con panel multi-usuario y reportes en tiempo real.'
    },
    {
      title: 'Automatización de procesos',
      tags: ['Python', 'n8n', 'APIs'],
      description: 'Integración de CRM con sistemas contables y notificaciones automáticas por WhatsApp.'
    },
    {
      title: 'E-commerce a medida',
      tags: ['Next.js', 'Stripe', 'SSR'],
      description: 'Tienda online con catálogo dinámico, carrito y pasarela de pago integrada.'
    }
  ];
}
