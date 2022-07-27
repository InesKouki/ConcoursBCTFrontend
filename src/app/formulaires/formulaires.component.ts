import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { QuestionsService } from '../_services/questions.service';
import { PostesService } from '../_services/postes.service';
import { FormulairesService } from '../_services/formulaires.service';
import { UpdateFormulaireComponent } from './update-formulaire/update-formulaire';
import { RemoveFormulaireDialogContent } from './remove-formulaire-dialog-content';
import { QuestionsFormulaireDialog } from './questions-formulaire-dialog';
@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.css']
})
export class FormulairesComponent implements OnInit {

  newForm: FormGroup;
  assignForm: FormGroup;
  assignToFormulaireForm: FormGroup;

  formulaires:any[];
  formulaireSearch:any[];
  postes:any[];
  questions:any[];
  nonQuests:any[];

  currentFormulaire = null;
  currentIndex = -1;
  titre = '';
  panelOpenState = false;
  step = 4;

  displayedColumns: string[] = ['titre','actions'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDirective1') private formDirective1: NgForm;
  @ViewChild('formDirective2') private formDirective2: NgForm;
  @ViewChild('formDirective3') private formDirective3: NgForm;
  @ViewChild('formDirective4') private formDirective4: NgForm;
  @ViewChild("myDiv") divView: ElementRef;


  constructor(private FormulairesService: FormulairesService,
    private PostesService: PostesService,
    private QuestionsService : QuestionsService,
    private formBuilder: FormBuilder,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog:MatDialog) {
      
      this.dataSource = new MatTableDataSource();

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        
        return  data.titre.toLocaleLowerCase().includes(filter) ;
       
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
      selectPoste: [null, Validators.required]
     
    });

    this.assignToFormulaireForm = this.formBuilder.group({
      selectQuestions: [null, Validators.required],
      selectFormulaire: [null, Validators.required]
    });

    this.getFormulaires();
    this.getPostes();
    this.getQuestions();
  }

  openDialogUpdateFormulaire(id) {
    const dialogRef=this.dialog.open(UpdateFormulaireComponent,
      { data:id
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getFormulaires();
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
      this.postes = data;
    });
    }

    getQuestions() {
      this.QuestionsService.getQuestionsList().subscribe(data => {
        this.questions = data;
      });
    }


    submit() {
      if (!this.newForm.valid) {
        return;
      }
      if (this.newForm.valid) {
  
      this.FormulairesService.add(this.newForm.value.titre,this.newForm.value.selectPoste).subscribe(
      data => {
        this.openSuccessSnackBar('Formulaire crée avec succès !')
        this.getFormulaires();
        
      });
      this.formDirective1.resetForm();
      this.newForm.reset();
      this.step=4;
    }
    }

    onQuestionsChange() {
      this.getQuestionsNotInForm(this.getFormulaireInForm);
    }

    getQuestionsNotInForm(id) {
      this.FormulairesService.getQuestionsNotInForm(id).subscribe(data=>{
        this.nonQuests=data;
      })
    }

    get getFormulaireInForm() {
      return this.assignToFormulaireForm.get('selectFormulaire').value;
    }



    submitAssignToFormulaire() {
      if (!this.assignToFormulaireForm.valid) {
        return;
      }
      this.FormulairesService.ajouterQuestions(this.assignToFormulaireForm.value.selectFormulaire,this.assignToFormulaireForm.value.selectQuestions).subscribe(
      data => {
        this.openSuccessSnackBar('Les questions ont été ajouté au formulaire !')
        this.getFormulaires();

       
      });
      this.formDirective3.resetForm();
      this.assignToFormulaireForm.reset();
      this.step=4;
    }

    openDialog(id) {
      const dialogRef = this.dialog.open(RemoveFormulaireDialogContent);
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.supprimerFormulaire(id);
        }
      });
    }

    openDialogQuestions(id) {
      this.dialog.open(QuestionsFormulaireDialog, {
        data:id
      });
  
    }

    hasQuestions(formulaireId:number):boolean {
      for (var f of this.formulaires) {
        if (f.id==formulaireId) {
          if (f.questions.length==0) {
            return false
          }
        }
      }
      return true;
    }
  
    openDialogUnassign(id,idQ) {
      const dialogRef = this.dialog.open(QuestionsFormulaireDialog);
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.SupprimerQuestions(id,idQ);
        }
      });
    }

    getFormulaires() {
      this.FormulairesService.getFormulairesList().subscribe((data: any) => {
        this.formulaires=data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return data;
        });
    }

    SupprimerQuestions(id: number,idQ: number) {
      this.FormulairesService.SupprimerQuestions(id,idQ).subscribe(data => {
      this.getFormulaires();
    
      
      })
    }


    supprimerFormulaire(id: number) {
      this.FormulairesService.deleteFormulaire(id).subscribe(data => {
        this.getFormulaires();
      })
    }
  
    refresh(): void {
      window.location.reload();
    }
  
    scroll(el: HTMLElement) {
      el.scrollIntoView({behavior: 'smooth'});
  }



}
