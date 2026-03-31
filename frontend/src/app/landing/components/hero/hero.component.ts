import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: false,
  template: `
    <section class="min-h-screen flex flex-col justify-center px-8 relative overflow-hidden">
      <!-- Ambient Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vimu-accent/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div class="max-w-7xl mx-auto w-full z-10">
        <h1 class="hero-text text-vimu-text-primary mb-8 animate-fade-in">
          Ingeniería de Software. <br/>
          <span class="text-vimu-accent">Presencia Constante.</span>
        </h1>
        
        <p class="text-vimu-text-secondary text-body-lg max-w-2xl mb-12 leading-relaxed">
          Asesoramos tu crecimiento. No solo desarrollamos, nos convertimos en el socio tecnológico que vela por que tu visión se refleje con precisión quirúrgica.
        </p>

        <div class="flex gap-6">
          <a href="#agendar" class="px-8 py-4 bg-vimu-text-primary text-vimu-bg font-bold rounded-lg hover:scale-105 transition-transform">
            Iniciar Proyecto
          </a>
          <a href="#proyectos" class="px-8 py-4 border border-vimu-border text-vimu-text-primary font-bold rounded-lg hover:bg-vimu-surface transition-colors flex items-center gap-2">
            Ver Trabajos
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class Hero {}
