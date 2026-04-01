import { Component } from '@angular/core';

@Component({
  selector: 'app-logo-strip',
  standalone: false,
  templateUrl: './logo-strip.component.html',
  styleUrl: './logo-strip.component.scss'
})
export class LogoStripComponent {
  // TODO: replace with real client logos (SVG preferred, monochrome)
  logos = ['VIMU AI', 'DIGITAL SOUL', 'TECH ARCH', 'CLOUD CORE', 'DEV FLOW', 'SILENT CODE', 'BUILD LAB', 'STACK IO'];
}
