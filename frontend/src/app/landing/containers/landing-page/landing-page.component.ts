import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  template: `
    <app-hero></app-hero>
    <app-logo-strip></app-logo-strip>
    <app-services id="servicios"></app-services>
    <app-contact id="contacto"></app-contact>
  `
})
export class LandingPage { }
