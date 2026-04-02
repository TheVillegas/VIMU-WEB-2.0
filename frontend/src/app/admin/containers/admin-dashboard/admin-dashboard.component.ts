import { Component, OnInit } from '@angular/core';
import { AdminQuotesService, QuoteRecord, QuoteStats, QuoteStatus } from '../../services/admin-quotes.service';

type DashboardTab = QuoteStatus | 'all';

const DASHBOARD_TABS: Array<{ label: string; value: DashboardTab }> = [
  { label: 'Todas', value: 'all' },
  { label: 'Nuevas', value: QuoteStatus.NUEVO },
  { label: 'Vistas', value: QuoteStatus.VISTO },
  { label: 'Respondidas', value: QuoteStatus.RESPONDIDO },
  { label: 'Cerradas', value: QuoteStatus.CERRADO }
];

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  stats: QuoteStats | null = null;
  quotes: QuoteRecord[] = [];
  activeTab: DashboardTab = 'all';
  page = 1;
  pageSize = 10;
  loading = false;
  readonly tabs = DASHBOARD_TABS;

  constructor(private quotesService: AdminQuotesService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.quotesService.getStats().subscribe(res => this.stats = res.data);
    this.quotesService.getQuotes().subscribe({
      next: res => {
        this.quotes = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  setStatus(id: string, status: QuoteStatus) {
    this.quotesService.updateStatus(id, status).subscribe(() => this.load());
  }

  setTab(tab: DashboardTab) {
    this.activeTab = tab;
    this.page = 1;
  }

  filteredQuotes(): QuoteRecord[] {
    const filtered = this.activeTab === 'all' ? this.quotes : this.quotes.filter(quote => quote.status === this.activeTab);
    const start = (this.page - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  totalFiltered(): number {
    return this.activeTab === 'all' ? this.quotes.length : this.quotes.filter(quote => quote.status === this.activeTab).length;
  }

  totalPages(): number {
    return Math.max(1, Math.ceil(this.totalFiltered() / this.pageSize));
  }

  goToPage(page: number) {
    this.page = Math.min(Math.max(1, page), this.totalPages());
  }

  getInitials(name: string) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join('');
  }

  trackByQuoteId(_: number, quote: QuoteRecord) {
    return quote.id;
  }
}
