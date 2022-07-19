import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmRegistrationRoutingModule } from './confirm-registration-routing.module';
import { ConfirmRegistrationComponent } from './confirm-registration.component';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ConfirmRegistrationRoutingModule
  ],
  exports: [
    ConfirmRegistrationComponent
  ],
  declarations: [
    ConfirmRegistrationComponent
  ],
  providers: [
  ],
})
export class ConfirmRegistrationModule { }
