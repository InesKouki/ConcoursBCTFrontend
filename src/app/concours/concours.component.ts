import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ConcoursService } from '../_services/concours.service';
import { UserService } from '../_services/user.service';
// import { EquipeProjetDialog } from './equipe-projet-dialog';
// import { ProjetsDialogContent } from './projets-dialog-content';
import { RemoveConcoursDialogContent } from './remove-concours-dialog-content';
@Component({
  selector: 'app-concours',
  templateUrl: './concours.component.html',
  styleUrls: ['./concours.component.css']
})
export class ConcoursComponent implements OnInit {
  newForm: FormGroup;
  newFormtest: FormGroup;
  assignForm: FormGroup;
  assignToTeamForm: FormGroup;
  linkForm: FormGroup;

  concours:any[];
  concoursSearch:any[];
  Postes:any[];

  currentProjet = null;
  currentIndex = -1;
  titre = '';
  panelOpenState = false;
  step = 4;

  displayedColumns: string[] = ['titre', 'description', 'dateDebut', 'dateFin','postes','actions'];

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
    private formBuilder: FormBuilder,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog:MatDialog) {
      
  //     this.dataSource = new MatTableDataSource();

  //     this.dataSource.filterPredicate = (data: any, filter: string) => {
  //       return data.responsable?.email.toLocaleLowerCase().includes(filter) ||
  //       data.titre.toLocaleLowerCase().includes(filter) ||
  //       data.description.toLocaleLowerCase().includes(filter) ||
  //       data.creationDate.toLocaleLowerCase().includes(filter) ||
  //       data.responsable?.username.toLocaleLowerCase().includes(filter);
  //     }
  //    }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  }

  ngAfterViewInit() {
    this.divView.nativeElement.scrollIntoView();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit(): void {
  }

}
