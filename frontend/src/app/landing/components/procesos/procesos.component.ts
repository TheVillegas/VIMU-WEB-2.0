import { Component, Inject, PLATFORM_ID, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

interface Paso {
  number: string;
  icon: 'search' | 'design' | 'build' | 'support';
  title: string;
  description: string;
}

@Component({
  selector: 'app-procesos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './procesos.component.html',
  styleUrl: './procesos.component.scss'
})
export class ProcesosComponent implements AfterViewInit, OnDestroy {
  private gsapCtx: any;

  pasos: Paso[] = [
    {
      number: '01',
      icon: 'search',
      title: 'Diagnóstico',
      description: 'Antes de proponer cualquier solución, entendemos el problema real. Relevamos objetivos, restricciones técnicas y dolores operativos para que lo que se construya tenga sentido desde el inicio.'
    },
    {
      number: '02',
      icon: 'design',
      title: 'Diseño',
      description: 'Definimos arquitectura y flujo de usuario antes de escribir código. Stack, estructura y experiencia se diseñan juntos para que el proyecto arranque con dirección clara y espacio para crecer.'
    },
    {
      number: '03',
      icon: 'build',
      title: 'Construcción',
      description: 'Avanzamos en ciclos cortos con entregas revisables. Cada iteración se valida antes de continuar: así los desvíos se detectan cuando son baratos de corregir, no al final.'
    },
    {
      number: '04',
      icon: 'support',
      title: 'Acompañamiento',
      description: 'No desaparecemos en el deploy. Monitoreamos, ajustamos y evolucionamos el producto junto con tu negocio para que lo entregado siga siendo útil a medida que crecés.'
    }
  ];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    // Only animate on desktop (>= 901px)
    if (window.matchMedia('(max-width: 900px)').matches) return;

    const gsap = (await import('gsap')).gsap;
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const host = this.el.nativeElement as HTMLElement;
    const grid = host.querySelector('.procesos__grid') as HTMLElement;
    const cards = host.querySelectorAll('.procesos__card');
    const line = host.querySelector('.procesos__progress-line') as HTMLElement;

    if (!grid || !cards.length) return;

    this.gsapCtx = gsap.context(() => {
      // Progress line animation
      if (line) {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: grid,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: true,
            }
          }
        );
      }

      // Cards staggered entrance
      gsap.from(cards, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true,
        }
      });
    }, host);
  }

  ngOnDestroy(): void {
    if (this.gsapCtx) {
      this.gsapCtx.revert();
    }
  }
}
