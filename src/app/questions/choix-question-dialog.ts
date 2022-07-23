import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionsService } from '../_services/questions.service';

@Component({
    selector: 'choix-question-dialog',
    templateUrl: 'choix-question-dialog.html',
  })
  export class ChoixQuestionDialog{
  choix:any[];
  
    constructor(public dialogRef: MatDialogRef<ChoixQuestionDialog>,
      @Inject(MAT_DIALOG_DATA) public id:number,
      private questionsService: QuestionsService,) {
       this.getChoix(this.id);
  
      }
    getChoix(id) {
      this.questionsService.getChoix(id).subscribe(data=>{
        this.choix=data;
      })
    }
  
    removeFromQuestion(questionId:number,choixId:number) {
      this.questionsService.unassign(questionId,choixId).subscribe(data => {
        this.dialogRef.close();
        })
    }
  
  }