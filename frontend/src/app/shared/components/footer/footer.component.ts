import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  template: `
    <footer class="bg-vimu-bg border-t border-vimu-border/20 py-16 px-8">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand Info -->
        <div class="col-span-1 md:col-span-2">
          <h2 class="text-vimu-text-primary text-xl font-black uppercase tracking-tighter mb-4 font-heading">VIMU DEVS</h2>
          <p class="text-vimu-text-secondary text-sm max-w-xs leading-relaxed">
            Ingeniería de Software con presencia constante. No solo construimos, asesoramos tu visión hasta hacerla realidad.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-vimu-text-primary text-xs font-bold uppercase tracking-widest mb-6">Explorar</h3>
          <ul class="space-y-4">
            <li><a href="#" class="text-vimu-text-muted hover:text-vimu-text-primary transition-colors text-sm">Portafolio</a></li>
            <li><a href="#" class="text-vimu-text-muted hover:text-vimu-text-primary transition-colors text-sm">Servicios</a></li>
            <li><a href="#" class="text-vimu-text-muted hover:text-vimu-text-primary transition-colors text-sm">Procesos</a></li>
          </ul>
        </div>

        <!-- Contact/Social -->
        <div>
          <h3 class="text-vimu-text-primary text-xs font-bold uppercase tracking-widest mb-6">Contacto</h3>
          <ul class="space-y-4">
            <li><a href="mailto:hola@vimu.dev" class="text-vimu-text-muted hover:text-vimu-text-primary transition-colors text-sm">hola@vimu.dev</a></li>
            <li><a href="https://wa.me/vimu" class="text-vimu-text-muted hover:text-vimu-text-primary transition-colors text-sm">WhatsApp Business</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-vimu-border/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span class="text-vimu-text-muted text-[10px] uppercase tracking-widest">© 2026 VIMU DEVS SpA. Todos los derechos reservados.</span>
        <div class="flex gap-8">
          <a href="#" class="text-vimu-text-muted hover:text-vimu-text-primary text-[10px] uppercase tracking-widest">Políticas de Privacidad</a>
          <a href="#" class="text-vimu-text-muted hover:text-vimu-text-primary text-[10px] uppercase tracking-widest">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class Footer {}
