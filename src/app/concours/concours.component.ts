import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PostesService } from '../_services/postes.service';
import { ConcoursService } from '../_services/concours.service';
import { UserService } from '../_services/user.service';
import { PosteConcoursDialog } from './poste-concours-dialog';
import { RemoveConcoursDialogContent } from './remove-concours-dialog-content';
import { UpdateConcoursComponent } from './update-concours/update-concours';

@Component({
  selector: 'app-concours',
  templateUrl: './concours.component.html',
  styleUrls: ['./concours.component.css']
})
export class ConcoursComponent implements OnInit {
  newForm: FormGroup;
  newFormtest: FormGroup;
  assignForm: FormGroup;
  assignToConcoursForm: FormGroup;
  linkForm: FormGroup;
  details:any;
  concours:any[];
  concoursSearch:any[];
  Postes:any[];
  nonPostes:any[];

  currentConcour = null;
  currentIndex = -1;
  titre = '';
  panelOpenState = false;
  step = 4;

  displayedColumns: string[] = ['titre', 'description', 'dateDebut', 'dateFin','actions'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDirective1') private formDirective1: NgForm;
  @ViewChild('formDirective2') private formDirective2: NgForm;
  @ViewChild('formDirective3') private formDirective3: NgForm;
  @ViewChild('formDirective4') private formDirective4: NgForm;
  @ViewChild("myDiv") divView: ElementRef;


  constructor(private ConcoursService: ConcoursService,
    private userService: UserService,
    private PostesService : PostesService,
    private formBuilder: FormBuilder,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog:MatDialog) {
      
      this.dataSource = new MatTableDataSource();

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        
        return  data.titre.toLocaleLowerCase().includes(filter) ||
        data.description.toLocaleLowerCase().includes(filter) ||
        data.dateDebut.toLocaleLowerCase().includes(filter) ||
        data.dateFin.toLocaleLowerCase().includes(filter);
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
      titre: [null, Validators.required],
      description: [null, Validators.required],
      dateDebut: [null,Validators.required],
      dateFin: [null, Validators.required]
    });
    this.newFormtest = this.formBuilder.group({
      titre: [null, Validators.required],
      description: [null, Validators.required],
      dateDebut: [null,Validators.required],
      dateFin: [null, Validators.required]
    });

    this.assignToConcoursForm = this.formBuilder.group({
      selectConcours: [null, Validators.required],
      selectPoste: [null, Validators.required]
    });

    this.getConcours();
    this.getPostes();
  }

  openDialogUpdateConcours(id) {
    const dialogRef=this.dialog.open(UpdateConcoursComponent,
      { data:id
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getConcours();
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

  getPostes() {
    this.PostesService.getPostesList().subscribe(data => {
      this.Postes = data;
    });
    }

    getNonPostes(id) {
      this.ConcoursService.getNonPostes(id).subscribe(data=>{
        this.nonPostes=data;
      })
    }

    get getConcoursInForm() {
      return this.assignToConcoursForm.get('selectConcours').value;
    }
  
    onConcoursChange() {
      this.getNonPostes(this.getConcoursInForm);
    }

    submit() {
      if (!this.newForm.valid) {
        return;
      }
      if (this.newForm.valid) {
  
      this.ConcoursService.add(this.newForm.value.titre,this.newForm.value.dateDebut,this.newForm.value.dateFin,this.newForm.value.description).subscribe(
      data => {
        this.openSuccessSnackBar('Concour crée avec succès !')
        this.getConcours();
        
      });
      this.formDirective1.resetForm();
      this.newForm.reset();
      this.step=4;
    }
    }

    

    submitAssignToConcours() {
      if (!this.assignToConcoursForm.valid) {
        return;
      }
      this.ConcoursService.assign(this.assignToConcoursForm.value.selectConcours,this.assignToConcoursForm.value.selectPoste).subscribe(
      data => {
        this.openSuccessSnackBar('Le poste a été ajouté au concours !')
        this.getPostes();
        this.getConcours();

       
      });
      this.formDirective3.resetForm();
      this.assignToConcoursForm.reset();
      this.step=4;
    }

    openDialog(id) {
      const dialogRef = this.dialog.open(RemoveConcoursDialogContent);
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.supprimerConcour(id);
        }
      });
    }

    openDialogPoste(id) {
      this.dialog.open(PosteConcoursDialog, {
        data:id
      });
  
    }

    hasPostes(concourId:number):boolean {
      for (var c of this.concours) {
        if (c.id==concourId) {
          if (c.postes.length==0) {
            return false
          }
        }
      }
      return true;
    }
  
    openDialogUnassign(id,idp) {
      const dialogRef = this.dialog.open(PosteConcoursDialog);
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.unassign(id,idp);
        }
      });
    }

    getConcours() {
      this.ConcoursService.getConcoursList().subscribe((data: any) => {
        this.concours=data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return data;
        });
    }

    unassign(id: number,idP: number) {
      this.ConcoursService.unassign(id,idP).subscribe(data => {
      this.getConcours();
      //this.getPostes();
      
      })
    }

    getConcoursDetails(id) {
      this.ConcoursService.getConcoursDetails(id).subscribe((data: any) => {
        this.details=data;
        });
    }

    supprimerConcour(id: number) {
      this.ConcoursService.deleteConcours(id).subscribe(data => {
        this.getConcours();
      })
    }
  
    refresh(): void {
      window.location.reload();
    }
  
    scroll(el: HTMLElement) {
      el.scrollIntoView({behavior: 'smooth'});
  }



}
