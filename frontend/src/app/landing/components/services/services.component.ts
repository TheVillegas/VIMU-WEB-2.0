import { Component } from '@angular/core';

interface Service {
  number: string;
  title: string;
  description: string;
  items: string[];
  icon: 'briefcase' | 'layers' | 'refresh' | 'cloud' | 'spark';
}

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services: Service[] = [
    {
      number: '01',
      title: 'Consultoría y Relevamiento',
      description: 'Antes de tocar una línea de código, hacemos un diagnóstico técnico serio para evitar que el cliente pague por funcionalidades innecesarias.',
      items: ['Definición de alcance', 'Validación técnica', 'Plan de ejecución'],
      icon: 'briefcase'
    },
    {
      number: '02',
      title: 'Desarrollo Full-Stack Escalable',
      description: 'Construcción de aplicaciones web y móviles personalizadas con arquitecturas modernas que crecen junto al negocio.',
      items: ['Web apps', 'Mobile-ready', 'Arquitectura moderna'],
      icon: 'layers'
    },
    {
      number: '03',
      title: 'Modernización de Procesos',
      description: 'Transformamos flujos manuales o legados en sistemas digitales eficientes que ordenan y aceleran la operación.',
      items: ['Digitalización', 'Automatización', 'Optimización operativa'],
      icon: 'refresh'
    },
    {
      number: '04',
      title: 'Cloud y Serverless',
      description: 'Diseño de soluciones en la nube optimizadas para costo y escalabilidad, ideales para evitar infraestructura ociosa.',
      items: ['Infraestructura eficiente', 'Escalado flexible', 'Costos controlados'],
      icon: 'cloud'
    },
    {
      number: '05',
      title: 'IA y Agentes',
      description: 'Implementamos flujos potenciados por LLMs para automatizar tareas, mejorar atención o acelerar el procesamiento interno.',
      items: ['Automatización con IA', 'Agentes', 'Procesamiento asistido'],
      icon: 'spark'
    }
  ];
}
