import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminAuthService } from './auth.service';
import { environment } from '../../../environments/environment';

import { QuoteRecord } from '../../../../../shared/interfaces/quote.interface';
import { QuoteStatus } from '../../../../../shared/enums';

export type { QuoteRecord };
export { QuoteStatus };

export interface QuoteStats {
  total: number;
  nuevo: number;
  visto: number;
  respondido: number;
  cerrado: number;
}


@Injectable({ providedIn: 'root' })
export class AdminQuotesService {
  constructor(private http: HttpClient, private auth: AdminAuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken() ?? ''}` });
  }

  getStats(): Observable<{ data: QuoteStats }> {
    return this.http.get<{ data: QuoteStats }>(`${environment.apiUrl}/api/admin/stats`, { headers: this.headers() });
  }

  getQuotes(filters?: { status?: QuoteStatus; from?: string; to?: string }): Observable<{ data: QuoteRecord[] }> {
    const params: Record<string, string> = {};

    if (filters?.status) params['status'] = filters.status;
    if (filters?.from) params['from'] = filters.from;
    if (filters?.to) params['to'] = filters.to;

    return this.http.get<{ data: QuoteRecord[] }>(`${environment.apiUrl}/api/admin/quotes`, {
      headers: this.headers(),
      params
    });
  }

  getQuote(id: string): Observable<{ data: QuoteRecord }> {
    return this.http.get<{ data: QuoteRecord }>(`${environment.apiUrl}/api/admin/quotes/${id}`, { headers: this.headers() });
  }

  markViewed(id: string): Observable<{ data: QuoteRecord }> {
    return this.updateStatus(id, QuoteStatus.VISTO);
  }

  updateStatus(id: string, status: QuoteStatus): Observable<{ data: QuoteRecord }> {
    return this.http.patch<{ data: QuoteRecord }>(`${environment.apiUrl}/api/admin/quotes/${id}/status`, { status }, { headers: this.headers() });
  }
}
