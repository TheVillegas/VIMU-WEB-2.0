import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero.component';
import { By } from '@angular/platform-browser';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Hero]
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the hero section', () => {
    expect(component).toBeTruthy();
  });

  describe('Table-driven UI Testing for CTAs (Spec L1-S1)', () => {
    const ctaTests = [
      {
        name: 'Primary CTA - Iniciar Proyecto',
        selector: 'a[href="#agendar"]',
        expectedText: 'Iniciar Proyecto',
        expectedClassSubstring: 'bg-vimu-text-primary'
      },
      {
        name: 'Secondary CTA - Ver Trabajos',
        selector: 'a[href="#proyectos"]',
        expectedText: 'Ver Trabajos',
        expectedClassSubstring: 'border-vimu-border'
      }
    ];

    ctaTests.forEach(tt => {
      it(`should render correctly: ${tt.name}`, () => {
        const cta = fixture.debugElement.query(By.css(tt.selector));
        expect(cta).toBeTruthy();
        expect(cta.nativeElement.textContent).toContain(tt.expectedText);
        expect(cta.nativeElement.className).toContain(tt.expectedClassSubstring);
      });
    });
  });

  it('should have the correct typography classes for Silent Authority styling', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.className).toContain('hero-text');
    expect(title.nativeElement.className).toContain('animate-fade-in');
  });
});
