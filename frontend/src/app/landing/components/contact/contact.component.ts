import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface CotizacionDto {
  nombre: string;
  contacto: string;
  descripcion: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  form: FormGroup;
  status: Status = 'idle';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      contacto: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit(): void {
    if (this.form.invalid || this.status === 'loading') return;

    this.status = 'loading';
    const payload: CotizacionDto = this.form.value;

    this.http.post('/api/cotizaciones', payload).subscribe({
      next: () => {
        this.status = 'success';
        this.form.reset();
      },
      error: () => {
        this.status = 'error';
      }
    });
  }
}
