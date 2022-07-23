import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionsService } from '../_services/questions.service';
import { Router } from '@angular/router';
import { UpdateQuestionComponent } from './update-question/update-question';
import { RemoveQuestionDialogContent } from './remove-question-dialog-content';
import { ChoixQuestionDialog } from './choix-question-dialog';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  newForm: FormGroup;
  newFormtest: FormGroup;
  assignForm: FormGroup;
  assignToQuestionForm: FormGroup;
  nbRegx=/^[0-9]+$/;
  questions:any[];
  questionSearch:any[];
  choix:any[];
  nonChoix:any[];

  currentConcour = null;
  currentIndex = -1;
  titre = '';
  panelOpenState = false;
  step = 4;

  displayedColumns: string[] = ['libelle','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('formDirective1') private formDirective1: NgForm;
  @ViewChild('formDirective2') private formDirective2: NgForm;
  @ViewChild('formDirective3') private formDirective3: NgForm;
  @ViewChild('formDirective4') private formDirective4: NgForm;
  @ViewChild("myDiv") divView: ElementRef;


  constructor(private QuestionsService: QuestionsService,
  
    //private ChoixService : ChoixService,
    private formBuilder: FormBuilder,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog:MatDialog) {
      
      this.dataSource = new MatTableDataSource();

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        
        return  data.libelle.toLocaleLowerCase().includes(filter) ;
        
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
      libelle: [null, Validators.required],
      
     
    });

    this.assignToQuestionForm = this.formBuilder.group({
      selectQuestion: [null, Validators.required],
      libelleRep: [null, Validators.required],
      scoreRep: [null, [Validators.required,Validators.pattern(this.nbRegx)]],
    });

    this.getQuestions();
   
  }

  openDialogUpdateQuestion(id) {
    const dialogRef=this.dialog.open(UpdateQuestionComponent,
      { data:id
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getQuestions();
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

  get getQuestionsInForm() {
    return this.assignToQuestionForm.get('selectQuestion').value;
  }

  onQuestionChange() {
    this.getNonChoix(this.getQuestionInForm);
  }

  submit() {
    if (!this.newForm.valid) {
      return;
    }
    if (this.newForm.valid) {

    this.QuestionsService.add(this.newForm.value.libelle).subscribe(
    data => {
      this.openSuccessSnackBar('Question crée avec succès !')
      this.getQuestions();
      
    });
    this.formDirective1.resetForm();
    this.newForm.reset();
    this.step=4;
  }
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(RemoveQuestionDialogContent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.supprimerQuestion(id);
      }
    });
  }

  submitAssignToQuestion() {
    if (!this.assignToQuestionForm.valid) {
      return;
    }
    this.QuestionsService.assign(this.assignToQuestionForm.value.selectQuestion,this.assignToQuestionForm.value.libelleRep,this.assignToQuestionForm.value.scoreRep).subscribe(
    data => {
      this.openSuccessSnackBar('Le choix a été ajouté a la question !')
      this.getQuestions();
      

     
    });
    this.formDirective3.resetForm();
    this.assignToQuestionForm.reset();
    this.step=4;
  }
  getNonChoix(id) {
    this.QuestionsService.getNonChoix(id).subscribe(data=>{
      this.nonChoix=data;
    })
  }

  get getQuestionInForm() {
    return this.assignToQuestionForm.get('selectQuestion').value;
  }


  // hasChoix(QuestionId:number):boolean {
  //   for (var q of this.questions) {
  //     if (q.id==QuestionId) {
  //       if (q.choix.length==0) {
  //         return false
  //       }
  //     }
  //   }
  //   return true;
  // }
  openDialogChoix(id) {
    this.dialog.open(ChoixQuestionDialog, {
      data:id
    });

  }
  openDialogUnassign(id,idc) {
    const dialogRef = this.dialog.open(ChoixQuestionDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.unassign(id,idc);
      }
    });
  }

  unassign(id: number,idc: number) {
    this.QuestionsService.unassign(id,idc).subscribe(data => {
    this.getQuestions();
 
    
    })
  }


  getQuestions() {
    this.QuestionsService.getQuestionsList().subscribe((data: any) => {
      this.questions=data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return data;
      });
  }

  supprimerQuestion(id: number) {
    this.QuestionsService.deleteQuestion(id).subscribe(data => {
      this.getQuestions();
    })
  }

  refresh(): void {
    window.location.reload();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}

}
