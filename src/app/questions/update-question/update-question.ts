import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { QuestionsService } from "../../_services/questions.service";


@Component({
    selector: 'update-question',
    templateUrl: 'update-question.html',
    styleUrls: ['./update-question.css'],
  })
  export class UpdateQuestionComponent implements OnInit {
    updateQuestionForm: FormGroup;
  
    constructor(
      public dialogRef: MatDialogRef<UpdateQuestionComponent>,
      @Inject(MAT_DIALOG_DATA) public id: string,
      private QuestionsService: QuestionsService,
      private _snackBar: MatSnackBar,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.updateQuestionForm = this.formBuilder.group({
        libelle: [null, Validators.required],
        
      });
    }
  
    openSuccessSnackBar(message: string) {
      this._snackBar.open(message, 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success-style'],
      });
    }
  
    submit() {
      if (!this.updateQuestionForm.valid) {
        return;
      }
      this.QuestionsService.update(this.id,this.updateQuestionForm.value.libelle).subscribe(
        data => {
          this.openSuccessSnackBar('Question mise à jour avec succès !')     
          this.dialogRef.close();
     
        });
    }
  
}