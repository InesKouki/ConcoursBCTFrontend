import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormulairesRoutingModule } from './formulaires-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormulairesComponent } from './formulaires.component';
import { UpdateFormulaireComponent } from './update-formulaire/update-formulaire';
import { RemoveFormulaireDialogContent } from './remove-formulaire-dialog-content';
import { QuestionsFormulaireDialog } from './questions-formulaire-dialog';

@NgModule({

  imports: [
    CommonModule,
    FormulairesRoutingModule,
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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    UpdateFormulaireComponent,
    FormulairesComponent,
     RemoveFormulaireDialogContent,
     QuestionsFormulaireDialog
  ],
    
  declarations: [ 
    UpdateFormulaireComponent,
    FormulairesComponent,
     RemoveFormulaireDialogContent,
     QuestionsFormulaireDialog
    ]
})
export class FormulairesModule { }
