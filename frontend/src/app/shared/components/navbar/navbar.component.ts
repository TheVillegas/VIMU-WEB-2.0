import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
    }
  `]
})
export class Navbar {
  navLinks = [
    { label: 'Servicios', fragment: 'servicios' },
    { label: 'Procesos', fragment: 'procesos' },
    { label: 'Nosotros', fragment: 'nosotros' },
    { label: 'Contacto', fragment: 'contacto' }
  ];

  scrollTo(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
