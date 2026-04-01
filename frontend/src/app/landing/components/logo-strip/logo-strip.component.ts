import { Component } from '@angular/core';

@Component({
  selector: 'app-logo-strip',
  standalone: false,
  templateUrl: './logo-strip.component.html',
  styleUrls: ['./logo-strip.component.scss']
})
export class LogoStrip {
  logos = ['VIMU AI', 'DIGITAL SOUL', 'TECH ARCH', 'CLOUD CORE', 'DEV FLOW', 'SILENT CODE'];
}
