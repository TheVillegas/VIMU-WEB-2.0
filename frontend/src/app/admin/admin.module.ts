import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './containers/admin-login/admin-login.component';
import { AdminDashboardComponent } from './containers/admin-dashboard/admin-dashboard.component';
import { AdminQuoteDetailComponent } from './containers/admin-quote-detail/admin-quote-detail.component';
import { AdminShellComponent } from './containers/admin-shell/admin-shell.component';
import { AdminSettingsComponent } from './containers/admin-settings/admin-settings.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminQuoteDetailComponent,
    AdminShellComponent,
    AdminSettingsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AdminRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AdminModule { }
