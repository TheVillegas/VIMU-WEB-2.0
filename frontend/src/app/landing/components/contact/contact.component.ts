import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  template: `
    <section class="bg-vimu-surface py-32 px-8">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-20">
        <div class="max-w-3xl">
          <span class="text-vimu-accent text-xs font-bold uppercase tracking-widest mb-4 block">Hablemos</span>
          <h2 class="hero-text text-vimu-text-primary mb-8 lowercase leading-[0.9]">
            ¿listo para dar el <br/>
            <span class="text-vimu-accent">próximo salto?</span>
          </h2>
          <p class="text-vimu-text-secondary text-body-lg max-w-xl">
            Tu visión merece una ejecución impecable. Estamos aquí para asesorarte en cada paso del camino.
          </p>
        </div>

        <div class="flex flex-col gap-6 w-full md:w-auto">
          <a href="mailto:hola@vimu.dev" class="group flex items-center justify-between p-6 bg-vimu-bg border border-vimu-border rounded-2xl hover:border-vimu-accent transition-all">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-vimu-accent/10 flex items-center justify-center text-vimu-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <span class="block text-xs uppercase tracking-widest text-vimu-text-muted">Email</span>
                <span class="text-vimu-text-primary font-bold">hola@vimu.dev</span>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-vimu-accent opacity-0 group-hover:opacity-100 transition-opacity"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>

          <a href="https://wa.me/vimu" class="group flex items-center justify-between p-6 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl hover:border-[#25D366] transition-all">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              </div>
              <div>
                <span class="block text-xs uppercase tracking-widest text-[#25D366]/70">WhatsApp</span>
                <span class="text-vimu-text-primary font-bold">Business Hotline</span>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  `
})
export class Contact {}
