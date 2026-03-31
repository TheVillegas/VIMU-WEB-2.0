import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar.component';
import { By } from '@angular/platform-browser';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Navbar]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar', () => {
    expect(component).toBeTruthy();
  });

  it('should match the initial UI snapshot (Golden File Pattern)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // We strip dynamic angular attributes for a stable snapshot
    const htmlClean = compiled.innerHTML.replace(/_ngcontent-ng-[a-zA-Z0-9-]+"?"/g, '');
    expect(htmlClean).toMatchSnapshot();
  });

  it('should have a link to agendar section', () => {
    const agendarLink = fixture.debugElement.query(By.css('a[href="#agendar"]'));
    expect(agendarLink).toBeTruthy();
    expect(agendarLink.nativeElement.textContent.trim()).toBe('Agendar Llamada');
  });

  it('should contain all required anchor buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('.gap-8 button'));
    const buttonTexts = buttons.map(b => b.nativeElement.textContent.trim());
    
    expect(buttonTexts).toContain('Servicios');
    expect(buttonTexts).toContain('Procesos');
    expect(buttonTexts).toContain('Contacto');
  });
});
