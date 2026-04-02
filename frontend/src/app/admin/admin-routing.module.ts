import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLoginComponent } from './containers/admin-login/admin-login.component';
import { AdminDashboardComponent } from './containers/admin-dashboard/admin-dashboard.component';
import { AdminQuoteDetailComponent } from './containers/admin-quote-detail/admin-quote-detail.component';
import { AdminShellComponent } from './containers/admin-shell/admin-shell.component';
import { AdminSettingsComponent } from './containers/admin-settings/admin-settings.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: AdminLoginComponent },
  {
    path: '',
    component: AdminShellComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'quotes/:id', component: AdminQuoteDetailComponent },
      { path: 'configuracion', component: AdminSettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
