import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormulairesService } from "../../_services/formulaires.service";
import { PostesService } from "src/app/_services/postes.service";

@Component({
    selector: 'update-formulaire',
    templateUrl: 'update-formulaire.html',
    styleUrls: ['./update-formulaire.css'],
  })
  export class UpdateFormulaireComponent implements OnInit {
  updateFormulaireForm: FormGroup;
  postes:any[];
  


    constructor(
      public dialogRef: MatDialogRef<UpdateFormulaireComponent>,
      @Inject(MAT_DIALOG_DATA) public id: string,
      private FormulairesService: FormulairesService,
      private PostesService: PostesService,
      private _snackBar: MatSnackBar,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.updateFormulaireForm = this.formBuilder.group({
        titre: [null, Validators.required],
        selectPoste: [null,Validators.required],

        
      });

      this.getPostes();
    }

  getPostes() {
    this.PostesService.getPostesList().subscribe(data => {
      this.postes = data;
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
      if (!this.updateFormulaireForm.valid) {
        return;
      }
      this.FormulairesService.update(this.id,this.updateFormulaireForm.value.titre,this.updateFormulaireForm.value.selectPoste).subscribe(
        data => {
          this.openSuccessSnackBar('Formulaire mis à jour avec succès !')     
          this.dialogRef.close();
     
        });
    }
  
}