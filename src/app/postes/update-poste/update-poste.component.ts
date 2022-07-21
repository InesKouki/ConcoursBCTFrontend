import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PostesService } from "../../_services/postes.service";

@Component({
  selector: 'app-update-poste',
  templateUrl: './update-poste.component.html',
  styleUrls: ['./update-poste.component.css']
})
export class UpdatePosteComponent implements OnInit {
  updatePostesForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<UpdatePosteComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string,
    private PostesService: PostesService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }
    nbRegx=/^[0-9]+$/;
  ngOnInit(): void {
    this.updatePostesForm = this.formBuilder.group({
      nom: [null, Validators.required],
      description: [null,Validators.required],
      nombrePlace: [null, [Validators.required,Validators.pattern(this.nbRegx)]],
     
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
    if (!this.updatePostesForm.valid) {
      return;
    }
    this.PostesService.update(this.id,this.updatePostesForm.value.nom,this.updatePostesForm.value.description,this.updatePostesForm.value.nombrePlace).subscribe(
      data => {
        this.openSuccessSnackBar('Concours mis à jour avec succès !')     
        this.dialogRef.close();
   
      });
  }
}
