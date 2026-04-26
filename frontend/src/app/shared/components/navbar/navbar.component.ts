import { Component, HostListener, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  scrolled = signal(false);

  constructor(private router: Router) {}

  navLinks = [
    { label: 'Servicios',  fragment: 'servicios' },
    { label: 'Procesos',   fragment: 'procesos' },
    { label: 'Nosotros',   fragment: 'nosotros' },
    { label: 'Contacto',   fragment: 'contacto' }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
  }

  scrollTo(fragment: string) {
    const currentPath = this.router.url.split('#')[0] || '/';

    if (currentPath === '/') {
      document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    this.router.navigate(['/'], { fragment });
  }
}
