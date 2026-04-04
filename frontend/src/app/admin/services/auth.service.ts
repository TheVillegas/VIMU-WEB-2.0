import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    admin: { id: string; email: string };
  };
}

const TOKEN_KEY = 'vimu_admin_token';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<void> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, { email, password }).pipe(
      tap(response => localStorage.setItem(TOKEN_KEY, response.data.token)),
      map(() => void 0)
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
