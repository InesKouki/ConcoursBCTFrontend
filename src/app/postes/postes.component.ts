import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PostesService } from '../_services/postes.service';
import { Router } from '@angular/router';
import { UpdatePosteComponent } from './update-poste/update-poste.component';
import { RemovePostesDialogContent } from './remove-postes-dialog-content';

@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.css']
})
export class PostesComponent implements OnInit {
  newForm: FormGroup;

  postesSearch:any[];
  Postes:any[];
  currentConcour = null;
  currentIndex = -1;
  titre = '';
  panelOpenState = false;
  step = 4;
  nbRegx=/^[0-9]+$/;
  displayedColumns: string[] = ['nom', 'description', 'nombrePlace','actions'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDirective1') private formDirective1: NgForm;
  @ViewChild('formDirective2') private formDirective2: NgForm;
  @ViewChild('formDirective3') private formDirective3: NgForm;
  @ViewChild('formDirective4') private formDirective4: NgForm;
  @ViewChild("myDiv") divView: ElementRef;
  constructor(
    private PostesService : PostesService,
    private formBuilder: FormBuilder,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog:MatDialog) { 
      this.dataSource = new MatTableDataSource();

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        
        return  data.nom.toLocaleLowerCase().includes(filter) ||
        data.description.toLocaleLowerCase().includes(filter) ||
        data.nombrePlace.toLocaleLowerCase().includes(filter) ;
     
      }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    ngAfterViewInit() {
      this.divView.nativeElement.scrollIntoView();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      nom: [null, [Validators.required]],
      description: [null, [Validators.required]],
      nombrePlace: [null,[Validators.required,Validators.pattern(this.nbRegx)]],
      
    });
  }
  openSuccessSnackBar(message: string) {
    this._snackBar.open(message, '', {
       duration: 4000,
       horizontalPosition:'center',
       verticalPosition:'bottom',
       panelClass:["snackbar-success-style"]
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  openDialogUpdatePostes(id) {
    const dialogRef=this.dialog.open(UpdatePosteComponent,
      { data:id
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPostes();
      });
}

  submit() {
    if (!this.newForm.valid) {
      return;
    }
    if (this.newForm.valid) {

    this.PostesService.add(this.newForm.value.nom,this.newForm.value.description,this.newForm.value.nombrePlace).subscribe(
    data => {
      this.openSuccessSnackBar('Poste crée avec succès !')
     
      
    });
    this.formDirective1.resetForm();
    this.newForm.reset();
    this.step=4;
  }
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(RemovePostesDialogContent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.supprimerPoste(id);
      }
    });
  }
  getPostes() {
    this.PostesService.getPostesList().subscribe((data: any) => {
      this.postesSearch=data.reverse();
      this.Postes=data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return data;
      });
  }

  supprimerPoste(id: number) {
    this.PostesService.deletePoste(id).subscribe(data => {
    })
  }

  refresh(): void {
    window.location.reload();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}

}


