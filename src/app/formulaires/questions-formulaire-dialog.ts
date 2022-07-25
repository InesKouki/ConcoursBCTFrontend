import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormulairesService } from '../_services/formulaires.service';

@Component({
    selector: 'questions-formulaire-dialog',
    templateUrl: 'questions-formulaire-dialog.html',
  })
  export class QuestionsFormulaireDialog{
  questions:any[];
  
    constructor(public dialogRef: MatDialogRef<QuestionsFormulaireDialog>,
      @Inject(MAT_DIALOG_DATA) public id:number,
      private FormulairesService: FormulairesService,) {
        this.getQuestions(this.id);
  
      }
    getQuestions(id) {
      this.FormulairesService.getQuestions(id).subscribe(data=>{
        this.questions=data;
      })
    }
  
    removeFromFormulaire(formulaireId:number,questionId:number) {
      this.FormulairesService.SupprimerQuestions(formulaireId,questionId).subscribe(data => {
        this.dialogRef.close();
        })
    }
  
  }