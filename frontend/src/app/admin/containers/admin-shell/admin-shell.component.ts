import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdminAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-shell',
  standalone: false,
  templateUrl: './admin-shell.component.html',
  styleUrl: './admin-shell.component.scss'
})
export class AdminShellComponent {
  readonly navLinks = [
    { label: 'Solicitudes', link: '/admin/dashboard' },
    { label: 'Configuración', link: '/admin/configuracion' }
  ];

  constructor(private adminAuthService: AdminAuthService, private router: Router) {}

  logout() {
    this.adminAuthService.logout();
    void this.router.navigate(['/admin/login']);
  }
}
