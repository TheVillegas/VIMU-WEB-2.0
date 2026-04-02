import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  loading = false;
  error = '';
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AdminAuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    this.error = '';
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    const { email, password } = this.form.getRawValue();

    this.auth.login(email!, password!).subscribe({
      next: () => this.router.navigateByUrl('/admin/dashboard'),
      error: () => {
        this.loading = false;
        this.error = 'Credenciales inválidas';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
