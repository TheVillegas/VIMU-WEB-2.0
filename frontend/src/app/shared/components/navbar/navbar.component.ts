import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  scrolled = signal(false);

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
    document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  }
}
