import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AgendarPageComponent } from './agendar-page.component';

describe('AgendarPageComponent', () => {
  let fixture: ComponentFixture<AgendarPageComponent>;
  let component: AgendarPageComponent;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [AgendarPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendarPageComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  it('should build a valid payload and post it to /api/quotes', () => {
    component.form.setValue({
      nombre: 'Matías',
      email: 'matias@example.com',
      telefono: '+56912345678',
      empresa: 'VIMU DEVS',
      project_type: 'consultoria',
      timeline: 'corto',
      budget_tier: 'medio',
      descripcion: 'Necesitamos una consultoría para ordenar el proyecto y definir alcance.'
    });

    component.onSubmit();

    const req = httpMock.expectOne('/api/quotes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'Matías',
      email: 'matias@example.com',
      phone: '+56912345678',
      company: 'VIMU DEVS',
      project_type: 'consultoria',
      timeline: 'corto',
      budget_tier: 'medio',
      description: 'Necesitamos una consultoría para ordenar el proyecto y definir alcance.'
    });

    req.flush({ message: 'ok' });
    expect(component.success).toBe(true);
  });
});
