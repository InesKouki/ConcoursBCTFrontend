import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConcoursService } from "../../_services/concours.service";


@Component({
    selector: 'update-concours',
    templateUrl: 'update-concours.html',
    styleUrls: ['./update-concours.css'],
  })
  export class UpdateConcoursComponent implements OnInit {
    updateConcoursForm: FormGroup;
    details:any;
  
    constructor(
      public dialogRef: MatDialogRef<UpdateConcoursComponent>,
      @Inject(MAT_DIALOG_DATA) public id: string,
      private ConcoursService: ConcoursService,
      private _snackBar: MatSnackBar,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      //this.getConcoursDetails(this.id);
      this.updateConcoursForm = this.formBuilder.group({
        titre: [null, Validators.required],
        description: [null,Validators.required],
        dateDebut: [null, Validators.required],
        dateFin: [null,Validators.required],
      });
    }

    getConcoursDetails(id) {
      this.ConcoursService.getConcoursDetails(id).subscribe((data: any) => {
        this.details=data;
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
      if (!this.updateConcoursForm.valid) {
        return;
      }
      this.ConcoursService.update(this.id,this.updateConcoursForm.value.titre,this.updateConcoursForm.value.dateDebut,this.updateConcoursForm.value.dateFin,this.updateConcoursForm.value.description).subscribe(
        data => {
          this.openSuccessSnackBar('Concours mis à jour avec succès !')     
          this.dialogRef.close();
     
        });
    }
  
}