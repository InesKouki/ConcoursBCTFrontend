import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserListComponent } from './user-list.component';
import { MatDialogModule} from '@angular/material/dialog';
import { UserListDialogContent } from './user-list-dialog-content';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    UserListComponent,
    UserListDialogContent
  ],
  exports: [
    UserListComponent,
    UserListDialogContent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    UserListRoutingModule,
    FormsModule,
    MatTooltipModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSelectModule,

  ]
})
export class UserListModule { }