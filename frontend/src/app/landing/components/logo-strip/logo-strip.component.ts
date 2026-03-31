import { Component } from '@angular/core';

@Component({
  selector: 'app-logo-strip',
  standalone: false,
  template: `
    <div class="py-12 border-y border-vimu-border/20 bg-black overflow-hidden relative group">
      <!-- Side Fades -->
      <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div class="flex whitespace-nowrap animate-infinity-scroll hover:[animation-play-state:paused]">
        <!-- First set of logos -->
        <div class="flex items-center gap-20 px-10">
          @for (logo of logos; track $index) {
            <span class="text-vimu-text-muted opacity-40 hover:opacity-100 transition-opacity text-2xl font-bold uppercase tracking-widest font-heading grayscale hover:grayscale-0">
              {{ logo }}
            </span>
          }
        </div>
        <!-- Cloned set for seamless loop -->
        <div class="flex items-center gap-20 px-10">
          @for (logo of logos; track $index) {
            <span class="text-vimu-text-muted opacity-40 hover:opacity-100 transition-opacity text-2xl font-bold uppercase tracking-widest font-heading grayscale hover:grayscale-0">
              {{ logo }}
            </span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class LogoStrip {
  // Placeholders as per memory 141
  logos = ['VIMU AI', 'DIGITAL SOUL', 'TECH ARCH', 'CLOUD CORE', 'DEV FLOW', 'SILENT CODE'];
}
