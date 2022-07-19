import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ProfileComponent } from './profile.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProfileRoutingModule } from './profile-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule,
    ProfileRoutingModule
    
  ],
  exports: [
    ProfileComponent
  ],
  declarations: [
    ProfileComponent
  ],
})
export class ProfileModule { }