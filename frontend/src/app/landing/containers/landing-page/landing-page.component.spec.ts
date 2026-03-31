import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPage } from './landing-page.component';
import { Hero } from '../../components/hero/hero.component';
import { LogoStrip } from '../../components/logo-strip/logo-strip.component';
import { Services } from '../../components/services/services.component';
import { Contact } from '../../components/contact/contact.component';
import { By } from '@angular/platform-browser';

describe('LandingPage', () => {
  let component: LandingPage;
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPage, Hero, LogoStrip, Services, Contact]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the landing page', () => {
    expect(component).toBeTruthy();
  });

  it('should render all sections in the correct order (Spec L1)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const children = Array.from(compiled.children);

    expect(children.length).toBe(4);
    expect(children[0].tagName.toLowerCase()).toBe('app-hero');
    expect(children[1].tagName.toLowerCase()).toBe('app-logo-strip');
    expect(children[2].tagName.toLowerCase()).toBe('app-services');
    expect(children[3].tagName.toLowerCase()).toBe('app-contact');
  });

  it('should have correct anchor IDs for navigation', () => {
    const services = fixture.debugElement.query(By.directive(Services));
    const contact = fixture.debugElement.query(By.directive(Contact));

    expect(services.nativeElement.id).toBe('servicios');
    expect(contact.nativeElement.id).toBe('contacto');
  });
});
