import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  scrolled = signal(false);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  navLinks = [
    { label: 'Servicios',  fragment: 'servicios' },
    { label: 'Procesos',   fragment: 'procesos' },
    { label: 'Nosotros',   fragment: 'nosotros' },
    { label: 'Contacto',   fragment: 'contacto' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 40);
    }
  }

  scrollTo(fragment: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const currentPath = this.router.url.split('#')[0] || '/';

    if (currentPath === '/') {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    this.router.navigate(['/'], { fragment });
  }
}
