import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ResendService, ContactFormData } from './resend.service';

describe('ResendService', () => {
  let service: ResendService;
  let httpMock: HttpTestingController;

  const testPayload: ContactFormData = {
    name: 'Juan Pérez',
    contact: 'juan@example.com',
    project: 'Proyecto de prueba para el test unitario'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResendService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ResendService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // ── Creación ──────────────────────────────────────────────────────────────

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── Contrato HTTP ─────────────────────────────────────────────────────────

  it('should POST to /api/contact', () => {
    service.sendContactForm(testPayload).subscribe();

    const req = httpMock.expectOne('/api/contact');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should send the complete payload in the request body', () => {
    service.sendContactForm(testPayload).subscribe();

    const req = httpMock.expectOne('/api/contact');
    expect(req.request.body).toEqual(testPayload);
    req.flush({ success: true });
  });

  it('should return the server response', () => {
    let result: { success: boolean } | undefined;
    service.sendContactForm(testPayload).subscribe(res => { result = res; });

    const req = httpMock.expectOne('/api/contact');
    req.flush({ success: true });

    expect(result).toEqual({ success: true });
  });

  it('should propagate a 500 error as an observable error', () => {
    let errorReceived = false;
    service.sendContactForm(testPayload).subscribe({
      error: () => { errorReceived = true; }
    });

    const req = httpMock.expectOne('/api/contact');
    req.flush({ success: false, error: 'Internal server error' }, { status: 500, statusText: 'Internal Server Error' });

    expect(errorReceived).toBe(true);
  });

  it('should propagate a network error as an observable error', () => {
    let errorReceived = false;
    service.sendContactForm(testPayload).subscribe({
      error: () => { errorReceived = true; }
    });

    const req = httpMock.expectOne('/api/contact');
    req.error(new ProgressEvent('error'));

    expect(errorReceived).toBe(true);
  });

  it('should propagate a 429 rate-limit error', () => {
    let capturedStatus: number | undefined;
    service.sendContactForm(testPayload).subscribe({
      error: (err) => { capturedStatus = err.status; }
    });

    const req = httpMock.expectOne('/api/contact');
    req.flush(
      { success: false, error: 'Demasiados intentos.' },
      { status: 429, statusText: 'Too Many Requests' }
    );

    expect(capturedStatus).toBe(429);
  });
});
