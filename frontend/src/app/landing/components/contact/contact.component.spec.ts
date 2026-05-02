import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ContactComponent } from './contact.component';
import { ResendService } from '../../../core/services/resend.service';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let mockResendService: { sendContactForm: ReturnType<typeof vi.fn> };

  const validForm = {
    nombre: 'Juan Pérez',
    contacto: 'juan@example.com',
    project: 'Quiero construir una app de ecommerce para mi negocio'
  };

  beforeEach(async () => {
    mockResendService = { sendContactForm: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [{ provide: ResendService, useValue: mockResendService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ── Creación ──────────────────────────────────────────────────────────────

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with idle status', () => {
    expect(component.status).toBe('idle');
  });

  // ── Validaciones del formulario ───────────────────────────────────────────

  it('form should be invalid when empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('nombre should require at least 2 characters', () => {
    const ctrl = component.form.controls['nombre'];
    ctrl.setValue('A');
    ctrl.markAsTouched();
    expect(ctrl.invalid).toBe(true);
    expect(ctrl.errors?.['minlength']).toBeTruthy();
  });

  it('nombre should be valid with 2+ characters', () => {
    component.form.controls['nombre'].setValue('Ana');
    expect(component.form.controls['nombre'].valid).toBe(true);
  });

  it('contacto should reject non-email values', () => {
    const ctrl = component.form.controls['contacto'];
    ctrl.setValue('no-es-un-email');
    ctrl.markAsTouched();
    expect(ctrl.invalid).toBe(true);
    expect(ctrl.errors?.['email']).toBeTruthy();
  });

  it('contacto should accept a valid email', () => {
    component.form.controls['contacto'].setValue('hola@vimudevs.com');
    expect(component.form.controls['contacto'].valid).toBe(true);
  });

  it('contacto should reject empty string', () => {
    const ctrl = component.form.controls['contacto'];
    ctrl.setValue('');
    ctrl.markAsTouched();
    expect(ctrl.invalid).toBe(true);
    expect(ctrl.errors?.['required']).toBeTruthy();
  });

  it('project should require at least 10 characters', () => {
    const ctrl = component.form.controls['project'];
    ctrl.setValue('Corto');
    ctrl.markAsTouched();
    expect(ctrl.invalid).toBe(true);
    expect(ctrl.errors?.['minlength']).toBeTruthy();
  });

  it('form should be valid with all fields correctly filled', () => {
    component.form.setValue(validForm);
    expect(component.form.valid).toBe(true);
  });

  // ── Lógica de envío ───────────────────────────────────────────────────────

  it('submit() should not call service when form is invalid', () => {
    component.submit();
    expect(mockResendService.sendContactForm).not.toHaveBeenCalled();
    expect(component.status).toBe('idle');
  });

  it('submit() should not call service when already loading', () => {
    component.form.setValue(validForm);
    component.status = 'loading';
    component.submit();
    expect(mockResendService.sendContactForm).not.toHaveBeenCalled();
  });

  it('submit() should call service with correctly mapped form data', () => {
    component.form.setValue(validForm);
    mockResendService.sendContactForm.mockReturnValue(of({ success: true }));

    component.submit();

    expect(mockResendService.sendContactForm).toHaveBeenCalledWith({
      name: validForm.nombre,
      contact: validForm.contacto,
      project: validForm.project
    });
  });

  it('submit() should set status to success and reset form on success', () => {
    component.form.setValue(validForm);
    mockResendService.sendContactForm.mockReturnValue(of({ success: true }));

    component.submit();

    expect(component.status).toBe('success');
    expect(component.form.value.nombre).toBeNull();
    expect(component.form.value.contacto).toBeNull();
    expect(component.form.value.project).toBeNull();
  });

  it('submit() should set status to error on HTTP failure', () => {
    component.form.setValue(validForm);
    mockResendService.sendContactForm.mockReturnValue(
      throwError(() => ({ status: 500, message: 'Internal Server Error' }))
    );

    component.submit();

    expect(component.status).toBe('error');
  });

  it('submit() should set status to error on network failure', () => {
    component.form.setValue(validForm);
    mockResendService.sendContactForm.mockReturnValue(
      throwError(() => ({ status: 0, message: 'Network error' }))
    );

    component.submit();

    expect(component.status).toBe('error');
  });

  it('submit() should set status to error on rate limit (429)', () => {
    component.form.setValue(validForm);
    mockResendService.sendContactForm.mockReturnValue(
      throwError(() => ({ status: 429, message: 'Too Many Requests' }))
    );

    component.submit();

    expect(component.status).toBe('error');
  });
});
