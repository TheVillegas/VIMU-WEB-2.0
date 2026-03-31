import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app.component';
import { Navbar } from './shared/components/navbar/navbar.component';
import { Footer } from './shared/components/footer/footer.component';
import { LandingPage } from './landing/containers/landing-page/landing-page.component';
import { Hero } from './landing/components/hero/hero.component';
import { LogoStrip } from './landing/components/logo-strip/logo-strip.component';
import { Services } from './landing/components/services/services.component';
import { Contact } from './landing/components/contact/contact.component';

@NgModule({
  declarations: [App, Navbar, Footer, LandingPage, Hero, LogoStrip, Services, Contact],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
