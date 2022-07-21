import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConcoursService } from '../_services/concours.service';

@Component({
    selector: 'poste-concours-dialog',
    templateUrl: 'poste-concours-dialog.html',
  })
  export class PosteConcoursDialog{
  postes:any[];
  
    constructor(public dialogRef: MatDialogRef<PosteConcoursDialog>,
      @Inject(MAT_DIALOG_DATA) public id:number,
      private concoursService: ConcoursService,) {
        this.getPoste(this.id);
  
      }
    getPoste(id) {
      this.concoursService.getPoste(id).subscribe(data=>{
        this.postes=data;
      })
    }
  
    removeFromConcours(concoursId:number,posteId:number) {
      this.concoursService.unassign(concoursId,posteId).subscribe(data => {
        this.dialogRef.close();
        })
    }
  
  }