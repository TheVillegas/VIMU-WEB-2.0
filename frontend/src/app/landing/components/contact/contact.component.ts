import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResendService, ContactFormData } from '../../../core/services/resend.service';

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
    private resendService: ResendService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      contacto: ['', [Validators.required, Validators.minLength(5)]],
      project: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submit(): void {
    if (this.form.invalid || this.status === 'loading') return;

    this.status = 'loading';
    const { nombre, contacto, project } = this.form.value;
    const data: ContactFormData = { name: nombre, contact: contacto, project };

    this.resendService.sendContactForm(data).subscribe({
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