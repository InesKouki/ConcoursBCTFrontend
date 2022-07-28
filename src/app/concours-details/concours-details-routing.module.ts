import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcoursDetailsComponent } from './concours-details.component';

const routes: Routes = [
  { path: '', component: ConcoursDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcoursDetailsRoutingModule { }
