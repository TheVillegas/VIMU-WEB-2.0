import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: false,
  template: `
    <section class="px-8 flex flex-col items-center">
      <div class="max-w-7xl w-full">
        <header class="mb-20">
          <span class="text-vimu-accent text-xs font-bold uppercase tracking-widest mb-4 block">Capacidades</span>
          <h2 class="section-title text-vimu-text-primary leading-tight">
            Consultoría Integral <br/>
            y Desarrollo de Élite.
          </h2>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (service of services; track service.title) {
            <div class="group p-8 rounded-2xl bg-vimu-surface-high border border-vimu-border/30 hover:border-vimu-accent/50 transition-all duration-500 hover:-translate-y-2">
              <div class="mb-6 text-vimu-accent group-hover:scale-110 transition-transform duration-500">
                <!-- Icon Placeholder -->
                <div class="w-12 h-12 rounded-lg bg-vimu-accent/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 20v2"/><path d="M9 2v2"/></svg>
                </div>
              </div>
              <h3 class="text-vimu-text-primary text-xl font-bold mb-4">{{ service.title }}</h3>
              <p class="text-vimu-text-secondary text-sm leading-relaxed mb-6">
                {{ service.description }}
              </p>
              <ul class="space-y-3">
                @for (item of service.items; track item) {
                  <li class="flex items-center gap-2 text-vimu-text-muted text-xs">
                    <div class="w-1 h-1 rounded-full bg-vimu-accent"></div>
                    {{ item }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class Services {
  services = [
    {
      title: 'Consultoría TI',
      description: 'Asesoría estratégica para startups y empresas que buscan escalar su infraestructura tecnológica.',
      items: ['Arquitectura de Sistemas', 'Optimización de Procesos', 'Estrategia Cloud']
    },
    {
      title: 'Software a Medida',
      description: 'Desarrollo de aplicaciones robustas, escalables y orientadas a resultados tangibles.',
      items: ['Apps iOS / Android', 'Plataformas Web', 'Sistemas de Gestión']
    },
    {
      title: 'Presencia Digital',
      description: 'Más que una web, creamos experiencias que reflejan la esencia de tu marca.',
      items: ['Diseño UX/UI Premium', 'Landing Pages de Alta Conversión', 'Servicio Técnico & Hosting']
    }
  ];
}
