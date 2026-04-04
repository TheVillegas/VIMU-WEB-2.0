import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LegalPageComponent } from './pages/legal-page/legal-page.component';

const routes: Routes = [
  { path: '', component: LegalPageComponent }
];

@NgModule({
  declarations: [LegalPageComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class LegalModule { }
