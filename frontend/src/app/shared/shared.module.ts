import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [NavbarComponent, FooterComponent],
  exports: [NavbarComponent, FooterComponent]
})
export class SharedModule { }
