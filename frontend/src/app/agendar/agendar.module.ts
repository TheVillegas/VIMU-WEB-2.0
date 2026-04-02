import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AgendarPageComponent } from './containers/agendar-page/agendar-page.component';

const routes: Routes = [
  { path: '', component: AgendarPageComponent }
];

@NgModule({
  declarations: [AgendarPageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AgendarModule { }
