import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum ProjectType {
  WEB_APP     = 'web_app',
  MOBILE_APP  = 'mobile_app',
  CONSULTORIA = 'consultoria',
  ECOMMERCE   = 'ecommerce',
  OTRO        = 'otro'
}

export enum Timeline {
  UN_MES      = '1_mes',
  TRES_MESES  = '3_meses',
  SEIS_MESES  = '6_meses',
  MAS_SEIS    = 'mas_6_meses',
  FLEXIBLE    = 'flexible'
}

export enum BudgetTier {
  TIER_1 = 'hasta_500k',        // hasta $500.000 CLP
  TIER_2 = '500k_2m',           // $500k – $2M CLP
  TIER_3 = '2m_5m',             // $2M – $5M CLP
  TIER_4 = 'mas_5m',            // +$5M CLP
  TIER_CONSULTAR = 'a_consultar'
}

@Component({
  selector: 'app-agendar-page',
  standalone: false,
  templateUrl: './agendar-page.component.html',
  styleUrl: './agendar-page.component.scss'
})
export class AgendarPageComponent {
  form: FormGroup;
  submitted = false;

  projectTypes = [
    { value: ProjectType.WEB_APP,     label: 'Aplicación Web' },
    { value: ProjectType.MOBILE_APP,  label: 'App Móvil (iOS / Android)' },
    { value: ProjectType.CONSULTORIA, label: 'Consultoría TI' },
    { value: ProjectType.ECOMMERCE,   label: 'E-commerce' },
    { value: ProjectType.OTRO,        label: 'Otro' }
  ];

  timelines = [
    { value: Timeline.UN_MES,     label: 'Lo antes posible (< 1 mes)' },
    { value: Timeline.TRES_MESES, label: '1 – 3 meses' },
    { value: Timeline.SEIS_MESES, label: '3 – 6 meses' },
    { value: Timeline.MAS_SEIS,   label: 'Más de 6 meses' },
    { value: Timeline.FLEXIBLE,   label: 'Flexible / No definido' }
  ];

  budgetTiers = [
    { value: BudgetTier.TIER_1,       label: 'Hasta $500.000 CLP' },
    { value: BudgetTier.TIER_2,       label: '$500.000 – $2.000.000 CLP' },
    { value: BudgetTier.TIER_3,       label: '$2.000.000 – $5.000.000 CLP' },
    { value: BudgetTier.TIER_4,       label: '+$5.000.000 CLP' },
    { value: BudgetTier.TIER_CONSULTAR, label: 'A consultar' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre:       ['', [Validators.required, Validators.minLength(2)]],
      email:        ['', [Validators.required, Validators.email]],
      telefono:     [''],
      empresa:      [''],
      project_type: ['', Validators.required],
      timeline:     ['', Validators.required],
      budget_tier:  ['', Validators.required],
      descripcion:  ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    // TODO: Phase 3 — connect to POST /api/quotes
    console.log('Quote payload:', this.form.value);
  }
}
