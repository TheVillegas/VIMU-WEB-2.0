import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

import Lenis from '@studio-freight/lenis';

platformBrowser().bootstrapModule(AppModule)
  .then(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  })
  .catch(err => console.error(err));
