import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { commonLayoutRoutes } from './common-layout-routing.module';
import { CommonLayoutComponent } from './common-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(commonLayoutRoutes),
  ],
  exports: [
    CommonLayoutComponent
  ],
  declarations: [
    CommonLayoutComponent
  ],
  providers: [
  ],
})
export class CommonLayoutModule { }