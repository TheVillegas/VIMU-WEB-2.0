import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { retry, timeout } from 'rxjs';

import { ProjectType, Timeline, BudgetTier } from '../../../../../../shared/enums';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-agendar-page',
  standalone: false,
  templateUrl: './agendar-page.component.html',
  styleUrl: './agendar-page.component.scss'
})
export class AgendarPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  success = false;
  error = '';

  projectTypes = [
    { value: ProjectType.FULL_STACK, label: 'Aplicación Web' },
    { value: ProjectType.FULL_STACK, label: 'App Móvil (iOS / Android)' },
    { value: ProjectType.CONSULTORIA, label: 'Consultoría' },
    { value: ProjectType.MODERNIZACION, label: 'Modernización / Digitalización' },
    { value: ProjectType.FULL_STACK, label: 'Proyecto completo' },
    { value: ProjectType.OTRO, label: 'Otro' }
  ];

  timelines = [
    { value: Timeline.CORTO, label: 'Corto plazo' },
    { value: Timeline.MEDIO, label: 'Mediano plazo' },
    { value: Timeline.LARGO, label: 'Largo plazo' },
    { value: Timeline.FLEXIBLE, label: 'Flexible / No definido' }
  ];

  budgetTiers = [
    { value: BudgetTier.BAJO, label: '50.000-150.000CLP' },
    { value: BudgetTier.MEDIO, label: '150.000-300.000CLP' },
    { value: BudgetTier.ALTO, label: '300.000-500.000CLP' },
    { value: BudgetTier.EXTREMO, label: '500.000-1.000.000CLP' },
    { value: BudgetTier.A_CONSULTAR, label: 'No estoy seguro' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      empresa: [''],
      project_type: ['', Validators.required],
      timeline: ['', Validators.required],
      budget_tier: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/api/health`).subscribe({ error: () => {} });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.success = false;
    this.error = '';

    if (this.form.invalid || this.loading) return;

    this.loading = true;

    const payload = {
      name: this.form.value.nombre,
      email: this.form.value.email,
      phone: this.form.value.telefono || undefined,
      company: this.form.value.empresa || undefined,
      project_type: this.form.value.project_type,
      timeline: this.form.value.timeline,
      budget_tier: this.form.value.budget_tier,
      description: this.form.value.descripcion
    };

    this.http.post(`${environment.apiUrl}/api/quotes`, payload).pipe(
      timeout({ first: 15000 }),
      retry({ count: 1, delay: 1500 })
    ).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.error = '';
        this.form.reset();
        this.submitted = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'No pudimos enviar tu solicitud. Revisá tu conexión e intentá nuevamente. Si persiste, escríbenos directo a proyectos@vimudevs.com.';
      }
    });
  }
}
