import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConcoursDetailsRoutingModule } from './concours-details-routing.module';
import {MatStepperModule} from '@angular/material/stepper';
import { ConcoursDetailsComponent } from './concours-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionFormComponent } from './question-form/question-form.component';


@NgModule({
  
  imports: [
    CommonModule,
    ConcoursDetailsRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  exports:[
    ConcoursDetailsComponent

  ],
  declarations: [
    ConcoursDetailsComponent,
    QuestionFormComponent
  ]
})
export class ConcoursDetailsModule { }
