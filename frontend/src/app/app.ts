import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing/containers/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LandingPageComponent],
  template: '<app-landing-page></app-landing-page>',
  styleUrl: './app.scss'
})
export class AppComponent {}