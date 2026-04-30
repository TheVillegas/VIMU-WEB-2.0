import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  scrollTo(fragment: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact(): void {
    this.scrollTo('contacto');
  }
}
