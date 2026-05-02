import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  contact: string;
  project: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResendService {
  private readonly apiUrl = '/api/contact';

  constructor(private http: HttpClient) {}

  sendContactForm(data: ContactFormData): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(this.apiUrl, data);
  }
}