import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, catchError, of } from 'rxjs';
import { AdminQuotesService, QuoteRecord, QuoteStatus } from '../../services/admin-quotes.service';

const PROJECT_TYPE_LABELS: Record<string, string> = {
  consultoria: 'Consultoría',
  full_stack: 'Desarrollo Full Stack',
  modernizacion: 'Modernización',
  cloud_serverless: 'Cloud / Serverless',
  ia_agentes: 'IA / Agentes',
  otro: 'Otro'
};

const TIMELINE_LABELS: Record<string, string> = {
  urgente: 'Urgente',
  corto: 'Corto plazo',
  medio: 'Mediano plazo',
  largo: 'Largo plazo',
  flexible: 'Flexible'
};

const BUDGET_TIER_LABELS: Record<string, string> = {
  bajo: 'Bajo',
  medio: 'Medio',
  alto: 'Alto',
  a_consultar: 'A consultar'
};

const PRIORITY_LABELS: Record<string, string> = {
  Low: 'Baja',
  Normal: 'Normal',
  Urgent: 'Urgente'
};

const STATUS_LABELS: Record<string, string> = {
  nuevo: 'Nuevo',
  visto: 'Visto',
  respondido: 'Respondido',
  cerrado: 'Cerrado'
};

@Component({
  selector: 'app-admin-quote-detail',
  standalone: false,
  templateUrl: './admin-quote-detail.component.html',
  styleUrl: './admin-quote-detail.component.scss'
})
export class AdminQuoteDetailComponent implements OnInit, OnDestroy {
  quote: QuoteRecord | null = null;
  loading = true;
  error = '';

  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private quotesService: AdminQuotesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sub = this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          if (!id) throw new Error('No quote ID');

          this.loading = true;
          this.quote = null;
          this.error = '';
          return this.quotesService.getQuote(id).pipe(
            catchError((err) => {
              console.error('Error fetching quote details:', err);
              this.error = 'No se pudo cargar la solicitud';
              return of(null);
            })
          );
        })
      )
      .subscribe({
        next: res => {
          this.loading = false;
          
          if (!res || !res.data) {
             this.cdr.detectChanges();
             return;
          }

          this.quote = res.data;
          this.cdr.detectChanges();

          if (res.data.status === ('nuevo' as any) || res.data.status === QuoteStatus.NUEVO) {
            this.quotesService.markViewed(res.data.id).subscribe({
              next: updated => {
                this.quote = updated.data;
                this.cdr.detectChanges();
              },
              error: () => void 0
            });
          }
        },
        error: (err) => {
          console.error('Unhandled error in quote details stream:', err);
          this.error = 'Error inesperado al cargar la solicitud';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  setStatus(rawStatus: string) {
    if (!this.quote) return;
    const status = rawStatus as QuoteStatus;
    this.quotesService.updateStatus(this.quote.id, status).subscribe(res => this.quote = res.data);
  }

  /** Map raw enum/DB values to human-readable Spanish labels */
  formatField(key: string, value: any): string {
    if (value === null || value === undefined || value === '') return '—';

    switch (key) {
      case 'project_type': return PROJECT_TYPE_LABELS[value] ?? value;
      case 'timeline': return TIMELINE_LABELS[value] ?? value;
      case 'budget_tier': return BUDGET_TIER_LABELS[value] ?? value;
      case 'priority': return PRIORITY_LABELS[value] ?? value;
      case 'status': return STATUS_LABELS[value] ?? value;
      case 'budget_amount':
        return value ? `$${Number(value).toLocaleString('es-CL')}` : '—';
      default: return String(value);
    }
  }

  /** Extract the description from business_needs (stored as "timeline | description") */
  getDescription(): string {
    if (!this.quote?.business_needs) return '—';
    const parts = this.quote.business_needs.split(' | ');
    return parts.length > 1 ? parts.slice(1).join(' | ') : parts[0];
  }
}
