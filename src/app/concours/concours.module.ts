import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConcoursRoutingModule } from './concours-routing.module';
import { ConcoursService } from '../_services/concours.service';
import { UserService } from '../_services/user.service';
import {RemoveConcoursDialogContent} from './remove-concours-dialog-content';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ConcoursComponent } from './concours.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
// import { ProjetsDialogContent } from './projets-dialog-content';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
//import { EquipeProjetDialog } from './equipe-projet-dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({

  imports:[
    CommonModule,
    ConcoursRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    MatProgressBarModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],

  exports: [
    ConcoursComponent,
    RemoveConcoursDialogContent,
  ],
    
  declarations: [ ConcoursComponent,
    RemoveConcoursDialogContent,
    ]
})
export class ConcoursModule { }
