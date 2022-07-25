import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card'
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule

  ]
})
export class HomeModule { }