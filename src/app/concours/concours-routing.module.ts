import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcoursComponent } from './concours.component';

const routes: Routes = [
  { path: '', component: ConcoursComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcoursRoutingModule { }
