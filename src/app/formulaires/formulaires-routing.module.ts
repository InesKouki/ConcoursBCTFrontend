import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulairesComponent } from './formulaires.component';

const routes: Routes = [
  { path: '', component: FormulairesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulairesRoutingModule { }
