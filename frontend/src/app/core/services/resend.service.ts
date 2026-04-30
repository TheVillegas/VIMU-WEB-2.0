import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  contact: string;
  project: string;
}

export interface ResendEmailResponse {
  id: string;
  from: string;
  to: string[];
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResendService {
  private readonly apiUrl = 'https://api.resend.com/emails';

  constructor(private http: HttpClient) {}

  sendContactForm(data: ContactFormData): Observable<ResendEmailResponse> {
    const payload = {
      from: 'VIMU DEVS <onboarding@resend.dev>',
      to: ['mvillalonga@vimudevs.com'],
      subject: `Nuevo contacto desde web: ${data.name}`,
      html: `
        <h2>Nuevo mensaje desde vimudevs.com</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Contacto:</strong> ${data.contact}</p>
        <p><strong>Proyecto:</strong></p>
        <p>${data.project}</p>
      `
    };

    return this.http.post<ResendEmailResponse>(this.apiUrl, payload);
  }
}